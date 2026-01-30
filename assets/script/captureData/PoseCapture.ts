import { _decorator, Component, log, Node, Quat, Vec3 } from 'cc';
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

        console.log(`hipsPos : new Vec3(${this.hips.position.toString()})`);
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
    hipsPos: new Vec3(-0.116, 0.934, 0.462),
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
export const ReturnPose = {
    hipsPos: new Vec3(0, 0.868, 0.465),
    hips: new Quat(0.282436, -0.648252, -0.168805, 0.686662),
    spine: new Quat(0.019292, 0.378351, 0.268401, 0.885686),
    spine1: new Quat(0.000000, 0.000000, 0.000000, 1.000000),
    spine2: new Quat(0.000000, 0.000000, 0.000000, 1.000000),
    neck: new Quat(-0.158275, 0.359929, -0.190103, 0.899589),
    leftUpLeg: new Quat(0.155789, 0.474599, 0.588565, -0.635671),
    leftLeg: new Quat(-0.499026, -0.075650, -0.286385, 0.814392),
    rightUpLeg: new Quat(-0.030121, 0.242918, 0.968926, -0.035575),
    rightLeg: new Quat(-0.132593, 0.029233, 0.009937, 0.990690),
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
export const DrivePose = {
    hipsPos: new Vec3(-0.116, 1.032, 0.259),
    hips: new Quat(0.038186, -0.565425, -0.038872, 0.822998),
    spine: new Quat(0.089293, 0.134453, 0.081757, 0.983496),
    spine1: new Quat(0.000000, 0.000000, 0.000000, 1.000000),
    spine2: new Quat(-0.006179, 0.155886, -0.054559, 0.986248),
    neck: new Quat(-0.019256, 0.320833, -0.066285, 0.944617),
    leftUpLeg: new Quat(-0.550622, -0.276109, -0.769307, 0.169544),
    leftLeg: new Quat(-0.228750, 0.105268, 0.013423, 0.967684),
    rightUpLeg: new Quat(0.081469, 0.076296, 0.987829, 0.108335),
    rightLeg: new Quat(-0.086904, 0.026815, 0.001148, 0.995855),
};
export const ShotPose = {
    hipsPos: new Vec3(0, 0.868, 0.465),
    hips: new Quat(0.282436, -0.648252, -0.168805, 0.686662),
    spine: new Quat(0.019292, 0.378351, 0.268401, 0.885686),
    spine1: new Quat(0.000000, 0.000000, 0.000000, 1.000000),
    spine2: new Quat(0.000000, 0.000000, 0.000000, 1.000000),
    neck: new Quat(-0.158275, 0.359929, -0.190103, 0.899589),
    leftUpLeg: new Quat(0.155789, 0.474599, 0.588565, -0.635671),
    leftLeg: new Quat(-0.499026, -0.075650, -0.286385, 0.814392),
    rightUpLeg: new Quat(-0.030121, 0.242918, 0.968926, -0.035575),
    rightLeg: new Quat(-0.132593, 0.029233, 0.009937, 0.990690),
};
export const BlockPose = {
    hipsPos: new Vec3(-0.116, 0.934, 0.462),
    hips: new Quat(0.038186, -0.565425, -0.038872, 0.822998),
    spine: new Quat(0.137893, 0.227470, -0.006261, 0.963952),
    spine1: new Quat(0.000000, 0.000000, 0.000000, 1.000000),
    spine2: new Quat(-0.006179, 0.155886, -0.054559, 0.986248),
    neck: new Quat(-0.028542, 0.316353, -0.097044, 0.943233),
    leftUpLeg: new Quat(-0.492175, -0.439512, -0.698840, 0.276071),
    leftLeg: new Quat(-0.510512, 0.089805, -0.004723, 0.855155),
    rightUpLeg: new Quat(0.098192, 0.018506, 0.968852, 0.226589),
    rightLeg: new Quat(-0.086904, 0.026815, 0.001148, 0.995855),
};