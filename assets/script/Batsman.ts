import { _decorator, Component, Node } from 'cc';
import { HitResult } from './gameplay/HitResult';
import { Intent } from './gameplay/Intent';
import { ProceduralBatController } from './gameplay/ProceduralBatController';
import { Difficulty } from './gameplay/Difficulty';
import { BattingLogic } from './gameplay/BattingLogic';


const { ccclass, property } = _decorator;

@ccclass('Batsman')
export class Batsman extends Component {

    //     difficulty: Difficulty = "medium";
    //     private battingLogic!: BattingLogic;
    //     private batAnimator!: ProceduralBatController;
    //     private pendingIntent: Intent | null = null;

    //     start() {
    //         this.batAnimator = new ProceduralBatController();
    //     }

    //     /** Player presses shot button */
    //     onShotInput(intent: Intent) {
    //         this.pendingIntent = intent;
    //     }

    //     /** Ball reaches batting plane */
    //     onBallArrived(ballX: number, ballY: number, timingOffset: number) {
    //         if (!this.pendingIntent) return;

    //         const hit = this.battingLogic.computeHit(
    //             this.pendingIntent,
    //             { x: ballX, y: ballY },
    //             timingOffset
    //         );


    //         this.resolveHit(hit);
    //         this.pendingIntent = null;
    //     }

    //     // --------------------------

    //     private resolveHit(hit: HitResult) {
    //         // Trigger procedural animation
    //         this.batAnimator.setPlane(hit.family);
    //         this.batAnimator.playSwing(hit);

    //         // Apply ball physics later
    //         this.applyBallResult(hit);

    //         console.log("Hit Result:", hit);
    //     }

    //     private applyBallResult(hit: HitResult) {
    //         if (hit.contact === "miss") {
    //             return;
    //         }

    //         // Future:
    //         // - ball velocity
    //         // - spin
    //         // - trajectory
    //     }
    // }

    @property(Node)
    batNode!: Node;

    private proc!: ProceduralBatController;

    start() {
        this.proc = new ProceduralBatController(this.batNode);

        // auto play for test
        this.proc.play();
    }

    update(dt: number) {
        this.proc.update(dt);
    }
}