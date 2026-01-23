import { Vec3, Quat } from "cc";

export const IdealPose = {
    name: "Ideal",
    batLocalPos: new Vec3(-0.001, 0.577, 0.508),
    batLocalRot: new Quat(-0.125, 0.875, -0.324, 0.337),
    rightGripLocal: new Vec3(0.015, 0.155, -0.033),
    leftGripLocal: new Vec3(-0.029, 0.267, 0.027),
    rightPoleLocal: new Vec3(-1.756, 1.300, 0.135),
    leftPoleLocal: new Vec3(1.159, 1.300, 0.135),
};