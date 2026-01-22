System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, Quat, math, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _crd, ccclass, property, TwoBoneIK;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Vec3 = _cc.Vec3;
      Quat = _cc.Quat;
      math = _cc.math;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "04c09WC00lO9K5MAnIL/yLb", "TwoBoneIK", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'Quat', 'math']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("TwoBoneIK", TwoBoneIK = (_dec = ccclass('TwoBoneIK'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Node), _dec8 = property(Node), _dec9 = property(Node), _dec10 = property(Node), _dec11 = property(Node), _dec(_class = (_class2 = class TwoBoneIK extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "rightArm", _descriptor, this);

          _initializerDefineProperty(this, "rightForeArm", _descriptor2, this);

          _initializerDefineProperty(this, "rightHand", _descriptor3, this);

          _initializerDefineProperty(this, "rightHandTarget", _descriptor4, this);

          _initializerDefineProperty(this, "rightHandPole", _descriptor5, this);

          _initializerDefineProperty(this, "leftArm", _descriptor6, this);

          _initializerDefineProperty(this, "leftForeArm", _descriptor7, this);

          _initializerDefineProperty(this, "leftHand", _descriptor8, this);

          _initializerDefineProperty(this, "leftHandTarget", _descriptor9, this);

          _initializerDefineProperty(this, "leftHandPole", _descriptor10, this);

          this._rightHandOffset = new Quat();
          this._leftHandOffset = new Quat();
          this._initialized = false;
        }

        start() {
          // Right hand offset
          {
            const inv = new Quat();
            Quat.invert(inv, this.rightHandTarget.worldRotation);
            Quat.multiply(this._rightHandOffset, inv, this.rightHand.worldRotation);
          } // Left hand offset

          {
            const inv = new Quat();
            Quat.invert(inv, this.leftHandTarget.worldRotation);
            Quat.multiply(this._leftHandOffset, inv, this.leftHand.worldRotation);
          }
          this._initialized = true;
        }

        lateUpdate(dt) {
          if (!this._initialized) return;
          this.solveArm(this.rightArm, this.rightForeArm, this.rightHand, this.rightHandTarget, this.rightHandPole, this._rightHandOffset);
          this.solveArm(this.leftArm, this.leftForeArm, this.leftHand, this.leftHandTarget, this.leftHandPole, this._leftHandOffset);
        }

        solveArm(arm, foreArm, hand, target, pole, handOffset) {
          if (!arm || !foreArm || !hand || !target || !pole) return;
          const pS = arm.worldPosition;
          const pE_init = foreArm.worldPosition;
          const pH_init = hand.worldPosition;
          const pT = target.worldPosition;
          const pP = pole.worldPosition; // Segment lengths

          const a = Vec3.distance(pS, pE_init);
          const b = Vec3.distance(pE_init, pH_init);
          let c = Vec3.distance(pS, pT);
          c = Math.min(c, a + b - 0.001); // Law of cosines

          const cosAngle = (a * a + c * c - b * b) / (2 * a * c);
          const angle = Math.acos(math.clamp(cosAngle, -1, 1)); // Directions

          const dirToTarget = Vec3.subtract(new Vec3(), pT, pS).normalize();
          const dirToPole = Vec3.subtract(new Vec3(), pP, pS).normalize();
          const normal = Vec3.cross(new Vec3(), dirToTarget, dirToPole).normalize(); // --- Shoulder ---

          const qOffset = Quat.fromAxisAngle(new Quat(), normal, angle);
          const shoulderDir = new Vec3();
          Vec3.transformQuat(shoulderDir, dirToTarget, qOffset);
          const shoulderRot = new Quat();
          Quat.fromViewUp(shoulderRot, normal, shoulderDir);
          arm.setWorldRotation(shoulderRot); // --- Elbow ---

          const pE_new = foreArm.worldPosition;
          const elbowDir = Vec3.subtract(new Vec3(), pT, pE_new).normalize();
          const elbowRot = new Quat();
          Quat.fromViewUp(elbowRot, normal, elbowDir);
          foreArm.setWorldRotation(elbowRot); // --- Hand rotation ---

          const finalHandRot = new Quat();
          Quat.multiply(finalHandRot, target.worldRotation, handOffset);
          hand.setWorldRotation(finalHandRot);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rightArm", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rightForeArm", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rightHand", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "rightHandTarget", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "rightHandPole", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "leftArm", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "leftForeArm", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "leftHand", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "leftHandTarget", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "leftHandPole", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a682893c29131707dca8caea4f8116039e3497f0.js.map