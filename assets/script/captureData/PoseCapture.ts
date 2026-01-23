import { _decorator, Component, Node, Quat } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('PoseCapture')
@executeInEditMode(true)

export class PoseCapture extends Component {

    @property(Node) leftUpLeg: Node = null!;
    @property(Node) leftLeg: Node = null!;
    @property(Node) leftFoot: Node = null!;

    @property(Node) rightUpLeg: Node = null!;
    @property(Node) rightLeg: Node = null!;
    @property(Node) rightFoot: Node = null!;

    @property(Node) hips: Node = null!;
    @property(Node) spine: Node = null!;
    @property(Node) spine1: Node = null!;
    @property(Node) chest: Node = null!;

    @property
    capture = false;

    protected update(dt: number): void {
        if (!this.capture) return;
        this.capturePose();
        this.capture = false;
    }

    capturePose() {
        console.log('===== BAT SWING POSE BEGIN =====');

        this.dumpQuat('hips', this.hips);

        this.dumpQuat('leftUpLeg', this.leftUpLeg);
        this.dumpQuat('leftLeg', this.leftLeg);
        this.dumpQuat('leftFoot', this.leftFoot);

        this.dumpQuat('rightUpLeg', this.rightUpLeg);
        this.dumpQuat('rightLeg', this.rightLeg);
        this.dumpQuat('rightFoot', this.rightFoot);

        this.dumpQuat('spine', this.spine);
        this.dumpQuat('spine1', this.spine1);
        this.dumpQuat('chest', this.chest);

    }

    private dumpQuat(label: string, node: Node) {
        const q = node.rotation;
        console.log(
            `${label}: new Quat(${q.x.toFixed(6)}, ${q.y.toFixed(6)}, ${q.z.toFixed(6)}, ${q.w.toFixed(6)}),`
        );
    }
}
