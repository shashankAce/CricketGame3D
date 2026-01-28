import { _decorator, animation, Component, EventKeyboard, Input, input, Node, KeyCode, Quat, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnimGraphController')
export class AnimGraphController extends Component {
    private _animCtrl: animation.AnimationController | null = null;
    private hip_rotation: Quat = new Quat();
    private counter = 0;
    private keyPressed = { x: 0, y: 0, z: 0 };

    @property(Node)
    effector: Node = null;

    protected onLoad(): void {
        this._animCtrl = this.getComponent(animation.AnimationController);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(dt: number) {
        this.counter += 1; // degrees per frame
        // Quat.fromEuler(this.hip_rotation, 0, this.counter, 1);
        // this._animCtrl?.setValue_experimental('hip_rotation', this.hip_rotation);
        // this._animCtrl?.setValue_experimental('neck_rotation', Quat.fromEuler(new Quat(), 0, this.counter, 1));
        // this._animCtrl?.setValue_experimental('leg_rotation', Quat.fromEuler(new Quat(), 0, -this.counter, 1));

        let pos = this.effector.position.add(new Vec3(this.keyPressed.x * dt, this.keyPressed.y * dt, this.keyPressed.z * dt));
        this.effector.setPosition(pos);
        this._animCtrl?.setValue_experimental('effectorTarget', pos);


        // this.effector.setPosition();
    }

    private onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                this.keyPressed.y = 1;
                break;
            case KeyCode.KEY_S:
                this.keyPressed.y = -1;
                break;
            case KeyCode.KEY_A:
                this.keyPressed.x = 1;
                break;
            case KeyCode.KEY_D:
                this.keyPressed.x = -1;
                break;
            case KeyCode.KEY_Z:
                this.keyPressed.z = -1;
                break;
            case KeyCode.SPACE:
                this.keyPressed.z = 1;
                break;
        }
    }

    private onKeyUp(event: EventKeyboard) {
        this.keyPressed = { x: 0, y: 0, z: 0 };
    }
}