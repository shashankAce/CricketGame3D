import { Intent } from "./Intent";
import { HitResult, ContactZone, PowerLevel, TimingQuality } from "./HitResult";
import { Difficulty, DifficultyTolerance } from "./Difficulty";

export class BattingLogic {

    private difficulty: Difficulty;

    constructor(difficulty: Difficulty = "medium") {
        this.difficulty = difficulty;
    }

    setDifficulty(difficulty: Difficulty) {
        this.difficulty = difficulty;
    }

    computeHit(
        intent: Intent,
        ball: { x: number; y: number },
        timingOffset: number
    ): HitResult {

        // 1) distance between intent and ball
        const dx = ball.x - intent.x;
        const dy = ball.y - intent.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // 2) contact zone
        const radius = DifficultyTolerance[this.difficulty];

        let contact: ContactZone;
        if (dist <= radius * 0.3) contact = "sweet";
        else if (dist <= radius * 0.6) contact = "mistime";
        else if (dist <= radius) contact = "edge";
        else contact = "miss";

        // 3) power from intent height
        let power: PowerLevel;
        if (intent.y >= 0.5) power = "high";
        else if (intent.y >= -0.2) power = "medium";
        else power = "low";

        // 4) timing
        let timing: TimingQuality;
        if (timingOffset < -0.1) timing = "early";
        else if (timingOffset > 0.1) timing = "late";
        else timing = "perfect";

        // 5) direction blend
        const direction = {
            x: intent.x * 0.8 + dx * 0.2,
            y: intent.y * 0.8 + dy * 0.2,
        };

        // 6) swing speed & duration
        const baseDuration = 0.7;
        const swingSpeed =
            power === "high" ? 1.2 :
                power === "medium" ? 1.0 :
                    0.8;

        const swingDuration = baseDuration / swingSpeed;

        return {
            contact,
            family: intent.family,
            power,
            direction,
            timing,
            swingSpeed,
            swingDuration,
        };
    }
}
