import { _decorator, Component, Node, Quat, Vec2, Vec3 } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('FreezeNode')
@executeInEditMode(true)

export class FreezeNode extends Component {
    @property(Node)
    target: Node = null;

    @property
    freeze = false;

    private pos = new Vec3();
    private rot = new Quat();

    protected onLoad(): void {
        this.pos = this.target.getPosition();
        this.rot = this.target.getRotation();
    }

    protected update(dt: number): void {
        if (!this.target)
            return;

        if (this.freeze) {
            this.target.setRotation(this.rot);
            this.target.setPosition(this.pos);
        }
    }
}