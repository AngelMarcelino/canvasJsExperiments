import { Renderable } from './renderable';
import { Renderer } from './renderer';
import { EnvironmentElement } from './environment-element';

export class Environment {
    private _isRunning = false;
    static speedFrameFix = 1 / 60;
    private speedFrameFix = Environment.speedFrameFix;
    private gravity = 9.81 * 4;
    private elements: EnvironmentElement[] = [];
    private floor: EnvironmentElement;
    public willHaveGravity = true;
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
    addFloor(floor: EnvironmentElement) {
        this.addElement(floor);
        this.floor = floor;
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
            this.checkCollitionsWithOtherElements(element);
        });
    }

    checkCollitionWithFrame(first: EnvironmentElement, second: EnvironmentElement) {
        if (
            first.topRight().x > second.topLeft().x &&
            first.bottomLeft().y > second.topLeft().y &&
            second.topRight().x > first.topLeft().x &&
            second.bottomLeft().y > first.topLeft().y 
        ) {
            if (first.bottomLeft().y > second.topLeft().y) {
                if (first.dY > 0) {
                    first.dY = 0
                }
            }
        }
    }

    checkCollitionsWithOtherElements(currentElement: EnvironmentElement) {
        const elementsButCurrentElement = this.elements.filter(e => e != currentElement);
        elementsButCurrentElement.forEach(element => {
            this.checkCollitionWithFrame(currentElement, element);
        });
    }

    update() {
        this.elements.forEach(element => {
            element.x += element.dX;
            element.y += element.dY;
            if (this.willHaveGravity) {
                if (element.affectedByGravity) {
                    element.dY += this.gravity * this.speedFrameFix;
                    element.isInFloor = element.y + element.height > this.floor.y;
                }
            }
        });
    }
}