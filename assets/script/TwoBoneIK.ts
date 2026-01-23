import { _decorator, Component, Node, Vec3, Quat, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TwoBoneIK')
export class TwoBoneIK extends Component {

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

    // --- Configurable correction quaternions ---
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
        // Right hand offset
        {
            const inv = new Quat();
            Quat.invert(inv, this.rightHandTarget.worldRotation);
            Quat.multiply(this._rightHandOffset, inv, this.rightHand.worldRotation);
        }

        // Left hand offset
        {
            const inv = new Quat();
            Quat.invert(inv, this.leftHandTarget.worldRotation);
            Quat.multiply(this._leftHandOffset, inv, this.leftHand.worldRotation);
        }

        this._initialized = true;
    }

    lateUpdate(dt: number) {
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
        const pE_init = foreArm.worldPosition;
        const pH_init = hand.worldPosition;
        const pT = target.worldPosition;
        const pP = pole.worldPosition;

        // Segment lengths
        const a = Vec3.distance(pS, pE_init);
        const b = Vec3.distance(pE_init, pH_init);

        let c = Vec3.distance(pS, pT);
        c = Math.min(c, a + b - 0.001);

        // Law of cosines
        const cosAngle = (a * a + c * c - b * b) / (2 * a * c);
        const angle = Math.acos(math.clamp(cosAngle, -1, 1));

        // Directions
        const dirToTarget = Vec3.subtract(new Vec3(), pT, pS).normalize();
        const dirToPole = Vec3.subtract(new Vec3(), pP, pS).normalize();

        const normal = Vec3.cross(new Vec3(), dirToTarget, dirToPole).normalize();

        // --- Shoulder ---
        const qOffset = Quat.fromAxisAngle(new Quat(), normal, angle);
        const shoulderDir = new Vec3();
        Vec3.transformQuat(shoulderDir, dirToTarget, qOffset);

        const shoulderRot = new Quat();
        Quat.fromViewUp(shoulderRot, normal, shoulderDir);
        Quat.multiply(shoulderRot, shoulderRot, armCorrection); // apply correction
        arm.setWorldRotation(shoulderRot);

        // --- Elbow ---
        const pE_new = foreArm.worldPosition;
        const elbowDir = Vec3.subtract(new Vec3(), pT, pE_new).normalize();

        const elbowRot = new Quat();
        Quat.fromViewUp(elbowRot, normal, elbowDir);
        Quat.multiply(elbowRot, elbowRot, foreArmCorrection); // apply correction
        foreArm.setWorldRotation(elbowRot);

        // --- Hand rotation ---
        const finalHandRot = new Quat();
        Quat.multiply(finalHandRot, target.worldRotation, handOffset);
        Quat.multiply(finalHandRot, finalHandRot, handCorrection); // apply correction
        hand.setWorldRotation(finalHandRot);
    }
}
