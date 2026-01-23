import { Vec3, Quat } from "cc";

export class BatShotProfile {
    batLocalPos!: Vec3;
    batLocalRot!: Quat;

    swingArcAngle!: number;
    swingPlaneNormal!: Vec3;

    spineTwist!: number;
    pelvisTurn!: number;
}
