import { Rectangle } from "./rectangle";
import { Orientations } from "../physics/orientations";

export class Line extends Rectangle {

    constructor(position: number, orientation: Orientations) {
        super();
        if (orientation === Orientations.vertical) {
            this.x = position;
            this.y = 0;
            this.width = 1;
            this.height = 1000; 
        } else {
            this.y = position;
            this.x = 0;
            this.height = 1;
            this.width = 1000;
        }
    }

}

export function constructLine(position: number, orientation: Orientations) {
    return new Line(position, orientation);
}