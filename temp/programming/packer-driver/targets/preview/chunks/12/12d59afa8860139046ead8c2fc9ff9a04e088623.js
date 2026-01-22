System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, DifficultyTolerance, BattingLogic, _crd;

  function _reportPossibleCrUseOfIntent(extras) {
    _reporterNs.report("Intent", "./Intent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHitResult(extras) {
    _reporterNs.report("HitResult", "./HitResult", _context.meta, extras);
  }

  function _reportPossibleCrUseOfContactZone(extras) {
    _reporterNs.report("ContactZone", "./HitResult", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPowerLevel(extras) {
    _reporterNs.report("PowerLevel", "./HitResult", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTimingQuality(extras) {
    _reporterNs.report("TimingQuality", "./HitResult", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDifficulty(extras) {
    _reporterNs.report("Difficulty", "./Difficulty", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDifficultyTolerance(extras) {
    _reporterNs.report("DifficultyTolerance", "./Difficulty", _context.meta, extras);
  }

  _export("BattingLogic", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      DifficultyTolerance = _unresolved_2.DifficultyTolerance;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "62f41fAHLdBtYpf0LlpoqGr", "BattingLogic", undefined);

      _export("BattingLogic", BattingLogic = class BattingLogic {
        constructor(difficulty) {
          if (difficulty === void 0) {
            difficulty = "medium";
          }

          this.difficulty = void 0;
          this.difficulty = difficulty;
        }

        setDifficulty(difficulty) {
          this.difficulty = difficulty;
        }

        computeHit(intent, ball, timingOffset) {
          // 1) distance between intent and ball
          var dx = ball.x - intent.x;
          var dy = ball.y - intent.y;
          var dist = Math.sqrt(dx * dx + dy * dy); // 2) contact zone

          var radius = (_crd && DifficultyTolerance === void 0 ? (_reportPossibleCrUseOfDifficultyTolerance({
            error: Error()
          }), DifficultyTolerance) : DifficultyTolerance)[this.difficulty];
          var contact;
          if (dist <= radius * 0.3) contact = "sweet";else if (dist <= radius * 0.6) contact = "mistime";else if (dist <= radius) contact = "edge";else contact = "miss"; // 3) power from intent height

          var power;
          if (intent.y >= 0.5) power = "high";else if (intent.y >= -0.2) power = "medium";else power = "low"; // 4) timing

          var timing;
          if (timingOffset < -0.1) timing = "early";else if (timingOffset > 0.1) timing = "late";else timing = "perfect"; // 5) direction blend

          var direction = {
            x: intent.x * 0.8 + dx * 0.2,
            y: intent.y * 0.8 + dy * 0.2
          }; // 6) swing speed & duration

          var baseDuration = 0.7;
          var swingSpeed = power === "high" ? 1.2 : power === "medium" ? 1.0 : 0.8;
          var swingDuration = baseDuration / swingSpeed;
          return {
            contact,
            family: intent.family,
            power,
            direction,
            timing,
            swingSpeed,
            swingDuration
          };
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=12d59afa8860139046ead8c2fc9ff9a04e088623.js.map