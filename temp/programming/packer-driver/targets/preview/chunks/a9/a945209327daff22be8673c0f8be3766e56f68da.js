System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, executeInEditMode, BatRigCapture, batRigData;

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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "72cc7/qZKtLRJ3uhnFO49fz", "BatRigCapture", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3']);

      ({
        ccclass,
        property,
        executeInEditMode
      } = _decorator);

      _export("BatRigCapture", BatRigCapture = (_dec = ccclass('BatRigCapture'), _dec2 = executeInEditMode(true), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec(_class = _dec2(_class = (_class2 = class BatRigCapture extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "gripRight", _descriptor, this);

          _initializerDefineProperty(this, "gripLeft", _descriptor2, this);

          _initializerDefineProperty(this, "rightPole", _descriptor3, this);

          _initializerDefineProperty(this, "leftPole", _descriptor4, this);

          _initializerDefineProperty(this, "capture", _descriptor5, this);
        }

        update(dt) {
          if (!this.capture) return;
          this.capturePose();
          this.capture = false;
        }

        capturePose() {
          console.log('===== BAT RIG DATA BEGIN =====');
          this.dumpVec('gripRightPos', this.gripRight.position);
          this.dumpVec('gripLeftPos', this.gripLeft.position);
          this.dumpVec('rightPolePos', this.rightPole.position);
          this.dumpVec('leftPolePos', this.leftPole.position);
          console.log('===== BAT RIG DATA END =====');
        }

        dumpVec(label, v) {
          console.log(label + ": new Vec3(" + v.x.toFixed(4) + ", " + v.y.toFixed(4) + ", " + v.z.toFixed(4) + "),");
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gripRight", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gripLeft", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rightPole", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "leftPole", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "capture", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class) || _class));

      batRigData = {
        gripRightPos: new Vec3(0.0150, 0.1550, -0.0330),
        gripLeftPos: new Vec3(-0.0290, 0.2670, 0.0270),
        rightPolePos: new Vec3(0.2200, 1.3000, -1.7560),
        leftPolePos: new Vec3(0.2200, 1.3000, 1.1590)
      };

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a945209327daff22be8673c0f8be3766e56f68da.js.map