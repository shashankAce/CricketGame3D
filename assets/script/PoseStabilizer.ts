import { _decorator, Component, Node, Vec3, Quat } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('PoseStabilizer')
@executeInEditMode(true)
export class PoseStabilizer extends Component {

    @property({ tooltip: "Turn this ON to lock the bones in place" })
    public freezeAll: boolean = false;

    @property([Node])
    public bonesToPin: Node[] = [];

    // Store the 'home' location for the frozen bones
    private _savedTransforms: Map<Node, { pos: Vec3, rot: Quat }> = new Map();

    update(dt: number) {
        if (!this.freezeAll) {
            // If we turn off freeze, clear the memory so we can grab new positions later
            if (this._savedTransforms.size > 0) this._savedTransforms.clear();
            return;
        }

        // 1. If this is the first frame of freezing, capture the current World positions
        if (this._savedTransforms.size === 0) {
            for (const bone of this.bonesToPin) {
                if (bone) {
                    this._savedTransforms.set(bone, {
                        pos: bone.worldPosition.clone(),
                        rot: bone.worldRotation.clone()
                    });
                }
            }
        }

        // 2. Force bones back to their saved World positions
        // This automatically updates their LOCAL position/rotation 
        // which the Animation Window then records.
        this._savedTransforms.forEach((transform, bone) => {
            bone.setWorldPosition(transform.pos);
            bone.setWorldRotation(transform.rot);
        });
    }
}