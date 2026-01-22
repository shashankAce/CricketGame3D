
// DefaultBattingIdle.ts
import { Vec3 } from 'cc';
import { BattingIdleConfig } from './BattingIdleConfig';

export const DEFAULT_BATTING_IDLE: BattingIdleConfig = {
    speed: 1.0, // cycles per second
    joints: [


        {
            node: 'mixamorig:RightHand',
            baseEuler: new Vec3(-56.661, 27.621, 17.018),
            waggleAxis: new Vec3(1, 0, 0),
            amplitude: 6,
        },
        {
            node: 'mixamorig:RightForeArm',
            baseEuler: new Vec3(17.471, 18.494, -16.424),
            waggleAxis: new Vec3(0.7, 0, 0),
            amplitude: 3,
            phaseOffset: 0.2,
        },
        {
            node: 'mixamorig:RightArm',
            baseEuler: new Vec3(86.717, 56.49, -31.504),
            waggleAxis: new Vec3(0.4, 0, 0),
            amplitude: 2,
            phaseOffset: 0.4,
        },
    ],
};
