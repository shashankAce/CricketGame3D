import {
    _decorator, animation, Component, EventKeyboard, Input, input,
    Node, KeyCode, Quat, Vec3, Animation, log, lerp, math, easing
} from 'cc';
import { IdealPose, BattingPose, ShotPose, BlockPose, DrivePose, ReturnPose } from './captureData/PoseCapture';
const { ccclass, property } = _decorator;

interface PoseData {
    hips: Quat;
    spine: Quat;
    spine1: Quat;
    spine2: Quat;
    neck: Quat;
    leftUpLeg: Quat;
    leftLeg: Quat;
    rightUpLeg: Quat;
    rightLeg: Quat;
}
interface Pose {
    Ideal: PoseData;
    Return: PoseData;
    Batting: PoseData;
    Drive: PoseData;
    Shot: PoseData;
    Block: PoseData;
}

const POSE: Pose = {
    Ideal: ReturnPose,
    Return: ReturnPose,
    Batting: BattingPose,
    Drive: DrivePose,
    Shot: ShotPose,
    Block: BlockPose,
}

interface ShotData {
    pose: PoseData,
    startPos: Vec3;
    controlPoint: Vec3;
    endPos: Vec3;
    startRot: Quat;
    endRot: Quat;
    duration: number;
    easing: (k: number) => number;
}

const SHOTS: Record<string, ShotData> = {
    straight: {
        pose: POSE.Drive,
        startPos: new Vec3(0.154, 0.895, -0.807),
        controlPoint: new Vec3(0.154, 0.6, -0.6),
        endPos: new Vec3(0.154, 1.10, -0.445),
        startRot: new Quat(0, 0, 0, 1),
        endRot: new Quat(-0.90285, 0.03683, 0.078989, 0.42101),
        duration: .5,
        easing: easing.backInOut
    },
    coverDrive: {
        pose: POSE.Drive,
        // Moves slightly to the Right (+X) and Forward (+Z)
        startPos: new Vec3(0.154, 0.895, -0.807),
        controlPoint: new Vec3(0.154, 0.6, -0.7),
        endPos: new Vec3(0.350, 0.850, -0.650),
        startRot: new Quat(0, 0, 0, 1),
        // Added a slight Y-axis rotation (0.1) to angle the face toward covers
        endRot: new Quat(-0.85, 0.15, 0.05, 0.45),
        duration: .4,
        easing: easing.backInOut
    },
    pullShot: {
        pose: POSE.Shot,
        // Moves across the body to the Left (-X) and stays high (+Y)
        startPos: new Vec3(0.154, 0.895, -0.807),
        controlPoint: new Vec3(0.154, 0.6, -0.7),
        endPos: new Vec3(0.250, 1.15, -0.550),
        startRot: new Quat(0, 0, 0, 1),
        endRot: new Quat(-0.707, 0.707, 0, 0),
        duration: .5,
        easing: easing.backInOut
    },
    defensiveBlock: {
        pose: POSE.Block,
        startPos: new Vec3(0.154, 0.895, -0.807),
        controlPoint: new Vec3(0.154, 0.6, -0.7),
        endPos: new Vec3(0.154, 0.85, -0.75),
        startRot: new Quat(0, 0, 0, 1),
        endRot: new Quat(-0.2, 0, 0, 0.98),
        duration: 0.5, // Slower
        easing: easing.sineIn // Starts slow, builds weight
    }
};

@ccclass('AnimGraphController')
export class AnimGraphController extends Component {

    @property(Node)
    effector: Node = null; // aka bat
    effectorIdealPos = new Vec3();

    @property(Node)
    PoleRight: Node = null;
    rightPolePosition = new Vec3();

    @property(Node)
    PoleLeft: Node = null;
    leftPolePosition = new Vec3();

    private currentPose: PoseData = POSE.Ideal;
    private targetPose: PoseData = POSE.Ideal;
    private blendT = 0;

    private _animCtrl: animation.AnimationController | null = null;
    private keyPressed = { x: 0, y: 0, z: 0 };

    private isSwinging = false;
    private isBatting = false;

    private swingT = 0;
    private activeShot: ShotData = SHOTS.straight;
    private poseDuration = 1;

    protected onLoad(): void {
        this._animCtrl = this.getComponent(animation.AnimationController);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);

        // this.battingStateTrigger = this._animCtrl.getValue_experimental('batting_trigger') as boolean;
        this.effectorIdealPos = this.effector.position.clone();

