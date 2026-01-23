import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('BatRigCapture')
@executeInEditMode(true)

export class BatRigCapture extends Component {

    @property(Node) gripRight: Node = null!;
    @property(Node) gripLeft: Node = null!;
    @property(Node) rightPole: Node = null!;
    @property(Node) leftPole: Node = null!;

    @property
    capture = false;

    protected update(dt: number): void {
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

    private dumpVec(label: string, v: Vec3) {
        console.log(
            `${label}: new Vec3(${v.x.toFixed(4)}, ${v.y.toFixed(4)}, ${v.z.toFixed(4)}),`
        );
    }
}

const batRigData = {
    gripRightPos: new Vec3(0.0150, 0.1550, -0.0330),
    gripLeftPos: new Vec3(-0.0290, 0.2670, 0.0270),
    rightPolePos: new Vec3(0.2200, 1.3000, -1.7560),
    leftPolePos: new Vec3(0.2200, 1.3000, 1.1590)
}