import { _decorator, Component, Node } from 'cc';
import { SwingCurve } from './SwingCurve';
const { ccclass, property } = _decorator;

@ccclass('SwingClip')
export class SwingClip {
    name: string;
    duration: number;

    rotX: SwingCurve;
    rotY: SwingCurve;
    rotZ: SwingCurve;

    posX: SwingCurve;
    posY: SwingCurve;
    posZ: SwingCurve;

    followThroughTime = 0.2;

    constructor(name: string, duration: number) {
        this.name = name;
        this.duration = duration;
    }
}