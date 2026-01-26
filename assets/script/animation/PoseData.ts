import { Quat, Node, Vec3 } from "cc";

// export class PoseBone {
//     node: Node;
//     // pos: Vec3;
//     rot: Quat
//     constructor(node: Node) {
//         this.node = node;
//         // this.pos = node.position.clone();
//         this.rot = node.rotation.clone();
//     }
// }

// export enum Poses {
//     ideal,
//     coverDrive
// }

// export interface Joints {
//     hips: Quat;
//     leftUpLeg: Quat;
//     leftLeg: Quat;
//     leftFoot: Quat;
//     rightUpLeg: Quat;
//     rightLeg: Quat;
//     rightFoot: Quat;
//     spine: Quat;
//     spine1: Quat;
//     chest: Quat;
// }
export class PoseController {
    getPose(pose: string) {
        return PoseData[pose];
    }
}

const PoseData = {
    ideal: {
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
}