        log(this.effector.position.toString());
    }

    protected start(): void {
        // let animation = this.effector.getComponent(Animation);
        // animation.play('bat_idealanim');
        this.setPose(IdealPose);
        this.effector.setPosition(this.effectorIdealPos);
        this.effector.setRotation(new Quat(0, 0, 0, 1));
        this._animCtrl?.setValue_experimental('effectorTarget', this.effectorIdealPos);
    }

    protected setPose(pose: PoseData) {
        this._animCtrl?.setValue_experimental('hip_rot', pose.hips);
        this._animCtrl?.setValue_experimental('spine_rot', pose.spine);
        this._animCtrl?.setValue_experimental('spine1_rot', pose.spine1);
        this._animCtrl?.setValue_experimental('spine2_rot', pose.spine2);
        this._animCtrl?.setValue_experimental('neck_rot', pose.neck);

        this._animCtrl?.setValue_experimental('left_leg_rot', pose.leftUpLeg);
        this._animCtrl?.setValue_experimental('right_leg_rot', pose.rightUpLeg);
        this._animCtrl?.setValue_experimental('knee_rot', pose.leftLeg);
    }

    update(dt: number) {

        if (this.isSwinging) {

            this.swingT += dt / this.activeShot.duration;
            const progress = Math.min(this.swingT, 1.0);
            const t = this.activeShot.easing(progress);

            // --- BEZIER POSITION CALCULATION ---
            const p0 = this.activeShot.startPos;
            const p1 = this.activeShot.controlPoint;
            const p2 = this.activeShot.endPos;

            // Standard Quadratic Bezier Formula
            let x = Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x;
            let y = Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y;
            let z = Math.pow(1 - t, 2) * p0.z + 2 * (1 - t) * t * p1.z + Math.pow(t, 2) * p2.z;

            let bezierPos = new Vec3(x, y, z);

            // --- APPLY ROTATION ---
            let currentQuat = new Quat();
            Quat.slerp(currentQuat, this.activeShot.startRot, this.activeShot.endRot, t);

            let offset = bezierPos.clone().subtract(this.activeShot.startPos);
            let finalPos = this.effectorIdealPos.clone().add(offset);
            this.effector.setPosition(finalPos);

            this.effector.setRotation(currentQuat);
            this._animCtrl?.setValue_experimental('effectorTarget', finalPos);

            if (this.swingT >= 1) this.isSwinging = false;

        }

        this.PoleRight.getPosition(this.rightPolePosition);
        this._animCtrl?.setValue_experimental('rightPoleTarget', this.rightPolePosition);

        this.PoleLeft.getPosition(this.leftPolePosition);
        this._animCtrl?.setValue_experimental('leftPoleTarget', this.leftPolePosition);


        if (this.isBatting) {

            this.blendT += dt / this.poseDuration;
            const progress = Math.min(this.blendT, 1.0);

            // Get poses
            const fromPose = this.currentPose;
            const toPose = this.targetPose;

            // Blend hips
            const hips = new Quat();
            Quat.slerp(hips, fromPose.hips, toPose.hips, progress);
            this._animCtrl?.setValue_experimental('hip_rot', hips);

            // Blend spine
            const spine = new Quat();
            Quat.slerp(spine, fromPose.spine, toPose.spine, progress);
            this._animCtrl?.setValue_experimental('spine_rot', spine);

            // Blend spine1
            const spine1 = new Quat();
            Quat.slerp(spine1, fromPose.spine1, toPose.spine1, progress);
            this._animCtrl?.setValue_experimental('spine1_rot', spine1);

            // Blend spine2
            const spine2 = new Quat();
            Quat.slerp(spine2, fromPose.spine2, toPose.spine2, progress);
            this._animCtrl?.setValue_experimental('spine2_rot', spine2);

            // Blend neck
            const neck = new Quat();
            Quat.slerp(neck, fromPose.neck, toPose.neck, progress);
            this._animCtrl?.setValue_experimental('neck_rot', neck);

            // Blend left leg
            const leftLeg = new Quat();
            Quat.slerp(leftLeg, fromPose.leftUpLeg, toPose.leftUpLeg, progress);
            this._animCtrl?.setValue_experimental('left_leg_rot', leftLeg);

            // Blend right leg
            const rightLeg = new Quat();
            Quat.slerp(rightLeg, fromPose.rightUpLeg, toPose.rightUpLeg, progress);
            this._animCtrl?.setValue_experimental('right_leg_rot', rightLeg);

            // Blend knees
            const knee = new Quat();
            Quat.slerp(knee, fromPose.leftLeg, toPose.leftLeg, progress);
            this._animCtrl?.setValue_experimental('knee_rot', knee);

            if (this.blendT >= 1) {
                this.isBatting = false;
            }
        }

    }

    resetEffector() {
        this.effector.setPosition(this.effectorIdealPos);
        this.effector.setRotation(new Quat(0, 0, 0, 1));
        this._animCtrl?.setValue_experimental('effectorTarget', this.effectorIdealPos);
    }

    private onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.keyPressed.x = -1;
                break;
            case KeyCode.KEY_D:
                this.keyPressed.x = 1;
                break;
            case KeyCode.ARROW_UP:
                this.activeShot = SHOTS.straight;
                this.startShot();
                break;
            case KeyCode.ARROW_DOWN:
                this.activeShot = SHOTS.coverDrive;
                this.startShot();
                break;
            case KeyCode.ARROW_LEFT:
                this.activeShot = SHOTS.pullShot;
                this.startShot();
                break;
            case KeyCode.ARROW_RIGHT:
                this.activeShot = SHOTS.defensiveBlock;
                this.startShot();
                break;
        }
    }

    private startShot() {
        this.currentPose = POSE.Batting;
        this.targetPose = this.activeShot.pose;
        this.isSwinging = true;
        this.isBatting = true;
        this.swingT = 0;
        this.blendT = 0;
    }

    private onKeyUp(event: EventKeyboard) {
        this.keyPressed = { x: 0, y: 0, z: 0 };
    }
}