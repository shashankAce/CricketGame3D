import { _decorator, Component, log, Node, Quat } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('PoseCapture')
@executeInEditMode(true)

export class PoseCapture extends Component {


    @property(Node) hips: Node = null!;
    @property(Node) spine: Node = null!;
    @property(Node) spine1: Node = null!;
    @property(Node) spine2: Node = null!;
    @property(Node) neck: Node = null!;

    @property(Node) leftUpLeg: Node = null!;
    @property(Node) leftLeg: Node = null!;

    @property(Node) rightUpLeg: Node = null!;
    @property(Node) rightLeg: Node = null!;

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
        this.dumpQuat('spine', this.spine);
        this.dumpQuat('spine1', this.spine1);
        this.dumpQuat('spine2', this.spine2);
        this.dumpQuat('neck', this.neck);

        this.dumpQuat('leftUpLeg', this.leftUpLeg);
        this.dumpQuat('leftLeg', this.leftLeg);

        this.dumpQuat('rightUpLeg', this.rightUpLeg);
        this.dumpQuat('rightLeg', this.rightLeg);


    }

    private dumpQuat(label: string, node: Node) {
        const q = node.rotation;
        console.log(
            `${label}: new Quat(${q.x.toFixed(6)}, ${q.y.toFixed(6)}, ${q.z.toFixed(6)}, ${q.w.toFixed(6)}),`
        );
    }
}



export const IdealPose = {
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
export const BattingPose = {
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
export const ReturnPose = {
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
export const DrivePose = {
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
export const ShotPose = {
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
export const BlockPose = {
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