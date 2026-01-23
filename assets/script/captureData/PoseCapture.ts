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


const poseData = {
    hips: new Quat(0.121869, 0.000000, 0.000000, 0.992546),
    leftUpLeg: new Quat(0.005393, 0.343336, 0.938233, 0.042546),
    leftLeg: new Quat(-0.264384, -0.001683, -0.024195, 0.964112),
    leftFoot: new Quat(0.490332, -0.013001, 0.068387, 0.868751),
    rightUpLeg: new Quat(0.020307, 0.358695, 0.926448, 0.112340),
    rightLeg: new Quat(-0.235009, 0.036462, 0.071024, 0.968709),
    rightFoot: new Quat(0.509740, 0.000000, 0.000000, 0.860329),
    spine: new Quat(0.000000, 0.077589, 0.000000, 0.996985),
    spine1: new Quat(0.195090, 0.000000, 0.000000, 0.980785),
    chest: new Quat(0.000000, 0.000000, 0.000000, 1.000000)
}