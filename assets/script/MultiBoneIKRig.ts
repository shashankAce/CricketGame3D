import { _decorator, Component, Node, Vec3, Quat, math, CCInteger, log } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('MultiBoneIKRig')
@executeInEditMode(true)
export class MultiBoneIKRig extends Component {
    @property([Node])
    public boneChain: Node[] = [];

    @property(Node)
    public targetHandle: Node = null!;

    @property
    public solveInEditor: boolean = true;

    @property({ type: CCInteger })
    public iterations: number = 10;

    @property
    public tolerance: number = 0.1;

    update() {
        if (!this.solveInEditor || this.boneChain.length < 2 || !this.targetHandle) return;
        this.solveCCD();
    }

    private solveCCD() {
        const effector = this.boneChain[this.boneChain.length - 1];
        const targetPos = this.targetHandle.worldPosition;

        for (let iter = 0; iter < this.iterations; iter++) {

            effector.updateWorldTransform();

            if (Vec3.distance(effector.worldPosition, targetPos) < this.tolerance)
                break;

            for (let i = this.boneChain.length - 2; i >= 0; i--) {

                const joint = this.boneChain[i];

                joint.updateWorldTransform();
                effector.updateWorldTransform();

                const jointPos = joint.worldPosition;

                const toEffector = new Vec3();
                const toTarget = new Vec3();

                Vec3.subtract(toEffector, effector.worldPosition, jointPos).normalize();
                Vec3.subtract(toTarget, targetPos, jointPos).normalize();

                // World-space rotation delta
                const worldDelta = new Quat();
                Quat.rotationTo(worldDelta, toEffector, toTarget);

                // Convert delta to local space
                const parentWorldRot = new Quat();
                if (joint.parent) {
                    joint.parent.getWorldRotation(parentWorldRot);
                    Quat.invert(parentWorldRot, parentWorldRot);
                    Quat.multiply(worldDelta, parentWorldRot, worldDelta);
                }

                // Apply in local joint space
                const newLocalRot = new Quat();
                Quat.multiply(newLocalRot, worldDelta, joint.rotation);

                joint.setRotation(newLocalRot);
            }
        }
    }

}