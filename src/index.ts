import { Environment } from './physics/environment';
import { Rectangle } from './sprites/rectangle';
import { Renderer } from './physics/renderer';

const canvas = <HTMLCanvasElement> document.getElementById('main-canvas');
const environment = new Environment(new Renderer(canvas));

const main = contructRectangle(2, -300);
const floor = contructRectangle(0, canvas.clientHeight-1, canvas.clientWidth, 10, false);

environment.addElement(main);
environment.addElement(contructRectangle(200, 100));
environment.addElement(contructRectangle(2300, 200));
environment.addFloor(floor);

 
 
environment.isRunning = true;

const stopButton = document.getElementById('stop-button');
stopButton.addEventListener('click', () => {
    //environment.isRunning = false;
    main.excecute(null);
})

function contructRectangle(x: number, y: number, width: number = 50, height: number = 50, affectedByGravity: boolean = true): Rectangle {
    const result = new Rectangle();
    result.x = x;
    result.y = y;
    result.width = width;
    result.height = height;
    result.affectedByGravity = affectedByGravity
    return result;
}
