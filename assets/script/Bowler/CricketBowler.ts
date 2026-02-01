import { _decorator, Component, Node, Vec3, Camera, input, Input, EventTouch, geometry, EventKeyboard, KeyCode, log } from 'cc';
import { Ball } from './Ball';
const { ccclass, property } = _decorator;

@ccclass('CricketBowler')
export class CricketBowler extends Component {

    @property(Ball)
    ball: Ball = null!;

    @property(Camera)
    mainCamera: Camera = null!;

    @property
    deliverySpeed: number = 40; // Approx 140kph in physics units

    @property(Node)
    releasePoint: Node = null!; // An empty node where the ball starts its flight

    start() {
        input.on(Input.EventType.TOUCH_START, this.onBowl, this);
        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

    }

    private onKeyDown(event: EventKeyboard) {
        const keyMap: Record<number, string> = {
            [KeyCode.KEY_B]: 'Throw',
            [KeyCode.KEY_V]: 'SwingLeft',
            [KeyCode.KEY_N]: 'SwingRight',
        };

        if (keyMap[event.keyCode] !== undefined) {
            // this.onBowl();
        }

        // // Example of taking a run manually
        // if (event.keyCode === KeyCode.KEY_R) {
        //     this.transitionToPose(PoseType.Run);
        // }
    }

    onBowl(event: EventTouch) {
        if (!this.ball || !this.mainCamera) return;

        // 1. Move ball to the bowler's hand/release point
        const startPos = this.releasePoint ? this.releasePoint.worldPosition : this.node.worldPosition;
        this.ball.resetBall(startPos);

        // 2. Determine direction based on where you click on the screen (the "line" and "length")
        const touchPos = event.getLocation();
        const ray = new geometry.Ray();
        this.mainCamera.screenPointToRay(touchPos.x, touchPos.y, ray);
        log(touchPos.x, touchPos.y);

        // 3. Calculate pure directional velocity (No uplift)
        let launchVelocity = new Vec3();
        Vec3.copy(launchVelocity, ray.d);
        launchVelocity.normalize();
        launchVelocity.multiplyScalar(this.deliverySpeed);

        // 4. Tell the ball to fly
        this.ball.deliver(launchVelocity);
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this.onBowl, this);
    }
}