// BattingIdleConfig.ts
import { Vec3 } from 'cc';

export interface JointIdleConfig {
    node: string;          // bone node name
    baseEuler: Vec3;       // ideal posture rotation
    waggleAxis: Vec3;      // axis of motion (normalized-ish)
    amplitude: number;     // degrees
    phaseOffset?: number; // optional, in radians
}

export interface BattingIdleConfig {
    speed: number; // waggle frequency
    joints: JointIdleConfig[];
}
