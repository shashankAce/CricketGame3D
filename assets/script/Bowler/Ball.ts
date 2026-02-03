import { _decorator, Component, RigidBody, Vec3 } from 'cc';
const { ccclass } = _decorator;

@ccclass('Ball')
export class Ball extends Component {
    private _rb: RigidBody = null!;

    onLoad() {
        this._rb = this.getComponent(RigidBody)!;
    }

    public deliver(velocity: Vec3) {
        // Wake the physics up and apply the speed
        this._rb.useGravity = true;
        this._rb.setLinearVelocity(new Vec3(0, 0, 0));
        this._rb.setAngularVelocity(new Vec3(0, 0, 0));
        this._rb.setLinearVelocity(velocity);
    }

    public resetBall(position: Vec3) {
        this.node.setWorldPosition(position);
        this._rb.setLinearVelocity(Vec3.ZERO);
        this._rb.setAngularVelocity(Vec3.ZERO);
        this._rb.useGravity = false;
    }
}