export type ContactZone = "sweet" | "mistime" | "edge" | "miss";
export type PowerLevel = "low" | "medium" | "high";
export type TimingQuality = "early" | "perfect" | "late";

export interface HitResult {
    contact: ContactZone;
    family: "leg" | "straight" | "off";
    power: PowerLevel;
    direction: { x: number; y: number };
    timing: TimingQuality;

    ////
    swingSpeed: number;
    swingDuration: number;
}
