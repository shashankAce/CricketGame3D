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

const PoseMap = { ideal: IdealPose, batting: BattingPose };

@ccclass('AnimGraphController')
export class AnimGraphController extends Component {
    private _animCtrl: animation.AnimationController | null = null;
    private keyPressed = { x: 0, y: 0, z: 0 };

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

        let pos = this.effector.position.add(new Vec3(this.keyPressed.x * dt, this.keyPressed.y * dt, this.keyPressed.z * dt));
        this.effector.setPosition(pos);
        this._animCtrl?.setValue_experimental('effectorTarget', pos);

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
            case KeyCode.SPACE:
                this.battingStateTrigger = true;
                break;
        }
    }

    private onKeyUp(event: EventKeyboard) {
        this.keyPressed = { x: 0, y: 0, z: 0 };
        this.battingStateTrigger = false;
    }
}