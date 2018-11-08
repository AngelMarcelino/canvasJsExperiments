import { Point } from './point';
import { Renderable } from './renderable';

export class EnvironmentElement implements Renderable {
    
    width: number;
    height: number;
    x: number;
    y: number;
    dX: number;
    dY: number;
    isInFloor: boolean;
    affectedByGravity: boolean = true;

    topLeft() {
        return new Point(this.x, this.y);
    }

    topRight() {
        return new Point(this.x + this.width, this.y);
    }
    bottomLeft() {
        return new Point(this.x, this.y + this.height);
    }
    bottomRight() {
        return new Point(this.x + this.width, this.y + this.height);
    }

    render(context: CanvasRenderingContext2D): void {
        
    }
}