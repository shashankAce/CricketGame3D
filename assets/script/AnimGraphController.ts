import {
    _decorator, animation, Component, EventKeyboard, Input, input,
    Node, KeyCode, Quat, Vec3, easing,
    log
} from 'cc';
import { IdealPose, BattingPose, ShotPose, BlockPose, DrivePose, ReturnPose } from './captureData/PoseCapture';

const { ccclass, property } = _decorator;

// --- Enums ---
export enum PoseType {
    Ideal,
    Batting,
    Return,
    Drive,
    Shot,
    Block,
    Running
}

export enum ShotType {
    Straight,
    CoverDrive,
    PullShot,
    DefensiveBlock
}

// --- Interfaces ---
interface PoseData {
    hipsPos: Vec3,
    hips: Quat; spine: Quat; spine1: Quat; spine2: Quat; neck: Quat;
    leftUpLeg: Quat; leftLeg: Quat; rightUpLeg: Quat; rightLeg: Quat;
}

interface ShotData {
    poseType: PoseType;
    startPos: Vec3;
    controlPoint: Vec3;
    endPos: Vec3;
    startRot: Quat;
    endRot: Quat;
    duration: number;
    easing: (k: number) => number;
}

// --- Data Mapping ---
const POSE_MAP: Record<PoseType, PoseData> = {
    [PoseType.Ideal]: IdealPose,
    [PoseType.Batting]: BattingPose,
    [PoseType.Return]: ReturnPose,
    [PoseType.Drive]: DrivePose,
    [PoseType.Shot]: ShotPose,
    [PoseType.Block]: BlockPose,
    [PoseType.Running]: IdealPose,
};

const SHOT_MAP: Record<ShotType, ShotData> = {
    [ShotType.Straight]: {
        poseType: PoseType.Drive,
        startPos: new Vec3(0.154, 0.895, -0.807),
        controlPoint: new Vec3(0.154, 0.6, -0.6),
        endPos: new Vec3(0.154, 1.10, -0.245),
        startRot: new Quat(0, 0, 0, 1),
        endRot: new Quat(-0.90285, 0.03683, 0.078989, 0.42101),
        duration: 0.5,
        easing: easing.backInOut
    },
    [ShotType.CoverDrive]: {
        poseType: PoseType.Drive,
        startPos: new Vec3(0.154, 0.895, -0.807),
        controlPoint: new Vec3(0.154, 0.6, -0.7),
        endPos: new Vec3(0.350, 0.850, -0.650),
        startRot: new Quat(0, 0, 0, 1),
        endRot: new Quat(-0.85, 0.15, 0.05, 0.45),
        duration: 0.4,
        easing: easing.backInOut
    },
    [ShotType.PullShot]: {
        poseType: PoseType.Shot,
        startPos: new Vec3(0.154, 0.895, -0.807),
        controlPoint: new Vec3(0.154, 0.6, -0.7),
        endPos: new Vec3(0.250, 1.15, -0.550),
        startRot: new Quat(0, 0, 0, 1),
        endRot: new Quat(-0.707, 0.707, 0, 0),
        duration: 0.5,
        easing: easing.backInOut
    },
    [ShotType.DefensiveBlock]: {
        poseType: PoseType.Block,
        startPos: new Vec3(0.154, 0.895, -0.807),
        controlPoint: new Vec3(0.154, 0.6, -0.7),
        endPos: new Vec3(0.154, 0.85, -0.75),
        startRot: new Quat(0, 0, 0, 1),
        endRot: new Quat(-0.2, 0, 0, 0.98),
        duration: 0.5,
        easing: easing.sineIn
    }
};

@ccclass('AnimGraphController')
export class AnimGraphController extends Component {

    @property(Node) effector: Node = null;
    @property(Node) PoleRight: Node = null;
    @property(Node) PoleLeft: Node = null;

    private _animCtrl: animation.AnimationController | null = null;
    private effectorIdealPos = new Vec3();

    // Animation States
    private isSwinging = false;
    private swingT = 0;
    private activeShot: ShotData = SHOT_MAP[ShotType.Straight];

    // Blending States
    private blendT = 1.0; // Initialize at 1 so it's "finished" with initial pose
    private blendDuration = 1;
    private currentPoseData: PoseData = null;
    private targetPoseData: PoseData = null;
    private poseQueue: PoseType[] = [];

    private pose: PoseType;

