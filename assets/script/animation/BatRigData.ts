import { _decorator, Component, Node, Quat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BatRigData')
export class BatRigData {
    batRoot: Node;
    gripRight: Node;
    gripLeft: Node;
    poleRight: Node;
    poleLeft: Node;
}