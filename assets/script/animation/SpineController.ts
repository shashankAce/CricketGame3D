import { _decorator, Component, Node, Quat } from 'cc';
const { ccclass, property } = _decorator;

const TMP_Q1 = new Quat();

@ccclass('SpineController')
export class SpineController extends Component {
    @property([Node])
    spineBones: Node[] = [];
    
    weight: number[];

    @property
    followStrength = 0.3;

    applyFollow(bat: Node) {
        for (let i = 0; i < this.spineBones.length; i++) {
            const bone = this.spineBones[i];

            const w = (i + 1) / this.spineBones.length * this.followStrength;
            Quat.slerp(
                TMP_Q1,
                bone.worldRotation,
                bat.worldRotation,
                w
            );

            bone.setWorldRotation(TMP_Q1);
        }
    }
}