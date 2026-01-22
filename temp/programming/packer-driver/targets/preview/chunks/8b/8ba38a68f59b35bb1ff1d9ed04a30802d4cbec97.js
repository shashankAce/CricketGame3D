// import { _decorator, Component, Node, Vec3, Quat, math } from 'cc';
// const { ccclass, property } = _decorator;
// @ccclass('TwoBoneIK')
// export class TwoBoneIK extends Component {
//     @property(Node) shoulder: Node = null!; // RightArm
//     @property(Node) elbow: Node = null!;    // RightForeArm
//     @property(Node) hand: Node = null!;     // RightHand
//     @property(Node) target: Node = null!;
//     @property(Node) pole: Node = null!;
//     private _v3_1 = new Vec3();
//     private _v3_2 = new Vec3();
//     lateUpdate(dt: number) {
//         if (!this.shoulder || !this.elbow || !this.hand || !this.target || !this.pole) return;
//         this.solveIK();
//     }
//     solveIK() {
//         const pS = this.shoulder.worldPosition;
//         const pE = this.elbow.worldPosition;
//         const pH = this.hand.worldPosition;
//         const pT = this.target.worldPosition;
//         const pP = this.pole.worldPosition;
//         // 1. Calculate lengths
//         const a = Vec3.distance(pS, pE);
//         const b = Vec3.distance(pE, pH);
//         let c = Vec3.distance(pS, pT);
//         // Clamp distance to avoid triangle breakdown
//         const totalLen = a + b;
//         c = math.clamp(c, 0.01, totalLen - 0.0001);
//         // 2. Law of Cosines for angles
//         const cosShoulder = (a * a + c * c - b * b) / (2 * a * c);
//         const angleShoulder = Math.acos(math.clamp(cosShoulder, -1, 1));
//         // 3. Construct the Plane Normal (Hinge Axis)
//         const dirToTarget = Vec3.subtract(new Vec3(), pT, pS).normalize();
//         const dirToPole = Vec3.subtract(new Vec3(), pP, pS).normalize();
//         const normal = Vec3.cross(new Vec3(), dirToTarget, dirToPole).normalize();
//         // 4. Calculate Shoulder World Orientation
//         // Direction from shoulder to elbow
//         const shoulderToElbowDir = new Vec3();
//         const qShoulderOffset = Quat.fromAxisAngle(new Quat(), normal, angleShoulder);
//         Vec3.transformQuat(shoulderToElbowDir, dirToTarget, qShoulderOffset);
//         const shoulderRot = new Quat();
//         // Mixamo: Y is length, Normal (Z) is elbow back
//         Quat.fromViewUp(shoulderRot, normal, shoulderToElbowDir);
//         this.shoulder.setWorldRotation(shoulderRot);
//         // 5. Calculate Elbow World Orientation (THE FIX)
//         // Instead of Euler, we find where the hand should be
//         const elbowPos = this.elbow.worldPosition; // Get new position after shoulder moved
//         const dirToHand = Vec3.subtract(new Vec3(), pT, elbowPos).normalize();
//         const elbowRot = new Quat();
//         // Again, align Y to hand and Z to the same plane normal
//         Quat.fromViewUp(elbowRot, normal, dirToHand);
//         this.elbow.setWorldRotation(elbowRot);
//     }
// }
// import { _decorator, Component, Node, Vec3, Quat, math } from 'cc';
// const { ccclass, property } = _decorator;
// @ccclass('TwoBoneIK')
// export class TwoBoneIK extends Component {
//     @property(Node) shoulder: Node = null!; // RightArm
//     @property(Node) elbow: Node = null!;    // RightForeArm
//     @property(Node) hand: Node = null!;     // RightHand
//     @property(Node) target: Node = null!;
//     @property(Node) pole: Node = null!;
//     private _worldUp = new Vec3(0, 1, 0);
//     lateUpdate(dt: number) {
//         if (!this.shoulder || !this.elbow || !this.hand || !this.target || !this.pole) return;
//         this.solveIK();
//     }
//     solveIK() {
//         const pS = this.shoulder.worldPosition;
//         // We use the initial distances between nodes to define the bone lengths
//         const pE_init = this.elbow.worldPosition;
//         const pH_init = this.hand.worldPosition;
//         const pT = this.target.worldPosition;
//         const pP = this.pole.worldPosition;
//         // 1. Calculate lengths
//         const a = Vec3.distance(pS, pE_init);
//         const b = Vec3.distance(pE_init, pH_init);
//         let c = Vec3.distance(pS, pT);
//         // Soft IK / Clamping: Prevents snapping when the arm is fully extended
//         const totalLen = a + b;
//         c = Math.min(c, totalLen - 0.001);
//         // 2. Law of Cosines for the Shoulder Angle
//         const cosShoulder = (a * a + c * c - b * b) / (2 * a * c);
//         const angleShoulder = Math.acos(math.clamp(cosShoulder, -1, 1));
//         // 3. Construct the Plane Normal (The Hinge Axis)
//         const dirToTarget = Vec3.subtract(new Vec3(), pT, pS).normalize();
//         const dirToPole = Vec3.subtract(new Vec3(), pP, pS).normalize();
//         const normal = Vec3.cross(new Vec3(), dirToTarget, dirToPole).normalize();
//         // If Target and Pole are perfectly aligned, use World Up as a fallback
//         if (normal.lengthSqr() < 0.0001) Vec3.cross(normal, dirToTarget, this._worldUp).normalize();
//         // 4. Solve Shoulder
//         const shoulderToElbowDir = new Vec3();
//         const qShoulderOffset = Quat.fromAxisAngle(new Quat(), normal, angleShoulder);
//         Vec3.transformQuat(shoulderToElbowDir, dirToTarget, qShoulderOffset);
//         const shoulderRot = new Quat();
//         // Mixamo: Y points to Elbow, Normal (Z) is the hinge back
//         Quat.fromViewUp(shoulderRot, normal, shoulderToElbowDir);
//         this.shoulder.setWorldRotation(shoulderRot);
//         // 5. Solve Elbow
//         // After shoulder moves, the elbow position changes in world space
//         const pE_new = this.elbow.worldPosition;
//         const elbowToHandDir = Vec3.subtract(new Vec3(), pT, pE_new).normalize();
//         const elbowRot = new Quat();
//         // Mixamo: Y points to Hand, Normal (Z) remains consistent on the plane
//         Quat.fromViewUp(elbowRot, normal, elbowToHandDir);
//         this.elbow.setWorldRotation(elbowRot);
//         // 6. Solve Hand Rotation
//         // Simply match the target's rotation so the palm/fingers align with the target object
//         this.hand.setWorldRotation(this.target.worldRotation);
//     }
// }
System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e5f5bUjfopMd7u+7kN7LHDP", "twoboneikold", undefined);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8ba38a68f59b35bb1ff1d9ed04a30802d4cbec97.js.map