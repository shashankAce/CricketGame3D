import { PoseData } from "./PoseData";
import { SwingClip } from "./SwingClip";
import { SwingCurve } from "./SwingCurve";

export class ShotPreset {
    name: string;
    pose: PoseData;
    swing: SwingClip;

    constructor(n: string, p: PoseData, s: SwingClip) {
        this.name = n;
        this.pose = p;
        this.swing = s;
    }
}

export class ShotLibrary {
    static poses: Record<string, PoseData> = {};
    static swings: Record<string, SwingClip> = {};
    static shots: Record<string, ShotPreset> = {};

    static init(character: any) {

        ///// CHARACTER POSE DATA////

        const neutral = new PoseData('neutral');
        neutral.capture([
            character.hips,
            character.spine,
            character.spine2,
            character.neck,
            character.leftLeg,
            character.rightLeg
        ]);
        this.poses.neutral = neutral;


        ///// SWINGS////

        const coverDrive = new SwingClip('coverDrive', 0.5);
        coverDrive.posX = new SwingCurve([0, 0, 0.05]);
        coverDrive.posY = new SwingCurve([0, 0.1, 0.05]);
        coverDrive.posZ = new SwingCurve([0, 0, 0]);

        coverDrive.rotX = new SwingCurve([0, -30, -10]);
        coverDrive.rotY = new SwingCurve([0, 90, 110]);
        coverDrive.rotZ = new SwingCurve([0, 0, 5]);

        this.swings.coverDrive = coverDrive;

        /////  SHOTS //////

        this.shots.coverDrive = new ShotPreset(
            'coverDrive',
            neutral,
            coverDrive
        );
    }
}