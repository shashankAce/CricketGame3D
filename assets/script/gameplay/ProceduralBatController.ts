// import { HitResult } from "./HitResult";
// import { SwingPlane } from "./SwingPlane";

// export class ProceduralBatController {

//     private plane: SwingPlane = "straight";

//     private swingTime = 0;
//     private swingDuration = 0;
//     private swingSpeed = 1;
//     private isSwinging = false;

//     setPlane(plane: SwingPlane) {
//         this.plane = plane;
//     }

//     playSwing(hit: HitResult) {
//         this.swingTime = 0;
//         this.swingDuration = hit.swingDuration;
//         this.swingSpeed = hit.swingSpeed;
//         this.isSwinging = true;
//     }

//     update(dt: number) {
//         if (!this.isSwinging) return;

//         this.swingTime += dt * this.swingSpeed;

//         const t = Math.min(this.swingTime / this.swingDuration, 1);

//         this.applySwingPose(t);

//         if (t >= 1) {
//             this.isSwinging = false;
//         }
//     }

//     // ---------------- INTERNAL ----------------

//     private applySwingPose(t: number) {
//         // t = 0..1
//         // For now this is empty
//         // Next milestone: rotate bones here
//     }
// }

import { Node, Quat, Vec3 } from "cc";

export class ProceduralBatController {

    private batNode: Node;

    private time = 0;
    private playing = false;

    constructor(batNode: Node) {
        this.batNode = batNode;
    }

    play() {
        this.time = 0;
        this.playing = true;
    }

    update(dt: number) {
        if (!this.playing) return;

        this.time += dt;

        // simple swing curve
        const angle = Math.sin(this.time * 4) * 45;

        const q = new Quat();
        Quat.fromEuler(q, 0, angle, angle);
        this.batNode.setRotation(q);

        if (this.time > 1) {
            this.time = 0;
            // this.playing = false;
        }
    }
}
