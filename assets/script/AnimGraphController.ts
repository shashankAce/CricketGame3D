import {
    _decorator, animation, Component, EventKeyboard, Input, input,
    Node, KeyCode, Quat, Vec3, Animation, log, lerp, math, easing
} from 'cc';
import { IdealPose, BattingPose, ShotPose, BlockPose, DrivePose } from './captureData/PoseCapture';
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
    Ideal: IdealPose,
    Return: IdealPose,
    Batting: BattingPose,
    Drive: DrivePose,
    Shot: ShotPose,
    Block: BlockPose,
}

interface ShotData {
    root: Vec3,
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
        root: new Vec3(),
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
        root: new Vec3(),
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
        root: new Vec3(),
        pose: POSE.Drive,
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
        root: new Vec3(),
        pose: POSE.Drive,
        startPos: new Vec3(0.154, 0.895, -0.807),
        controlPoint: new Vec3(0.154, 0.6, -0.7),
        endPos: new Vec3(0.154, 0.85, -0.75),
        startRot: new Quat(0, 0, 0, 1),
        endRot: new Quat(-0.2, 0, 0, 0.98),
        duration: 0.5, // Slower
        easing: easing.sineIn // Starts slow, builds weight
    }
};

const PoseMap = { ideal: IdealPose, batting: BattingPose };

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

    battingStateTrigger = false;
    private blendT = 0; // 0 = ideal, 1 = batting

    private _animCtrl: animation.AnimationController | null = null;
    private keyPressed = { x: 0, y: 0, z: 0 };

    private isSwinging = false;
    private swingT = 0;
    private activeShot: ShotData = SHOTS.straight;

    protected onLoad(): void {
        this._animCtrl = this.getComponent(animation.AnimationController);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);

        this.battingStateTrigger = this._animCtrl.getValue_experimental('batting_trigger') as boolean;
        this.effectorIdealPos = this.effector.position.clone();

        log(this.effector.position.toString());
    }

    protected start(): void {
        // let animation = this.effector.getComponent(Animation);
        // animation.play('bat_idealanim');
        this.setPose(IdealPose);
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

            // Apply to Effector
            this.effector.setPosition(bezierPos);
            this.effector.setRotation(currentQuat);
            this._animCtrl?.setValue_experimental('effectorTarget', bezierPos);

            if (this.swingT >= 1) this.isSwinging = false;

        } else {
            // Your existing reset logic
            if (!this.battingStateTrigger) {
                this.effector.setPosition(this.effectorIdealPos);
                this.effector.setRotation(new Quat(0, 0, 0, 1));
                this._animCtrl?.setValue_experimental('effectorTarget', this.effectorIdealPos);
            }
        }

        this.PoleRight.getPosition(this.rightPolePosition);
        this._animCtrl?.setValue_experimental('rightPoleTarget', this.rightPolePosition);

        this.PoleLeft.getPosition(this.leftPolePosition);
        this._animCtrl?.setValue_experimental('leftPoleTarget', this.leftPolePosition);


        let targetState = this.battingStateTrigger ? 'batting' : 'ideal';
        const targetT = targetState === 'batting' ? 1 : 0;
        this.blendT = lerp(this.blendT, targetT, dt * 5); // adjust speed with multiplier

        // Get poses
        const fromPose = PoseMap['ideal'];
        const toPose = PoseMap['batting'];

        // Blend hips
        const hips = new Quat();
        Quat.slerp(hips, fromPose.hips, toPose.hips, this.blendT);
        this._animCtrl?.setValue_experimental('hip_rot', hips);

        // Blend spine
        const spine = new Quat();
        Quat.slerp(spine, fromPose.spine, toPose.spine, this.blendT);
        this._animCtrl?.setValue_experimental('spine_rot', spine);

        // Blend spine1
        const spine1 = new Quat();
        Quat.slerp(spine1, fromPose.spine1, toPose.spine1, this.blendT);
        this._animCtrl?.setValue_experimental('spine1_rot', spine1);

        // Blend spine2
        const spine2 = new Quat();
        Quat.slerp(spine2, fromPose.spine2, toPose.spine2, this.blendT);
        this._animCtrl?.setValue_experimental('spine2_rot', spine2);

        // Blend neck
        const neck = new Quat();
        Quat.slerp(neck, fromPose.neck, toPose.neck, this.blendT);
        this._animCtrl?.setValue_experimental('neck_rot', neck);

        // Blend left leg
        const leftLeg = new Quat();
        Quat.slerp(leftLeg, fromPose.leftUpLeg, toPose.leftUpLeg, this.blendT);
        this._animCtrl?.setValue_experimental('left_leg_rot', leftLeg);

        // Blend right leg
        const rightLeg = new Quat();
        Quat.slerp(rightLeg, fromPose.rightUpLeg, toPose.rightUpLeg, this.blendT);
        this._animCtrl?.setValue_experimental('right_leg_rot', rightLeg);

        // Blend knees
        const knee = new Quat();
        Quat.slerp(knee, fromPose.leftLeg, toPose.leftLeg, this.blendT);
        this._animCtrl?.setValue_experimental('knee_rot', knee);
    }

    private onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.keyPressed.x = -1;
                break;
            case KeyCode.KEY_D:
                this.keyPressed.x = 1;
                break;
            case KeyCode.SPACE: // Straight Drive
                this.activeShot = SHOTS.straight;
                this.startShot();
                break;
            case KeyCode.KEY_K: // Cover Drive
                this.activeShot = SHOTS.coverDrive;
                this.startShot();
                break;
            case KeyCode.KEY_P: // Pull Shot
                this.activeShot = SHOTS.pullShot;
                this.startShot();
                break;
            case KeyCode.KEY_L: // Pull Shot
                this.activeShot = SHOTS.defensiveBlock;
                this.startShot();
                break;
        }
    }

    private startShot() {
        this.isSwinging = true;
        this.swingT = 0;
        this.battingStateTrigger = true;
    }

    private onKeyUp(event: EventKeyboard) {
        this.keyPressed = { x: 0, y: 0, z: 0 };
        this.battingStateTrigger = false;
    }
}


