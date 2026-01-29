import { _decorator, animation, Component, EventKeyboard, Input, input, Node, KeyCode, Quat, Vec3, Animation, log, lerp } from 'cc';
const { ccclass, property } = _decorator;


const IdealPose = {
    hips: new Quat(0.000000, -0.642788, 0.000000, 0.766044),
    spine: new Quat(0.407986, 0.000002, 0.071933, 0.910150),
    spine1: new Quat(0.000000, 0.000000, 0.000000, 1.000000),
    spine2: new Quat(0.000000, 0.000000, 0.000000, 1.000000),
    neck: new Quat(-0.138874, 0.442497, -0.343998, 0.816441),
    leftUpLeg: new Quat(0.000521, 0.296151, 0.953807, 0.050474),
    leftLeg: new Quat(-0.333289, -0.000907, 0.052395, 0.941367),
    rightUpLeg: new Quat(0.000520, 0.296142, 0.953809, 0.050474),
    rightLeg: new Quat(-0.333274, -0.000912, 0.052384, 0.941373)
}

const BattingPose = {
    hips: new Quat(0.000000, -0.642788, 0.000000, 0.766044),
    spine: new Quat(0.268710, 0.231614, 0.001200, 0.934959),
    spine1: new Quat(0.000000, 0.000000, 0.000000, 1.000000),
    spine2: new Quat(0.000000, 0.000000, 0.000000, 1.000000),
    neck: new Quat(-0.114046, 0.348510, -0.213704, 0.905464),
    leftUpLeg: new Quat(0.330235, 0.228918, 0.910585, -0.096829),
    leftLeg: new Quat(-0.264813, -0.020612, -0.034155, 0.963474),
    rightUpLeg: new Quat(0.000386, 0.220761, 0.974620, 0.037146),
    rightLeg: new Quat(-0.225373, -0.000574, 0.033157, 0.973708)
}

const CoverDrivePose = {
    hips: new Quat(0.1, -0.5, 0.1, 0.8), // Slightly rotated forward
    spine: new Quat(0.5, 0.1, 0.0, 0.8), // Leaning into the shot
    spine1: new Quat(0, 0, 0, 1),
    spine2: new Quat(0, 0, 0, 1),
    neck: new Quat(-0.1, 0.2, -0.1, 0.9),
    leftUpLeg: new Quat(0.4, 0.3, 0.8, -0.1), // Front leg lunging
    leftLeg: new Quat(-0.8, 0, 0, 0.6),      // Knee bent
    rightUpLeg: new Quat(0.0, 0.2, 0.9, 0.0),
    rightLeg: new Quat(-0.1, 0, 0, 0.9)
};

const PoseMap = { ideal: IdealPose, batting: BattingPose };

@ccclass('AnimGraphController')
export class AnimGraphController extends Component {
    private _animCtrl: animation.AnimationController | null = null;
    private keyPressed = { x: 0, y: 0, z: 0 };


    // Add these to your class properties
    private isSwinging = false;
    private swingProgress = 0;
    private swingDuration = 0.6; // Seconds for the swing to complete
    private swingStartPos = new Vec3();


    @property(Node)
    effector: Node = null; // aka bat

    @property(Node)
    PoleRight: Node = null;
    rightPolePosition = new Vec3();

    @property(Node)
    PoleLeft: Node = null;
    leftPolePosition = new Vec3();

    battingStateTrigger = false;
    private blendT = 0; // 0 = ideal, 1 = batting

    protected onLoad(): void {
        this._animCtrl = this.getComponent(animation.AnimationController);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);

