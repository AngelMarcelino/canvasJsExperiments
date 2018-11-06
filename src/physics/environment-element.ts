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

    render(context: CanvasRenderingContext2D): void {
        
    }
}