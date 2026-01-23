import { _decorator, Component, Node, Vec3, Quat, math } from 'cc';
const { ccclass, property } = _decorator;

const TMP_V3 = new Vec3();
const TMP_Q1 = new Quat();
const TMP_Q2 = new Quat();
const TMP_Q3 = new Quat();

@ccclass('TwoBoneIK1')
export class TwoBoneIK1 extends Component {

    @property(Node) rightArm: Node = null!;
    @property(Node) rightForeArm: Node = null!;
    @property(Node) rightHand: Node = null!;
    @property(Node) rightHandTarget: Node = null!;
    @property(Node) rightHandPole: Node = null!;

    @property(Node) leftArm: Node = null!;
    @property(Node) leftForeArm: Node = null!;
    @property(Node) leftHand: Node = null!;
    @property(Node) leftHandTarget: Node = null!;
    @property(Node) leftHandPole: Node = null!;

    /** 0 = all twist to forearm, 1 = all twist to hand */
    @property({ range: [0, 1, 0.01] })
    wristTwistWeight = 0.2;

    /** Local twist axis of forearm (MOST rigs = X or Z) */
    @property
    forearmTwistAxis = new Vec3(1, 0, 0);

    rightArmCorrection: Quat = Quat.IDENTITY.clone();
    rightForeArmCorrection: Quat = Quat.IDENTITY.clone();
    rightHandCorrection: Quat = Quat.IDENTITY.clone();
    leftArmCorrection: Quat = Quat.IDENTITY.clone();
    leftForeArmCorrection: Quat = Quat.IDENTITY.clone();
    leftHandCorrection: Quat = Quat.IDENTITY.clone();

    private _rightHandOffset = new Quat();
    private _leftHandOffset = new Quat();
    private _initialized = false;

    start() {
        this.computeHandOffset(this.rightHand, this.rightHandTarget, this._rightHandOffset);
        this.computeHandOffset(this.leftHand, this.leftHandTarget, this._leftHandOffset);
        this._initialized = true;
    }

    lateUpdate() {
        if (!this._initialized) return;

        this.solveArm(
            this.rightArm,
            this.rightForeArm,
            this.rightHand,
            this.rightHandTarget,
            this.rightHandPole,
            this._rightHandOffset,
            this.rightArmCorrection,
            this.rightForeArmCorrection,
            this.rightHandCorrection
        );

        this.solveArm(
            this.leftArm,
            this.leftForeArm,
            this.leftHand,
            this.leftHandTarget,
            this.leftHandPole,
            this._leftHandOffset,
            this.leftArmCorrection,
            this.leftForeArmCorrection,
            this.leftHandCorrection
        );
    }

    // --------------------------------------------------

    private solveArm(
        arm: Node,
        foreArm: Node,
        hand: Node,
        target: Node,
        pole: Node,
        handOffset: Quat,
        armCorrection: Quat,
        foreArmCorrection: Quat,
        handCorrection: Quat
    ) {
        if (!arm || !foreArm || !hand || !target || !pole) return;

        const pS = arm.worldPosition;
        const pE = foreArm.worldPosition;
        const pH = hand.worldPosition;
        const pT = target.worldPosition;
        const pP = pole.worldPosition;

        const a = Vec3.distance(pS, pE);
        const b = Vec3.distance(pE, pH);

        let c = Vec3.distance(pS, pT);
        c = Math.min(c, a + b - 0.0001);

        // --- Law of Cosines (shoulder bend)
        const cosA = (a * a + c * c - b * b) / (2 * a * c);
        const angleA = Math.acos(math.clamp(cosA, -1, 1));

        // Directions
        Vec3.subtract(TMP_V3, pT, pS).normalize();
        const dirToTarget = TMP_V3.clone();

        Vec3.subtract(TMP_V3, pP, pS).normalize();
        const dirToPole = TMP_V3.clone();

        const normal = Vec3.cross(new Vec3(), dirToTarget, dirToPole).normalize();

        // ---------------- Shoulder ----------------
        Quat.fromAxisAngle(TMP_Q1, normal, angleA);
        Vec3.transformQuat(TMP_V3, dirToTarget, TMP_Q1);

        Quat.fromViewUp(TMP_Q1, normal, TMP_V3);
        Quat.multiply(TMP_Q1, TMP_Q1, armCorrection); // correction
        arm.setWorldRotation(TMP_Q1);

        // ---------------- Elbow ----------------
        Vec3.subtract(TMP_V3, pT, foreArm.worldPosition).normalize();
        Quat.fromViewUp(TMP_Q1, normal, TMP_V3);
        Quat.multiply(TMP_Q1, TMP_Q1, foreArmCorrection); // correction
        foreArm.setWorldRotation(TMP_Q1);

        // ---------------- Twist distribution ----------------

        // Desired hand world rotation
        Quat.multiply(TMP_Q1, target.worldRotation, handOffset);

        // Convert desired hand rot to forearm local space
        Quat.invert(TMP_Q2, foreArm.worldRotation);
        Quat.multiply(TMP_Q3, TMP_Q2, TMP_Q1);

        // Decompose swing / twist
        const swing = new Quat();
        const twist = new Quat();
        this.decomposeSwingTwist(TMP_Q3, this.forearmTwistAxis, swing, twist);

        // Blend twist
        Quat.slerp(twist, Quat.IDENTITY, twist, 1.0 - this.wristTwistWeight);

        // Apply twist to forearm
        Quat.multiply(TMP_Q1, foreArm.worldRotation, twist);
        foreArm.setWorldRotation(TMP_Q1);

        // Apply remaining swing to hand
        Quat.multiply(TMP_Q2, TMP_Q1, swing);
        Quat.multiply(TMP_Q2, TMP_Q2, handCorrection); // correction
        hand.setWorldRotation(TMP_Q2);
    }

    // --------------------------------------------------

    private computeHandOffset(hand: Node, target: Node, out: Quat) {
        Quat.invert(TMP_Q1, target.worldRotation);
        Quat.multiply(out, TMP_Q1, hand.worldRotation);
    }

    private decomposeSwingTwist(
        q: Quat,
        axis: Vec3,
        outSwing: Quat,
        outTwist: Quat
    ) {
        const dot = q.x * axis.x + q.y * axis.y + q.z * axis.z;
        outTwist.set(axis.x * dot, axis.y * dot, axis.z * dot, q.w);
        Quat.normalize(outTwist, outTwist);

        Quat.invert(outSwing, outTwist);
        Quat.multiply(outSwing, q, outSwing);
        Quat.normalize(outSwing, outSwing);
    }
}
