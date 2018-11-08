import { EnvironmentElement } from '../physics/environment-element';
import { Circle, constructCircle } from './circle';

export class Path extends EnvironmentElement {
    queue: Circle[] = [];
    maxLenght: number;

    addToPath(x: number, y: number) {
        const newCir = constructCircle(x, y, this.queue[0].width);
        newCir.willFill = true;
        this.queue.unshift(newCir);
        if(this.queue.length > this.maxLenght) {
            this.queue.pop();
        }
    }
    
    constructor(head: Circle, maxLenght: number) {
        super();
        head.willFill = true;
        this.queue.push(head);
        this.maxLenght = maxLenght;
    }
    render(context: CanvasRenderingContext2D) {
        this.queue.forEach(e => {
            e.render(context);
        })
    }
}