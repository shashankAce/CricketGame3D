System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Vec3, Quat, _crd, IdealPose;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Vec3 = _cc.Vec3;
      Quat = _cc.Quat;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "eea2ejdXNBBOpd/ACVnBFXw", "PoseConfig", undefined);

      __checkObsolete__(['Vec3', 'Quat']);

      _export("IdealPose", IdealPose = {
        name: "Ideal",
        batLocalPos: new Vec3(-0.001, 0.577, 0.508),
        batLocalRot: new Quat(-0.125, 0.875, -0.324, 0.337),
        rightGripLocal: new Vec3(0.015, 0.155, -0.033),
        leftGripLocal: new Vec3(-0.029, 0.267, 0.027),
        rightPoleLocal: new Vec3(-1.756, 1.300, 0.135),
        leftPoleLocal: new Vec3(1.159, 1.300, 0.135)
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=059994a33c526cb14e1edd218f18bb475915323f.js.map