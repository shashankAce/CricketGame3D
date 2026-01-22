System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Vec3, _crd, DEFAULT_BATTING_IDLE;

  function _reportPossibleCrUseOfBattingIdleConfig(extras) {
    _reporterNs.report("BattingIdleConfig", "./BattingIdleConfig", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2ddccko4XBM4KfTUhfS2P0Y", "DefaultBattingIdle", undefined); // DefaultBattingIdle.ts


      __checkObsolete__(['Vec3']);

      _export("DEFAULT_BATTING_IDLE", DEFAULT_BATTING_IDLE = {
        speed: 1.0,
        // cycles per second
        joints: [{
          node: 'mixamorig:RightHand',
          baseEuler: new Vec3(-56.661, 27.621, 17.018),
          waggleAxis: new Vec3(1, 0, 0),
          amplitude: 6
        }, {
          node: 'mixamorig:RightForeArm',
          baseEuler: new Vec3(17.471, 18.494, -16.424),
          waggleAxis: new Vec3(0.7, 0, 0),
          amplitude: 3,
          phaseOffset: 0.2
        }, {
          node: 'mixamorig:RightArm',
          baseEuler: new Vec3(86.717, 56.49, -31.504),
          waggleAxis: new Vec3(0.4, 0, 0),
          amplitude: 2,
          phaseOffset: 0.4
        }]
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4ff9aac63104092aabb7e1731a696c7d6f1862e4.js.map