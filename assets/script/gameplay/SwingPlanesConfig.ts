import { SwingPlane } from "./SwingPlane";

export interface PlaneConfig {
    // angle of swing in degrees
    startAngle: number;
    endAngle: number;

    // height factor (0..1)
    heightFactor: number;
}

export const SwingPlanes: Record<SwingPlane, PlaneConfig> = {
    leg: { startAngle: 20, endAngle: -60, heightFactor: 0.8 },
    straight: { startAngle: 0, endAngle: -80, heightFactor: 0.5 },
    off: { startAngle: -20, endAngle: -60, heightFactor: 0.8 },
};
