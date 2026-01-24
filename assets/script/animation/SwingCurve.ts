import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SwingCurve')
export class SwingCurve {

    keys: number[];

    constructor(keys: number[]) {
        this.keys = keys;
    }

    duration: number;
    evaluate(t: number): number {
        const n = this.keys.length - 1;
        const f = t * n;
        const i = Math.floor(f);
        const frac = f - i;

        if (i >= n)
            return this.keys[n];

        return this.keys[i] * (1 - frac) + this.keys[i + 1] * frac;
    }
}