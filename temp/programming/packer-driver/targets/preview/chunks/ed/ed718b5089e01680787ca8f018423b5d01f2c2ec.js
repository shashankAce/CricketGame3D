System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, Quat, math, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _crd, ccclass, property, TMP_V3, TMP_Q1, TMP_Q2, TMP_Q3, TwoBoneIK;

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
      TMP_V3 = new Vec3();
      TMP_Q1 = new Quat();
      TMP_Q2 = new Quat();
      TMP_Q3 = new Quat();

      _export("TwoBoneIK", TwoBoneIK = (_dec = ccclass('TwoBoneIK'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Node), _dec8 = property(Node), _dec9 = property(Node), _dec10 = property(Node), _dec11 = property(Node), _dec12 = property({
        range: [0, 1, 0.01]
      }), _dec(_class = (_class2 = class TwoBoneIK extends Component {
        constructor() {
          super(...arguments);

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

          /** 0 = all twist to forearm, 1 = all twist to hand */
          _initializerDefineProperty(this, "wristTwistWeight", _descriptor11, this);

          /** Local twist axis of forearm (MOST rigs = X or Z) */
          _initializerDefineProperty(this, "forearmTwistAxis", _descriptor12, this);

          this._rightHandOffset = new Quat();
          this._leftHandOffset = new Quat();
          this._initialized = false;
        }

        start() {
          this.computeHandOffset(this.rightHand, this.rightHandTarget, this._rightHandOffset);
          this.computeHandOffset(this.leftHand, this.leftHandTarget, this._leftHandOffset);
          this._initialized = true;
        }

        lateUpdate() {
          if (!this._initialized) return;
          this.solveArm(this.rightArm, this.rightForeArm, this.rightHand, this.rightHandTarget, this.rightHandPole, this._rightHandOffset);
          this.solveArm(this.leftArm, this.leftForeArm, this.leftHand, this.leftHandTarget, this.leftHandPole, this._leftHandOffset);
        } // --------------------------------------------------


        solveArm(arm, foreArm, hand, target, pole, handOffset) {
          if (!arm || !foreArm || !hand || !target || !pole) return;
          var pS = arm.worldPosition;
          var pE = foreArm.worldPosition;
          var pH = hand.worldPosition;
          var pT = target.worldPosition;
          var pP = pole.worldPosition;
          var a = Vec3.distance(pS, pE);
          var b = Vec3.distance(pE, pH);
          var c = Vec3.distance(pS, pT);
          c = Math.min(c, a + b - 0.0001); // --- Law of Cosines (shoulder bend)

          var cosA = (a * a + c * c - b * b) / (2 * a * c);
          var angleA = Math.acos(math.clamp(cosA, -1, 1)); // Directions

          Vec3.subtract(TMP_V3, pT, pS).normalize();
          var dirToTarget = TMP_V3.clone();
          Vec3.subtract(TMP_V3, pP, pS).normalize();
          var dirToPole = TMP_V3.clone();
          var normal = Vec3.cross(new Vec3(), dirToTarget, dirToPole).normalize(); // ---------------- Shoulder ----------------

          Quat.fromAxisAngle(TMP_Q1, normal, angleA);
          Vec3.transformQuat(TMP_V3, dirToTarget, TMP_Q1);
          Quat.fromViewUp(TMP_Q1, normal, TMP_V3);
          arm.setWorldRotation(TMP_Q1); // ---------------- Elbow ----------------

          Vec3.subtract(TMP_V3, pT, foreArm.worldPosition).normalize();
          Quat.fromViewUp(TMP_Q1, normal, TMP_V3);
          foreArm.setWorldRotation(TMP_Q1); // ---------------- Twist distribution ----------------
          // Desired hand world rotation

          Quat.multiply(TMP_Q1, target.worldRotation, handOffset); // Convert desired hand rot to forearm local space

          Quat.invert(TMP_Q2, foreArm.worldRotation);
          Quat.multiply(TMP_Q3, TMP_Q2, TMP_Q1); // Decompose swing / twist

          var swing = new Quat();
          var twist = new Quat();
          this.decomposeSwingTwist(TMP_Q3, this.forearmTwistAxis, swing, twist); // Blend twist

          Quat.slerp(twist, Quat.IDENTITY, twist, 1.0 - this.wristTwistWeight); // Apply twist to forearm

          Quat.multiply(TMP_Q1, foreArm.worldRotation, twist);
          foreArm.setWorldRotation(TMP_Q1); // Apply remaining swing to hand

          Quat.multiply(TMP_Q2, TMP_Q1, swing);
          hand.setWorldRotation(TMP_Q2);
        } // --------------------------------------------------


        computeHandOffset(hand, target, out) {
          Quat.invert(TMP_Q1, target.worldRotation);
          Quat.multiply(out, TMP_Q1, hand.worldRotation);
        }

        decomposeSwingTwist(q, axis, outSwing, outTwist) {
          // 1. Dot product of the quaternion vector part and the twist axis
          var dot = q.x * axis.x + q.y * axis.y + q.z * axis.z; // 2. Set components

          outTwist.set(axis.x * dot, axis.y * dot, axis.z * dot, q.w); // 3. Static normalization

          Quat.normalize(outTwist, outTwist); // 4. swing = q * inverse(twist)

          Quat.invert(outSwing, outTwist);
          Quat.multiply(outSwing, q, outSwing); // 5. Static normalization

          Quat.normalize(outSwing, outSwing);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rightArm", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rightForeArm", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rightHand", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "rightHandTarget", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "rightHandPole", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "leftArm", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "leftForeArm", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "leftHand", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "leftHandTarget", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "leftHandPole", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "wristTwistWeight", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.2;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "forearmTwistAxis", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(1, 0, 1);
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ed718b5089e01680787ca8f018423b5d01f2c2ec.js.map