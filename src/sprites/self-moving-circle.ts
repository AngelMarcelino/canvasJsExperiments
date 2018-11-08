import { EnvironmentElement } from "../physics/environment-element";
import { Circle } from "./circle";
import { Point } from "../physics/point";
import { Environment } from "../physics/environment";

export class SelfMovingCircle extends Circle {

    count: number = 0;
    
    constructor(public axis: Point, public orbitRadius: number, public speed: number, private clockwise: boolean) {
        super();
        super.willFill = true;
    }
    
    render(context: CanvasRenderingContext2D) {
        if (this.clockwise) {
            this.x = (Math.cos(this.count) * this.orbitRadius) + this.axis.x;
        } else {
            this.x = (Math.cos(this.count) * this.orbitRadius * -1) + this.axis.x;
        }
        this.y = (Math.sin(this.count) * this.orbitRadius) + this.axis.y;
        super.render(context);
        this.count += this.speed * Environment.speedFrameFix;
        super.render(context);
    }
}

export function constructSelfMovingCircle(axis: Point, orbitRadius: number , radius: number = 50, speed: number = 1, clockwise: boolean = true) {
    const result = new SelfMovingCircle(axis, orbitRadius, speed, clockwise);
    result.x = axis.x + orbitRadius;
    result.y = axis.y;
    result.width = radius;
    return result;
}