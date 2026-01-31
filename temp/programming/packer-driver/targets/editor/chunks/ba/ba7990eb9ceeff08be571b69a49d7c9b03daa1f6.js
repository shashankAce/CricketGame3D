System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, log, Node, Quat, Vec3, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _crd, ccclass, property, executeInEditMode, PoseCapture, IdealPose, BattingPose, ReturnPose, ShotPose, DrivePose, BlockPose;

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
      log = _cc.log;
      Node = _cc.Node;
      Quat = _cc.Quat;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "fc4c052AXNL6JQ4PneqbkbT", "PoseCapture", undefined);

      __checkObsolete__(['_decorator', 'Component', 'log', 'Node', 'Quat', 'Vec3']);

      ({
        ccclass,
        property,
        executeInEditMode
      } = _decorator);

      _export("PoseCapture", PoseCapture = (_dec = ccclass('PoseCapture'), _dec2 = executeInEditMode(true), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Node), _dec8 = property(Node), _dec9 = property(Node), _dec10 = property(Node), _dec11 = property(Node), _dec(_class = _dec2(_class = (_class2 = class PoseCapture extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "hips", _descriptor, this);

          _initializerDefineProperty(this, "spine", _descriptor2, this);

          _initializerDefineProperty(this, "spine1", _descriptor3, this);

          _initializerDefineProperty(this, "spine2", _descriptor4, this);

          _initializerDefineProperty(this, "neck", _descriptor5, this);

          _initializerDefineProperty(this, "leftUpLeg", _descriptor6, this);

          _initializerDefineProperty(this, "leftLeg", _descriptor7, this);

          _initializerDefineProperty(this, "rightUpLeg", _descriptor8, this);

          _initializerDefineProperty(this, "rightLeg", _descriptor9, this);

          _initializerDefineProperty(this, "capture", _descriptor10, this);
        }

        update(dt) {
          if (!this.capture) return;
          this.capturePose();
          this.capture = false;
        }

        capturePose() {
          log('===== BAT SWING POSE BEGIN =====');
          log(`hipsPos : new Vec3${this.hips.position.toString()},`);
          this.dumpQuat('hips', this.hips);
          this.dumpQuat('spine', this.spine);
          this.dumpQuat('spine1', this.spine1);
          this.dumpQuat('spine2', this.spine2);
          this.dumpQuat('neck', this.neck);
          this.dumpQuat('leftUpLeg', this.leftUpLeg);
          this.dumpQuat('leftLeg', this.leftLeg);
          this.dumpQuat('rightUpLeg', this.rightUpLeg);
          this.dumpQuat('rightLeg', this.rightLeg);
        }

        dumpQuat(label, node) {
          const q = node.rotation;
          log(`${label}: new Quat(${q.x.toFixed(6)}, ${q.y.toFixed(6)}, ${q.z.toFixed(6)}, ${q.w.toFixed(6)}),`);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "hips", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spine", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spine1", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "spine2", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "neck", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "leftUpLeg", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "leftLeg", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "rightUpLeg", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "rightLeg", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "capture", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      })), _class2)) || _class) || _class));

      _export("IdealPose", IdealPose = {
        hipsPos: new Vec3(0, 1.004, 0.092),
        hips: new Quat(0.000000, -0.642788, 0.000000, 0.766044),
        spine: new Quat(0.268710, 0.231614, 0.001200, 0.934959),
        spine1: new Quat(0.000000, 0.000000, 0.000000, 1.000000),
        spine2: new Quat(0.000000, 0.000000, 0.000000, 1.000000),
        neck: new Quat(-0.114046, 0.348510, -0.213704, 0.905464),
        leftUpLeg: new Quat(0.330235, 0.228918, 0.910585, -0.096829),
        leftLeg: new Quat(-0.264813, -0.020612, -0.034155, 0.963474),
        rightUpLeg: new Quat(0.000386, 0.220761, 0.974620, 0.037146),
        rightLeg: new Quat(-0.225373, -0.000574, 0.033157, 0.973708)
      });

      _export("BattingPose", BattingPose = {
        hipsPos: new Vec3(0, 1.042, 0.01),
        hips: new Quat(0.000000, -0.642788, 0.000000, 0.766044),
        spine: new Quat(0.407986, 0.000002, 0.071933, 0.910150),
        spine1: new Quat(0.000000, 0.000000, 0.000000, 1.000000),
        spine2: new Quat(0.000000, 0.000000, 0.000000, 1.000000),
        neck: new Quat(-0.138874, 0.442497, -0.343998, 0.816441),
        leftUpLeg: new Quat(0.000521, 0.296151, 0.953807, 0.050474),
        leftLeg: new Quat(-0.333289, -0.000907, 0.052395, 0.941367),
        rightUpLeg: new Quat(0.000520, 0.296142, 0.953809, 0.050474),
        rightLeg: new Quat(-0.333274, -0.000912, 0.052384, 0.941373)
      });

      _export("ReturnPose", ReturnPose = {
        hipsPos: new Vec3(0, 1.004, 0.092),
        hips: new Quat(0.000000, -0.449327, 0.000000, 0.893367),
        spine: new Quat(0.114819, 0.020075, -0.040724, 0.992348),
        spine1: new Quat(0.000000, 0.000000, 0.000000, 1.000000),
        spine2: new Quat(0.000000, -0.000000, 0.000000, 1.000000),
        neck: new Quat(-0.046522, 0.263326, -0.005007, 0.963571),
        leftUpLeg: new Quat(0.138206, 0.043088, 0.987541, -0.061686),
        leftLeg: new Quat(-0.088217, 0.001180, -0.067689, 0.993798),
        rightUpLeg: new Quat(0.000384, -0.016994, 0.999178, 0.036804),
        rightLeg: new Quat(-0.038091, -0.000000, 0.000000, 0.999274)
      });

      _export("ShotPose", ShotPose = {
        hipsPos: new Vec3(-0.025, 1.094, 0.10),
        hips: new Quat(0.000000, -0.509860, 0.000000, 0.860257),
        spine: new Quat(0.068174, 0.182604, 0.068646, 0.978415),
        spine1: new Quat(0.003352, 0.076076, -0.019010, 0.996915),
        spine2: new Quat(0.006878, 0.156221, -0.039039, 0.986926),
        neck: new Quat(0.007691, 0.138281, -0.066546, 0.988125),
        leftUpLeg: new Quat(-0.370492, -0.062304, -0.924857, 0.059112),
        leftLeg: new Quat(-0.053389, 0.063635, -0.058594, 0.994820),
        rightUpLeg: new Quat(0.004332, 0.070664, 0.995652, 0.060545),
        rightLeg: new Quat(-0.142113, 0.094140, -0.029346, 0.984927)
      });

      _export("DrivePose", DrivePose = {
        hipsPos: new Vec3(-0.216, 1.032, 0.27),
        hips: new Quat(0.038186, -0.565425, -0.038872, 0.822998),
        spine: new Quat(0.089293, 0.134453, 0.081757, 0.983496),
        spine1: new Quat(0.000000, 0.000000, 0.000000, 1.000000),
        spine2: new Quat(-0.006179, 0.155886, -0.054559, 0.986248),
        neck: new Quat(-0.019256, 0.320833, -0.066285, 0.944617),
        leftUpLeg: new Quat(-0.550622, -0.276109, -0.769307, 0.169544),
        leftLeg: new Quat(-0.228750, 0.105268, 0.013423, 0.967684),
        rightUpLeg: new Quat(0.081469, 0.076296, 0.987829, 0.108335),
        rightLeg: new Quat(-0.086904, 0.026815, 0.001148, 0.995855)
      });

      _export("BlockPose", BlockPose = {
        hipsPos: new Vec3(0, 0.934, 0.462),
        hips: new Quat(0.038186, -0.565425, -0.038872, 0.822998),
        spine: new Quat(0.137893, 0.227470, -0.006261, 0.963952),
        spine1: new Quat(0.000000, 0.000000, 0.000000, 1.000000),
        spine2: new Quat(-0.006179, 0.155886, -0.054559, 0.986248),
        neck: new Quat(-0.028542, 0.316353, -0.097044, 0.943233),
        leftUpLeg: new Quat(-0.492175, -0.439512, -0.698840, 0.276071),
        leftLeg: new Quat(-0.510512, 0.089805, -0.004723, 0.855155),
        rightUpLeg: new Quat(0.098192, 0.018506, 0.968852, 0.226589),
        rightLeg: new Quat(-0.086904, 0.026815, 0.001148, 0.995855)
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ba7990eb9ceeff08be571b69a49d7c9b03daa1f6.js.map