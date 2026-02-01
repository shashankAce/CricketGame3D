import {
    _decorator, animation, Component, EventKeyboard, Input, input,
    Node, KeyCode, Quat, Vec3, easing, log
} from 'cc';

const { ccclass, property } = _decorator;

// --- Enums ---
export enum PoseType {
    Ideal = 'Ideal',
    Straight = 'Straight',
    Pull = 'Pull',
    Leg = 'Leg',
    Run = 'Run'
}

const ShotName = {
    'Straight': 'straightShot',
    'Pull': 'pullShot',
    'Leg': 'legShot',
}

export enum ShotType {
    Straight,
    Pull,
    Leg,
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

const SHOT_MAP: Record<ShotType, ShotData> = {
    [ShotType.Straight]: {
        poseType: PoseType.Straight,
        startPos: new Vec3(0.154, 0.895, -0.807),
        controlPoint: new Vec3(0.154, 0.6, -0.6),
        endPos: new Vec3(0.204, 1.10, -0.245),
        startRot: new Quat(0, 0, 0, 1),
        endRot: new Quat(-0.90285, 0.03683, 0.078989, 0.42101),
        duration: 0.5,
        easing: easing.backInOut
    },
    [ShotType.Pull]: {
        poseType: PoseType.Pull,
        startPos: new Vec3(0.154, 0.895, -0.807),
        controlPoint: new Vec3(0.154, 0.6, -0.7),
        endPos: new Vec3(0.250, 1.15, -0.550),
        startRot: new Quat(0, 0, 0, 1),
        endRot: new Quat(-0.707, 0.707, 0, 0),
        duration: 0.5,
        easing: easing.backInOut
    },
    [ShotType.Leg]: {
        poseType: PoseType.Leg,
        startPos: new Vec3(0.154, 0.895, -0.807),
        controlPoint: new Vec3(0.154, 0.6, -0.7),
        endPos: new Vec3(0.350, 0.850, -0.650),
        startRot: new Quat(0, 0, 0, 1),
        endRot: new Quat(-0.85, 0.15, 0.05, 0.45),
        duration: 0.4,
        easing: easing.backInOut
    },
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

    protected onLoad(): void {
        this._animCtrl = this.getComponent(animation.AnimationController);
        this.effectorIdealPos = this.effector.position.clone();
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    protected start(): void {
        this.updateIKPoles();
        this.resetEffector();
        // Set the graph to Ideal state initially
        this.setShotTypeVariable(PoseType.Ideal);
    }

    protected update(dt: number): void {
        if (this.isSwinging) {
            this.updateSwing(dt);
        }
        this.updateIKPoles();
    }

    /**
     * Updates the Animation Graph's variable to trigger clip transitions
     */
    private setShotTypeVariable(type: PoseType) {
        if (this._animCtrl) {
            // This matches the Integer condition you set in your Graph transitions
            this.scheduleOnce(() => {
                this._animCtrl.setValue(ShotName[type], true);
            }, .1);
        }
    }

    /**
     * Public method to change player state (e.g. to Running or Return)
     */
    public transitionToPose(type: PoseType) {
        this.setShotTypeVariable(type);
    }

    private playShot(type: ShotType) {
        this.activeShot = SHOT_MAP[type];
        this.swingT = 0;
        this.isSwinging = true;

        // Trigger the Animation Clip in the ClipsLayer
        this.setShotTypeVariable(this.activeShot.poseType);
    }

    private updateSwing(dt: number) {
        this.swingT += dt / this.activeShot.duration;
        const progress = Math.min(this.swingT, 1.0);
        const t = this.activeShot.easing(progress);

        // --- Bezier Calculation ---
        const bPos = this.calculateBezier(this.activeShot.startPos, this.activeShot.controlPoint, this.activeShot.endPos, t);

        // --- Rotation ---
        const currentQuat = new Quat();
        Quat.slerp(currentQuat, this.activeShot.startRot, this.activeShot.endRot, t);
        this.effector.setRotation(currentQuat);

        // --- Position ---
        const offset = bPos.clone().subtract(this.activeShot.startPos);
        const finalPos = this.effectorIdealPos.clone().add(offset);

        this.effector.setPosition(finalPos);

        // Send the target position to the IKLayer variables
        this._animCtrl?.setValue_experimental('effectorTarget', finalPos);

        if (this.swingT >= 1) {
            this.isSwinging = false;
            // Optional: Auto-return to Ideal in the graph after the shot duration
            // This allows the "Exit Time" transitions in your graph to take over
            this.scheduleOnce(() => {
                this.setShotTypeVariable(PoseType.Ideal);
                this.resetEffector();
            }, 0.2);
        }
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
        if (!this._animCtrl) return;

        const rPos = new Vec3();
        const lPos = new Vec3();

        if (this.PoleRight) {
            this.PoleRight.getPosition(rPos);
            this._animCtrl.setValue_experimental('rightPole', rPos);
        }
        if (this.PoleLeft) {
            this.PoleLeft.getPosition(lPos);
            this._animCtrl.setValue_experimental('leftPole', lPos);
        }
    }

    private onKeyDown(event: EventKeyboard) {
        const keyMap: Record<number, ShotType> = {
            [KeyCode.ARROW_UP]: ShotType.Straight,
            [KeyCode.ARROW_LEFT]: ShotType.Pull,
            [KeyCode.ARROW_RIGHT]: ShotType.Leg,
        };

        if (keyMap[event.keyCode] !== undefined) {
            this.playShot(keyMap[event.keyCode]);
        }

        // Example of taking a run manually
        if (event.keyCode === KeyCode.KEY_R) {
            this.transitionToPose(PoseType.Run);
        }
    }

    onButtonClick(e, f) {
        let shotType = Number(f) - 1;
        this.playShot(shotType);

        // Example of taking a run manually
        // if (e.keyCode === KeyCode.KEY_R) {
        //     this.transitionToPose(PoseType.Running);
        // }
    }

    public resetEffector() {
        this.effector.setPosition(this.effectorIdealPos);
        this.effector.setRotation(Quat.IDENTITY);
        this._animCtrl?.setValue_experimental('effectorTarget', this.effectorIdealPos);
    }
}