import { Renderable } from './renderable';
import { Renderer } from './renderer';
import { EnvironmentElement } from './environment-element';

export class Environment {
    private _isRunning = false;
    private speedFrameFix = 1 / 60;
    private gravity = 9.81;
    private elements: EnvironmentElement[] = [];
    constructor(private renderer: Renderer) {
        
    }
    set isRunning(value: boolean) {
        this._isRunning = value;
        if (value) {
            this.mainLoop();
        }
    }
    get isRunning(): boolean {
        return this._isRunning;
    }

    addElement(renderable: EnvironmentElement) {
        this.setNullSpeed(renderable);
        this.renderer.addRenderizable(renderable);
        this.elements.push(renderable);
    }

    setNullSpeed(renderable: EnvironmentElement) {
        renderable.dX = 0;
        renderable.dY = 0;
    }

    checkEvents() {

    }

    mainLoop() {
        this.checkEvents();
        this.calculateNextState();
        this.renderer.render();
        if (this.isRunning) {
            requestAnimationFrame(this.mainLoop.bind(this));
        }
    }

    calculateNextState() {
        this.checkCollitions();
        this.update();
    }

    checkCollitions() {
        this.elements.forEach(element => {
            if (element.y + element.height + element.dY >= this.renderer.height) {
                element.y = this.renderer.height - element.height;
                element.dY = 0;
            }
            if (element.x + element.width >= this.renderer.width) {
                element.dX = 0;
            }
        });
    }

    update() {
        this.elements.forEach(element => {
            element.x += element.dX;
            element.y += element.dY;
            element.dY += this.gravity * this.speedFrameFix;
            element.isInFloor = element.y + element.height === this.renderer.height;
        });
    }
}