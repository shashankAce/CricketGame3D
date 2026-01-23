System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, BatShotProfile, _crd;

  _export("BatShotProfile", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2ee8fGHbdZKY4ouE2S2Wpyo", "BatShotProfile", undefined);

      __checkObsolete__(['Vec3', 'Quat']);

      _export("BatShotProfile", BatShotProfile = class BatShotProfile {
        constructor() {
          this.batLocalPos = void 0;
          this.batLocalRot = void 0;
          this.swingArcAngle = void 0;
          this.swingPlaneNormal = void 0;
          this.spineTwist = void 0;
          this.pelvisTurn = void 0;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a4ed00dfe068926806d1010ddfd5f2f272be1967.js.map