    protected onLoad(): void {
        this._animCtrl = this.getComponent(animation.AnimationController);
        this.effectorIdealPos = this.effector.position.clone();
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    protected start(): void {
        // Initial setup for IK and Pose
        this.pose = PoseType.Batting;
        this.updateIKPoles();
        this.resetEffector();
        let data = POSE_MAP[this.pose];
        this.applyPoseToGraph(data);
    }

    protected update(dt: number): void {
        this.updatePoseBlending(dt);

        if (this.isSwinging)
            this.updateSwing(dt);
        this.updateIKPoles();
    }

    /**
     * Call this to queue any pose transition
     */
    public transitionToPose(type: PoseType, duration: number = 0.5) {
        this.poseQueue.push(type);
        this.blendDuration = duration;

        // Start processing if idle
        if (this.blendT >= 1.0) {
            this.processNextInQueue();
        }
    }

    private processNextInQueue() {
        if (this.poseQueue.length > 0) {
            const nextType = this.poseQueue.shift()!;
            this.targetPoseData = POSE_MAP[nextType];
            this.blendT = 0;
        }
    }

    private updatePoseBlending(dt: number) {
        if (this.blendT >= 1.0)
            return;
        if (this.currentPoseData == null)
            return;
        if (this.targetPoseData == null)
            return;

        this.blendT += dt / this.blendDuration;
        const progress = Math.min(this.blendT, 1.0);

        this.applyBlendedPose(this.currentPoseData, this.targetPoseData, progress);

        if (this.blendT >= 1.0) {
            this.currentPoseData = this.targetPoseData;
            this.processNextInQueue();
        }
    }

    private applyBlendedPose(from: PoseData, to: PoseData, t: number) {
        const blend = (a: Quat, b: Quat) => {
            const out = new Quat();
            Quat.slerp(out, a, b, t);
            return out;
        };

        const ctrl = this._animCtrl;
        if (!ctrl) return;

        let pos = new Vec3();
        Vec3.lerp(pos, from.hipsPos, to.hipsPos, t);
        log(pos);

        ctrl.setValue_experimental('hip_pos', pos);
        ctrl.setValue_experimental('hip_rot', blend(from.hips, to.hips));

        ctrl.setValue_experimental('spine_rot', blend(from.spine, to.spine));
        ctrl.setValue_experimental('spine1_rot', blend(from.spine1, to.spine1));
        ctrl.setValue_experimental('spine2_rot', blend(from.spine2, to.spine2));
        ctrl.setValue_experimental('neck_rot', blend(from.neck, to.neck));
        ctrl.setValue_experimental('left_leg_rot', blend(from.leftUpLeg, to.leftUpLeg));
        ctrl.setValue_experimental('right_leg_rot', blend(from.rightUpLeg, to.rightUpLeg));
        ctrl.setValue_experimental('knee_rot', blend(from.leftLeg, to.leftLeg));
    }

    private applyPoseToGraph(pose: PoseData) {
        this.currentPoseData = pose;
        this._animCtrl?.setValue_experimental('hip_rot', pose.hips);
        this._animCtrl?.setValue_experimental('spine_rot', pose.spine);
        this._animCtrl?.setValue_experimental('spine1_rot', pose.spine1);
        this._animCtrl?.setValue_experimental('spine2_rot', pose.spine2);
        this._animCtrl?.setValue_experimental('neck_rot', pose.neck);
        this._animCtrl?.setValue_experimental('left_leg_rot', pose.leftUpLeg);
        this._animCtrl?.setValue_experimental('right_leg_rot', pose.rightUpLeg);
        this._animCtrl?.setValue_experimental('knee_rot', pose.leftLeg);
    }

    private updateSwing(dt: number) {
        this.swingT += dt / this.activeShot.duration;
        const progress = Math.min(this.swingT, 1.0);
        const t = this.activeShot.easing(progress);

        const bPos = this.calculateBezier(this.activeShot.startPos, this.activeShot.controlPoint, this.activeShot.endPos, t);

        const currentQuat = new Quat();
        Quat.slerp(currentQuat, this.activeShot.startRot, this.activeShot.endRot, t);
        this.effector.setRotation(currentQuat);

        // Position with offset from Ideal
        const finalPos = this.effectorIdealPos.clone().add(bPos.clone().subtract(this.activeShot.startPos));
        this.effector.setPosition(finalPos);
        this._animCtrl?.setValue_experimental('effectorTarget', finalPos);

        if (this.swingT >= 1) this.isSwinging = false;
    }

    private calculateBezier(p0: Vec3, p1: Vec3, p2: Vec3, t: number): Vec3 {
        const invT = 1 - t;
        return new Vec3(
            invT * invT * p0.x + 2 * invT * t * p1.x + t * t * p2.x,
            invT * invT * p0.y + 2 * invT * t * p1.y + t * t * p2.y,
            invT * invT * p0.z + 2 * invT * t * p1.z + t * t * p2.z
        );
    }

    private updateIKPoles() {
        const rPos = new Vec3();
        const lPos = new Vec3();
        if (this.PoleRight) {
            this.PoleRight.getPosition(rPos);
            this._animCtrl?.setValue_experimental('rightPoleTarget', rPos);
        }
        if (this.PoleLeft) {
            this.PoleLeft.getPosition(lPos);
            this._animCtrl?.setValue_experimental('leftPoleTarget', lPos);
        }
    }

    private playShot(type: ShotType) {
        this.activeShot = SHOT_MAP[type];
        this.swingT = 0;
        this.isSwinging = true;

        // Sequence: Ready -> Dynamic Shot Pose
        this.transitionToPose(PoseType.Batting, 0.2);
        this.transitionToPose(this.activeShot.poseType, 0.1);
        // this.transitionToPose(PoseType.Return, 0.2);
        // this.transitionToPose(PoseType.Ideal, 0.2);
    }

    private onKeyDown(event: EventKeyboard) {
        const keyMap: Record<number, ShotType> = {
            [KeyCode.ARROW_UP]: ShotType.Straight,
            [KeyCode.ARROW_DOWN]: ShotType.CoverDrive,
            [KeyCode.ARROW_LEFT]: ShotType.PullShot,
            [KeyCode.ARROW_RIGHT]: ShotType.DefensiveBlock,
        };

        if (keyMap[event.keyCode] !== undefined) {
            this.playShot(keyMap[event.keyCode]);
        }
    }

    onButtonClick(e, f) {
        this.applyPoseToGraph(POSE_MAP[Number(f) - 1]);
        this.resetEffector();
    }

    public resetEffector() {
        this.effector.setPosition(this.effectorIdealPos);
        this.effector.setRotation(Quat.IDENTITY);
        this._animCtrl?.setValue_experimental('effectorTarget', this.effectorIdealPos);
        this._animCtrl.setValue_experimental('hip_pos', BattingPose.hipsPos);
        log(BattingPose.hipsPos);
    }
}