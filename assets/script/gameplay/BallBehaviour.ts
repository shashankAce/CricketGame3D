import { HitResult } from "./HitResult";

export type BallTrajectory = "ground" | "loft" | "edge" | "miss";
export type BallSpeed = "slow" | "medium" | "fast";

export interface BallLaunch {
    trajectory: BallTrajectory;
    speed: BallSpeed;
    direction: { x: number; y: number };
    isBoundaryPossible: boolean;
}

export function mapHitToBall(hit: HitResult): BallLaunch {

    let trajectory: BallTrajectory;
    let speed: BallSpeed;
    let boundary = false;

    switch (hit.contact) {
        case "sweet":
            trajectory = hit.family === "leg" ? "loft" : "ground";
            speed = hit.power === "high" ? "fast" : "medium";
            boundary = hit.power === "high";
            break;

        case "mistime":
            trajectory = "ground";
            speed = "medium";
            boundary = false;
            break;

        case "edge":
            trajectory = "edge";
            speed = "slow";
            boundary = false;
            break;

        case "miss":
            trajectory = "miss";
            speed = "slow";
            boundary = false;
            break;
    }

    return {
        trajectory,
        speed,
        direction: hit.direction,
        isBoundaryPossible: boundary,
    };
}
