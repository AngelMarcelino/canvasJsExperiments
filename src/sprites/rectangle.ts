import { Renderable } from "../physics/renderable";
import { EnvironmentElement } from "../physics/environment-element";
import { ActionExcecuter, ActionType } from "../physics/action-excecuter";
import { Jumper } from "../physics/jumper";
import { Point } from "../physics/point";

export class Rectangle extends EnvironmentElement {
    actionList: ActionExcecuter[] = [];
    constructor() {
        super();
        this.actionList.push(new Jumper(this));
    }

    excecute(type: ActionType) {
        if (!type) {
            this.actionList.forEach(element => {
                element.excecute();
            });
        }
    }

    
    
    render(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export function contructRectangle(x: number, y: number, width: number = 50, height: number = 50, affectedByGravity: boolean = true): Rectangle {
    const result = new Rectangle();
    result.x = x;
    result.y = y;
    result.width = width;
    result.height = height;
    result.affectedByGravity = affectedByGravity
    return result;
}

