System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _crd, ccclass, property, executeInEditMode, PoseCapture;

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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "fc4c052AXNL6JQ4PneqbkbT", "PoseCapture", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Quat']);

      ({
        ccclass,
        property,
        executeInEditMode
      } = _decorator);

      _export("PoseCapture", PoseCapture = (_dec = ccclass('PoseCapture'), _dec2 = executeInEditMode(true), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Node), _dec8 = property(Node), _dec9 = property(Node), _dec10 = property(Node), _dec11 = property(Node), _dec12 = property(Node), _dec(_class = _dec2(_class = (_class2 = class PoseCapture extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "leftUpLeg", _descriptor, this);

          _initializerDefineProperty(this, "leftLeg", _descriptor2, this);

          _initializerDefineProperty(this, "leftFoot", _descriptor3, this);

          _initializerDefineProperty(this, "rightUpLeg", _descriptor4, this);

          _initializerDefineProperty(this, "rightLeg", _descriptor5, this);

          _initializerDefineProperty(this, "rightFoot", _descriptor6, this);

          _initializerDefineProperty(this, "hips", _descriptor7, this);

          _initializerDefineProperty(this, "spine", _descriptor8, this);

          _initializerDefineProperty(this, "spine1", _descriptor9, this);

          _initializerDefineProperty(this, "chest", _descriptor10, this);

          _initializerDefineProperty(this, "capture", _descriptor11, this);
        }

        update(dt) {
          if (!this.capture) return;
          this.capturePose();
          this.capture = false;
        }

        capturePose() {
          console.log('===== BAT SWING POSE BEGIN =====');
          this.dumpQuat('hips', this.hips);
          this.dumpQuat('leftUpLeg', this.leftUpLeg);
          this.dumpQuat('leftLeg', this.leftLeg);
          this.dumpQuat('leftFoot', this.leftFoot);
          this.dumpQuat('rightUpLeg', this.rightUpLeg);
          this.dumpQuat('rightLeg', this.rightLeg);
          this.dumpQuat('rightFoot', this.rightFoot);
          this.dumpQuat('spine', this.spine);
          this.dumpQuat('spine1', this.spine1);
          this.dumpQuat('chest', this.chest);
        }

        dumpQuat(label, node) {
          var q = node.rotation;
          console.log(label + ": new Quat(" + q.x.toFixed(6) + ", " + q.y.toFixed(6) + ", " + q.z.toFixed(6) + ", " + q.w.toFixed(6) + "),");
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "leftUpLeg", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "leftLeg", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "leftFoot", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "rightUpLeg", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "rightLeg", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "rightFoot", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "hips", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "spine", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "spine1", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "chest", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "capture", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ba7990eb9ceeff08be571b69a49d7c9b03daa1f6.js.map