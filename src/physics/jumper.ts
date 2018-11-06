import { EnvironmentElement } from './environment-element';
import { ActionExcecuter, ActionType } from './action-excecuter';

export class Jumper implements ActionExcecuter {
    type: ActionType = ActionType.JUMP;
    
    constructor(
        private element: EnvironmentElement,
        private maxJumpCount: number = 2,
        private jumpForce: number = -10) {

    }
    jumpCount = 0;
    excecute() {
        if (this.element.isInFloor) {
            this.jumpCount = 0;
        } else if (this.jumpCount == 0){
            return;
        }
        if (this.jumpCount < this.maxJumpCount) {
            this.jumpCount ++;
            this.element.dY = this.jumpForce;
        }
    }
}