import { SwingPlane } from "./SwingPlane";

export type ShotType =
    | "leg_flick" | "leg_pull" | "leg_hook"
    | "straight_block" | "straight_drive" | "straight_on_drive"
    | "off_late_cut" | "off_square_drive" | "off_cover_drive";

export interface Intent {
    family: SwingPlane;
    type: ShotType;
    x: number;
    y: number;
}
