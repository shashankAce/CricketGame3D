System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Quat, ProceduralBatController, _crd;

  _export("ProceduralBatController", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Quat = _cc.Quat;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a076e8UCuhISKnmh0jXbjgy", "ProceduralBatController", undefined); // import { HitResult } from "./HitResult";
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


      __checkObsolete__(['Node', 'Quat', 'Vec3']);

      _export("ProceduralBatController", ProceduralBatController = class ProceduralBatController {
        constructor(batNode) {
          this.batNode = void 0;
          this.time = 0;
          this.playing = false;
          this.batNode = batNode;
        }

        play() {
          this.time = 0;
          this.playing = true;
        }

        update(dt) {
          if (!this.playing) return;
          this.time += dt; // simple swing curve

          const angle = Math.sin(this.time * 4) * 45;
          const q = new Quat();
          Quat.fromEuler(q, 0, angle, angle);
          this.batNode.setRotation(q);

          if (this.time > 1) {
            this.time = 0; // this.playing = false;
          }
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=669bb49c8349b9b06db5d513146c31d5d99f3409.js.map