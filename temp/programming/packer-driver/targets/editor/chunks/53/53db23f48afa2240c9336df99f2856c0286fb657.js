System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, Quat, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, executeInEditMode, BaseSwingData;

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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ea3cfyduK1NpYaC9gp3KIvl", "BatSwingData", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'Quat']);

      ({
        ccclass,
        property,
        executeInEditMode
      } = _decorator);

      _export("BaseSwingData", BaseSwingData = (_dec = ccclass('BaseSwingData'), _dec2 = executeInEditMode(true), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Node), _dec8 = property(Node), _dec9 = property({
        tooltip: 'Toggle to capture pose'
      }), _dec(_class = _dec2(_class = (_class2 = class BaseSwingData extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "characterRoot", _descriptor, this);

          _initializerDefineProperty(this, "batRoot", _descriptor2, this);

          _initializerDefineProperty(this, "gripRight", _descriptor3, this);

          _initializerDefineProperty(this, "gripLeft", _descriptor4, this);

          _initializerDefineProperty(this, "rightPole", _descriptor5, this);

          _initializerDefineProperty(this, "leftPole", _descriptor6, this);

          _initializerDefineProperty(this, "poseName", _descriptor7, this);

          _initializerDefineProperty(this, "capture", _descriptor8, this);
        }

        update() {
          if (!this.capture) return;
          this.capture = false; // auto-reset (acts like button)

          this.capturePose();
        }

        capturePose() {
          const invRootRot = new Quat();
          Quat.invert(invRootRot, this.characterRoot.worldRotation); // Bat local

          const batLocalPos = new Vec3();
          Vec3.subtract(batLocalPos, this.batRoot.worldPosition, this.characterRoot.worldPosition);
          Vec3.transformQuat(batLocalPos, batLocalPos, invRootRot);
          const batLocalRot = new Quat();
          Quat.multiply(batLocalRot, invRootRot, this.batRoot.worldRotation); // Grips (already local)

          const rightGripLocal = this.gripRight.position.clone();
          const leftGripLocal = this.gripLeft.position.clone(); // Poles

          const rightPoleLocal = new Vec3();
          Vec3.subtract(rightPoleLocal, this.rightPole.worldPosition, this.characterRoot.worldPosition);
          Vec3.transformQuat(rightPoleLocal, rightPoleLocal, invRootRot);
          const leftPoleLocal = new Vec3();
          Vec3.subtract(leftPoleLocal, this.leftPole.worldPosition, this.characterRoot.worldPosition);
          Vec3.transformQuat(leftPoleLocal, leftPoleLocal, invRootRot);
          console.log(this.formatPose({
            name: this.poseName,
            batLocalPos,
            batLocalRot,
            rightGripLocal,
            leftGripLocal,
            rightPoleLocal,
            leftPoleLocal
          }));
        }

        formatPose(pose) {
          const v = v => `new Vec3(${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)})`;

          const q = q => `new Quat(${q.x.toFixed(3)}, ${q.y.toFixed(3)}, ${q.z.toFixed(3)}, ${q.w.toFixed(3)})`;

          return;
          `export const ${pose.name}Pose = {
                name: "${pose.name}",

                batLocalPos: ${v(pose.batLocalPos)},
                batLocalRot: ${q(pose.batLocalRot)},

                rightGripLocal: ${v(pose.rightGripLocal)},
                leftGripLocal: ${v(pose.leftGripLocal)},

                rightPoleLocal: ${v(pose.rightPoleLocal)},
                leftPoleLocal: ${v(pose.leftPoleLocal)},
            };`;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "characterRoot", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "batRoot", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "gripRight", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "gripLeft", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "rightPole", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "leftPole", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "poseName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 'StraightDrive';
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "capture", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      })), _class2)) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=53db23f48afa2240c9336df99f2856c0286fb657.js.map