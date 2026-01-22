System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _crd, SwingPlanes;

  function _reportPossibleCrUseOfSwingPlane(extras) {
    _reporterNs.report("SwingPlane", "./SwingPlane", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f0175B155ZNn7OQyswObFYX", "SwingPlanesConfig", undefined);

      _export("SwingPlanes", SwingPlanes = {
        leg: {
          startAngle: 20,
          endAngle: -60,
          heightFactor: 0.8
        },
        straight: {
          startAngle: 0,
          endAngle: -80,
          heightFactor: 0.5
        },
        off: {
          startAngle: -20,
          endAngle: -60,
          heightFactor: 0.8
        }
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=fa6709102309ed7b92cb8d28caddfa029cfd4399.js.map