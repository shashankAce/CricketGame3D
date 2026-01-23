import { _decorator, Component, Node, Vec3, Quat } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('BaseSwingData')
@executeInEditMode(true)
export class BaseSwingData extends Component {

    @property(Node) characterRoot: Node = null!;
    @property(Node) batRoot: Node = null!;
    @property(Node) gripRight: Node = null!;
    @property(Node) gripLeft: Node = null!;
    @property(Node) rightPole: Node = null!;
    @property(Node) leftPole: Node = null!;

    @property
    poseName: string = 'StraightDrive';

    @property({ tooltip: 'Toggle to capture pose' })
    capture: boolean = false;

    update() {
        if (!this.capture) return;

        this.capture = false; // auto-reset (acts like button)
        this.capturePose();
    }

    private capturePose() {
        const invRootRot = new Quat();
        Quat.invert(invRootRot, this.characterRoot.worldRotation);

        // Bat local
        const batLocalPos = new Vec3();
        Vec3.subtract(batLocalPos, this.batRoot.worldPosition, this.characterRoot.worldPosition);
        Vec3.transformQuat(batLocalPos, batLocalPos, invRootRot);

        const batLocalRot = new Quat();
        Quat.multiply(batLocalRot, invRootRot, this.batRoot.worldRotation);

        // Grips (already local)
        const rightGripLocal = this.gripRight.position.clone();
        const leftGripLocal = this.gripLeft.position.clone();

        // Poles
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

    private formatPose(pose: any): string {
        const v = (v: Vec3) => `new Vec3(${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)})`;
        const q = (q: Quat) => `new Quat(${q.x.toFixed(3)}, ${q.y.toFixed(3)}, ${q.z.toFixed(3)}, ${q.w.toFixed(3)})`;

        return
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
}