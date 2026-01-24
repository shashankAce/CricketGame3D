import { _decorator, Component, math, Node, Quat, Vec3 } from 'cc';
import { TwoBoneIK1 } from './TwoBoneIK1';
import { SpineController } from './SpineController';
import { PoseData } from './PoseData';
import { BatRigData } from './BatRigData';
import { SwingClip } from './SwingClip';
const { ccclass, property } = _decorator;

const TMP_V3 = new Vec3();
const TMP_Q1 = new Quat();

@ccclass('BatSwingController')
export class BatSwingController extends Component {

    // Character
    @property(Node)
    characterRoot: Node = null;

    // Bat
    @property(Node)
    batRoot: Node = null;
    @property(Node)
    gripRight: Node = null;
    @property(Node)
    gripLeft: Node = null;
    // poleRight: Node;
    // poleLeft: Node;

    @property(TwoBoneIK1)
    ik: TwoBoneIK1 = null;

    @property(SpineController)
    spine: SpineController = null;

    // Runtime
    private pose!: PoseData;
    private rig!: BatRigData;
    private clip!: SwingClip;

    private time = 0;
    private playing = false;

    play(clip: SwingClip, pose: PoseData) {
        this.clip = clip;
        this.pose = pose;
        this.time = 0;
        this.playing = true;

        this.applyPose(pose);
    }

    protected lateUpdate(dt: number): void {
        if (!this.playing) return;

        this.time += dt;
        const t = math.clamp01(this.time / this.clip.duration);

        this.applyBatTransform(t);
        this.updateHandTargets();
        this.ik.solve();
        this.spine.applyFollow(this.batRoot);


        if (t >= 1)
            this.playing = false;
    }

    private applyPose(pose: PoseData) {
        pose.bones.forEach(v => {
            v.node.setPosition(v.pos);
            v.node.setRotation(v.rot);
        });
    }

    private applyBatTransform(t: number) {
        TMP_V3.set(
            this.clip.posX.evaluate(t),
            this.clip.posY.evaluate(t),
            this.clip.posZ.evaluate(t)
        );
        this.batRoot.setPosition(TMP_V3);

        Quat.fromEuler(
            TMP_Q1,
            this.clip.rotX.evaluate(t),
            this.clip.rotY.evaluate(t),
            this.clip.rotZ.evaluate(t),
        );
        this.batRoot.setRotation(TMP_Q1);
    }

    private updateHandTargets() {
        this.ik.rightHandTarget.setWorldPosition(this.gripRight.worldPosition);
        this.ik.leftHandTarget.setWorldPosition(this.gripLeft.worldPosition);

        this.ik.rightHandTarget.setWorldRotation(this.gripRight.worldRotation);
        this.ik.leftHandTarget.setWorldRotation(this.gripLeft.worldRotation);
    }
}


