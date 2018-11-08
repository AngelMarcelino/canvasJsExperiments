import { Renderable } from "../physics/renderable";
import { EnvironmentElement } from "../physics/environment-element";
import { ActionExcecuter, ActionType } from "../physics/action-excecuter";
import { Jumper } from "../physics/jumper";
import { Point } from "../physics/point";

export class Circle extends EnvironmentElement {
    private _width: number;
    set width(value: number) {
        this._width = value;
        this.height = value;
    }
    get width(): number {
        return this._width;
    }
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
        context.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
        if ( this.willFill) {
            context.fill();
        } else {
            context.stroke();
        }
    }
}

export function constructCircle(x: number = 0, y: number = 0, radius: number = 50) {
    const result = new Circle();
    result.x = x;
    result.y = y;
    result.width = radius;
    return result;
}