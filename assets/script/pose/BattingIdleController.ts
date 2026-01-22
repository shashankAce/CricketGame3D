// BattingIdleController.ts
import {
    _decorator,
    Component,
    Node,
    Quat,
    Vec3,
    math,
} from 'cc';
import { BattingIdleConfig } from './BattingIdleConfig';
import { DEFAULT_BATTING_IDLE } from './DefaultBattingIdle';

const { ccclass, property } = _decorator;

@ccclass('BattingIdleController')
export class BattingIdleController extends Component {

    @property
    public enabledIdle = true;

    @property(Node)
    joints: Node[] = [];

    public config: BattingIdleConfig;

    private _time = 0;
    private _jointNodes = new Map<string, Node>();
    private _quat = new Quat();

    start() {
        this.config = DEFAULT_BATTING_IDLE;
        if (!this.config) {
            console.warn('BattingIdleController: No config assigned');
            return;
        }
        for (const node of this.joints) {
            this._jointNodes.set(node.name, node);
            // Apply base pose once
            let config = this.config.joints.find(v => v.node === node.name);
            node.setRotationFromEuler(config.baseEuler);
        }
    }

    update(dt: number) {
        if (!this.enabledIdle || !this.config) return;

        this._time += dt;
        const omega = this._time * math.TWO_PI * this.config.speed;

        for (const joint of this.config.joints) {
            const node = this._jointNodes.get(joint.node);
            if (!node) continue;

            const phase = joint.phaseOffset ?? 0;
            const s = Math.sin(omega + phase);

            const angle = joint.amplitude * s;

            const offsetEuler = new Vec3(
                joint.waggleAxis.x * angle,
                joint.waggleAxis.y * angle,
                joint.waggleAxis.z * angle
            );

            const finalEuler = new Vec3(
                joint.baseEuler.x + offsetEuler.x,
                joint.baseEuler.y + offsetEuler.y,
                joint.baseEuler.z + offsetEuler.z
            );

            node.setRotationFromEuler(finalEuler);
        }
    }
}
