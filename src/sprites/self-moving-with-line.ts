import { EnvironmentElement } from "../physics/environment-element";
import { SelfMovingCircle } from "./self-moving-circle";
import { Point } from "../physics/point";
import { Orientations } from "../physics/orientations";
import { Line } from "./vertical-line";

export class SelfMovingWithLine extends SelfMovingCircle{
    line: Line;
    constructor(axis: Point, orbitRadius: number, speed: number, public orientation: Orientations, clockwise: boolean) {
        super(axis, orbitRadius, speed, clockwise);
        this.setLine(orientation);
    }
    setLine(orientation: Orientations) {
        if (orientation === Orientations.vertical) {
            this.line = new Line(this.x, orientation)
        } else {
            this.line = new Line(this.y, orientation)
        }
    }
    render(context: CanvasRenderingContext2D) {
        super.render(context);
        this.setLine(this.orientation);
        this.line.render(context);
    }
}

export function constructSelfMovingCircleWithLine(axis: Point, orbitRadius: number , radius: number = 50, speed: number = 1, clockwise: boolean = true,  orientation: Orientations) {
    const result = new SelfMovingWithLine(axis, orbitRadius, speed, orientation, clockwise);
    result.x = axis.x + orbitRadius;
    result.y = axis.y;
    result.width = radius;
    return result;
}