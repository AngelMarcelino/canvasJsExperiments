import { EnvironmentElement } from "../physics/environment-element";
import { Circle } from "./circle";
import { Point } from "../physics/point";
import { Environment } from "../physics/environment";

export class SelfMovingCircle extends Circle {

    count: number = 0;
    
    constructor(public axis: Point, public orbitRadius: number, public speed: number) {
        super();
        super.willFill = true;
    }
    
    render(context: CanvasRenderingContext2D) {
        this.x = (Math.cos(this.count) * this.orbitRadius) + this.axis.x;
        this.y = (Math.sin(this.count) * this.orbitRadius) + this.axis.y;
        super.render(context);
        this.count += this.speed * Environment.speedFrameFix;
        super.render(context);
    }
}

export function constructSelfMovingCircle(axis: Point, orbitRadius: number , radius: number = 50, speed: number = 1) {
    const result = new SelfMovingCircle(axis, orbitRadius, speed);
    result.x = axis.x + orbitRadius;
    result.y = axis.y;
    result.width = radius;
    return result;
}