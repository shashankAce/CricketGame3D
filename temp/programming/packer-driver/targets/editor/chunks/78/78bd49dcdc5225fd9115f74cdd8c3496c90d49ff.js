System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _crd;

  function mapHitToBall(hit) {
    let trajectory;
    let speed;
    let boundary = false;

    switch (hit.contact) {
      case "sweet":
        trajectory = hit.family === "leg" ? "loft" : "ground";
        speed = hit.power === "high" ? "fast" : "medium";
        boundary = hit.power === "high";
        break;

      case "mistime":
        trajectory = "ground";
        speed = "medium";
        boundary = false;
        break;

      case "edge":
        trajectory = "edge";
        speed = "slow";
        boundary = false;
        break;

      case "miss":
        trajectory = "miss";
        speed = "slow";
        boundary = false;
        break;
    }

    return {
      trajectory,
      speed,
      direction: hit.direction,
      isBoundaryPossible: boundary
    };
  }

  function _reportPossibleCrUseOfHitResult(extras) {
    _reporterNs.report("HitResult", "./HitResult", _context.meta, extras);
  }

  _export("mapHitToBall", mapHitToBall);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2476ef449lP8L8OOcqt/Qe0", "BallBehaviour", undefined);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=78bd49dcdc5225fd9115f74cdd8c3496c90d49ff.js.map