// update(dt: number) {
//     let targetPose = this.battingStateTrigger ? BattingPose : IdealPose;
//     let effectorPos = new Vec3();

//     if (this.isSwinging) {
//         // 1. Advance swing time
//         this.swingProgress += dt / this.swingDuration;

//         // 2. Define the swing path (An Arc)
//         // Start: Current Pos -> Middle: Low point -> End: High Follow-through
//         let t = this.swingProgress;

//         // Simple Arc Math:
//         // X moves forward, Y dips then rises, Z moves across the body
//         let arcX = lerp(0.5, 1.2, t);
//         let arcY = Math.pow(t - 0.5, 2) * 2 + 0.5; // Parabola for the "dip"
//         let arcZ = lerp(0.5, -0.5, t);

//         effectorPos.set(arcX, arcY, arcZ);
//         targetPose = CoverDrivePose;

//         // 3. Reset swing when done
//         if (this.swingProgress >= 1) {
//             this.isSwinging = false;
//             this.swingProgress = 0;
//         }
//     } else {
//         // Normal movement logic (Your existing code)
//         effectorPos = this.effector.position.add(new Vec3(this.keyPressed.x * dt, this.keyPressed.y * dt, this.keyPressed.z * dt));
//         this.blendT = lerp(this.blendT, this.battingStateTrigger ? 1 : 0, dt * 5);
//     }

//     // Apply the Pose Blending
//     this.applyBlendedPose(IdealPose, targetPose, this.isSwinging ? this.swingProgress : this.blendT);

//     // Apply Effector (Bat)
//     this.effector.setPosition(effectorPos);
//     this._animCtrl?.setValue_experimental('effectorTarget', effectorPos);

//     // Update Poles
//     this.PoleRight.getPosition(this.rightPolePosition);
//     this._animCtrl?.setValue_experimental('rightPoleTarget', this.rightPolePosition);
// }

// // Clean up your code by moving the Slerps here
// private applyBlendedPose(from, to, t) {
//     const keys = ['hips', 'spine', 'spine1', 'spine2', 'neck', 'leftUpLeg', 'rightUpLeg'];
//     const animKeys = ['hip_rot', 'spine_rot', 'spine1_rot', 'spine2_rot', 'neck_rot', 'left_leg_rot', 'right_leg_rot'];

//     let tempQuat = new Quat();
//     keys.forEach((key, index) => {
//         Quat.slerp(tempQuat, from[key], to[key], t);
//         this._animCtrl?.setValue_experimental(animKeys[index], tempQuat);
//     });
// }