        this.battingStateTrigger = this._animCtrl.getValue_experimental('batting_trigger') as boolean;
    }

    protected start(): void {
        let animation = this.effector.getComponent(Animation);
        animation.play('bat_idealanim');
        this.setPose(IdealPose);
    }

    protected setPose(pose) {
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
        let targetPose = this.battingStateTrigger ? BattingPose : IdealPose;
        let effectorPos = new Vec3();

        if (this.isSwinging) {
            // 1. Advance swing time
            this.swingProgress += dt / this.swingDuration;

            // 2. Define the swing path (An Arc)
            // Start: Current Pos -> Middle: Low point -> End: High Follow-through
            let t = this.swingProgress;

            // Simple Arc Math: 
            // X moves forward, Y dips then rises, Z moves across the body
            let arcX = lerp(0.5, 1.2, t);
            let arcY = Math.pow(t - 0.5, 2) * 2 + 0.5; // Parabola for the "dip"
            let arcZ = lerp(0.5, -0.5, t);

            effectorPos.set(arcX, arcY, arcZ);
            targetPose = CoverDrivePose;

            // 3. Reset swing when done
            if (this.swingProgress >= 1) {
                this.isSwinging = false;
                this.swingProgress = 0;
            }
        } else {
            // Normal movement logic (Your existing code)
            effectorPos = this.effector.position.add(new Vec3(this.keyPressed.x * dt, this.keyPressed.y * dt, this.keyPressed.z * dt));
            this.blendT = lerp(this.blendT, this.battingStateTrigger ? 1 : 0, dt * 5);
        }

        // Apply the Pose Blending
        this.applyBlendedPose(IdealPose, targetPose, this.isSwinging ? this.swingProgress : this.blendT);

        // Apply Effector (Bat)
        this.effector.setPosition(effectorPos);
        this._animCtrl?.setValue_experimental('effectorTarget', effectorPos);

        // Update Poles
        this.PoleRight.getPosition(this.rightPolePosition);
        this._animCtrl?.setValue_experimental('rightPoleTarget', this.rightPolePosition);
    }

    // Clean up your code by moving the Slerps here
    private applyBlendedPose(from, to, t) {
        const keys = ['hips', 'spine', 'spine1', 'spine2', 'neck', 'leftUpLeg', 'rightUpLeg'];
        const animKeys = ['hip_rot', 'spine_rot', 'spine1_rot', 'spine2_rot', 'neck_rot', 'left_leg_rot', 'right_leg_rot'];

        let tempQuat = new Quat();
        keys.forEach((key, index) => {
            Quat.slerp(tempQuat, from[key], to[key], t);
            this._animCtrl?.setValue_experimental(animKeys[index], tempQuat);
        });
    }

    // update(dt: number) {

    //     let pos = this.effector.position.add(new Vec3(this.keyPressed.x * dt, this.keyPressed.y * dt, this.keyPressed.z * dt));
    //     this.effector.setPosition(pos);
    //     this._animCtrl?.setValue_experimental('effectorTarget', pos);

    //     this.PoleRight.getPosition(this.rightPolePosition);
    //     this._animCtrl?.setValue_experimental('rightPoleTarget', this.rightPolePosition);

    //     this.PoleLeft.getPosition(this.leftPolePosition);
    //     this._animCtrl?.setValue_experimental('leftPoleTarget', this.leftPolePosition);


    //     let targetState = this.battingStateTrigger ? 'batting' : 'ideal';
    //     const targetT = targetState === 'batting' ? 1 : 0;
    //     this.blendT = lerp(this.blendT, targetT, dt * 5); // adjust speed with multiplier

    //     // Get poses
    //     const fromPose = PoseMap['ideal'];
    //     const toPose = PoseMap['batting'];

    //     // Blend hips
    //     const hips = new Quat();
    //     Quat.slerp(hips, fromPose.hips, toPose.hips, this.blendT);
    //     this._animCtrl?.setValue_experimental('hip_rot', hips);

    //     // Blend spine
    //     const spine = new Quat();
    //     Quat.slerp(spine, fromPose.spine, toPose.spine, this.blendT);
    //     this._animCtrl?.setValue_experimental('spine_rot', spine);

    //     // Blend spine1
    //     const spine1 = new Quat();
    //     Quat.slerp(spine1, fromPose.spine1, toPose.spine1, this.blendT);
    //     this._animCtrl?.setValue_experimental('spine1_rot', spine1);

    //     // Blend spine2
    //     const spine2 = new Quat();
    //     Quat.slerp(spine2, fromPose.spine2, toPose.spine2, this.blendT);
    //     this._animCtrl?.setValue_experimental('spine2_rot', spine2);

    //     // Blend neck
    //     const neck = new Quat();
    //     Quat.slerp(neck, fromPose.neck, toPose.neck, this.blendT);
    //     this._animCtrl?.setValue_experimental('neck_rot', neck);

    //     // Blend left leg
    //     const leftLeg = new Quat();
    //     Quat.slerp(leftLeg, fromPose.leftUpLeg, toPose.leftUpLeg, this.blendT);
    //     this._animCtrl?.setValue_experimental('left_leg_rot', leftLeg);

    //     // Blend right leg
    //     const rightLeg = new Quat();
    //     Quat.slerp(rightLeg, fromPose.rightUpLeg, toPose.rightUpLeg, this.blendT);
    //     this._animCtrl?.setValue_experimental('right_leg_rot', rightLeg);

    //     // Blend knees
    //     const knee = new Quat();
    //     Quat.slerp(knee, fromPose.leftLeg, toPose.leftLeg, this.blendT);
    //     this._animCtrl?.setValue_experimental('knee_rot', knee);


    // }

    private onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.keyPressed.x = -1;
                break;
            case KeyCode.KEY_D:
                this.keyPressed.x = 1;
                break;
            case KeyCode.SPACE:
                this.battingStateTrigger = true;
                break;
            case KeyCode.KEY_K: // Trigger Cover Drive
                if (!this.isSwinging) {
                    this.isSwinging = true;
                    this.swingProgress = 0;
                }
                break;
        }
    }

    private onKeyUp(event: EventKeyboard) {
        this.keyPressed = { x: 0, y: 0, z: 0 };
        this.battingStateTrigger = false;
    }
}