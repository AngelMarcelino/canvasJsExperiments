import { Environment } from './physics/environment';
import { Pendulo } from './sprites/pendulo';
import { Renderer } from './physics/renderer';

const canvas = <HTMLCanvasElement> document.getElementById('main-canvas');
const environment = new Environment(new Renderer(canvas));
const pendulo = constructPendulo(2, 2);

environment.addElement(pendulo);
 

environment.isRunning = true;

const stopButton = document.getElementById('stop-button');
stopButton.addEventListener('click', () => {
    //environment.isRunning = false;
    pendulo.excecute(null);
})

function constructPendulo(x: number, y: number): Pendulo {
    const result = new Pendulo();
    result.x = x;
    result.y = y;
    result.width = 50;
    result.height = 20;
    return result;
}