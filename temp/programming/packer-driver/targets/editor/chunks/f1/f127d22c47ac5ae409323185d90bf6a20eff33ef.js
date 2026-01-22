System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, ProceduralBatController, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, Batsman;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfProceduralBatController(extras) {
    _reporterNs.report("ProceduralBatController", "./gameplay/ProceduralBatController", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
    }, function (_unresolved_2) {
      ProceduralBatController = _unresolved_2.ProceduralBatController;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "722d9/NxLxBSYYXTnUrzm+b", "Batsman", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Batsman", Batsman = (_dec = ccclass('Batsman'), _dec2 = property(Node), _dec(_class = (_class2 = class Batsman extends Component {
        constructor(...args) {
          super(...args);

          //     difficulty: Difficulty = "medium";
          //     private battingLogic!: BattingLogic;
          //     private batAnimator!: ProceduralBatController;
          //     private pendingIntent: Intent | null = null;
          //     start() {
          //         this.batAnimator = new ProceduralBatController();
          //     }
          //     /** Player presses shot button */
          //     onShotInput(intent: Intent) {
          //         this.pendingIntent = intent;
          //     }
          //     /** Ball reaches batting plane */
          //     onBallArrived(ballX: number, ballY: number, timingOffset: number) {
          //         if (!this.pendingIntent) return;
          //         const hit = this.battingLogic.computeHit(
          //             this.pendingIntent,
          //             { x: ballX, y: ballY },
          //             timingOffset
          //         );
          //         this.resolveHit(hit);
          //         this.pendingIntent = null;
          //     }
          //     // --------------------------
          //     private resolveHit(hit: HitResult) {
          //         // Trigger procedural animation
          //         this.batAnimator.setPlane(hit.family);
          //         this.batAnimator.playSwing(hit);
          //         // Apply ball physics later
          //         this.applyBallResult(hit);
          //         console.log("Hit Result:", hit);
          //     }
          //     private applyBallResult(hit: HitResult) {
          //         if (hit.contact === "miss") {
          //             return;
          //         }
          //         // Future:
          //         // - ball velocity
          //         // - spin
          //         // - trajectory
          //     }
          // }
          _initializerDefineProperty(this, "batNode", _descriptor, this);

          this.proc = void 0;
        }

        start() {
          this.proc = new (_crd && ProceduralBatController === void 0 ? (_reportPossibleCrUseOfProceduralBatController({
            error: Error()
          }), ProceduralBatController) : ProceduralBatController)(this.batNode); // auto play for test

          this.proc.play();
        }

        update(dt) {
          this.proc.update(dt);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "batNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f127d22c47ac5ae409323185d90bf6a20eff33ef.js.map