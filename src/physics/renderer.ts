import { Renderable } from './renderable';

export class Renderer {
    public x: number = 0;
    public y: number = 0;
    public width: number;
    public height: number;
    private context: CanvasRenderingContext2D;
    constructor(canvasElement: HTMLCanvasElement) {
        this.width = canvasElement.clientWidth;
        this.height = canvasElement.clientHeight;
        this.context = canvasElement.getContext('2d');
    }
    private _toRender: Renderable[] = [];
    addRenderizable(value: Renderable) {
        this._toRender.push(value);
    }
    render() {
        this.context.clearRect(0, 0, this.width, this.height);
        this._toRender.forEach(renderable => {
            renderable.render(this.context);
        });
    }
}