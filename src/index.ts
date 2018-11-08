import { Environment } from './physics/environment';
import { Rectangle, contructRectangle } from './sprites/rectangle';
import { Renderer } from './physics/renderer';
import { Circle, constructCircle } from './sprites/circle';
import { Point } from './physics/point';
import { constructSelfMovingCircle } from './sprites/self-moving-circle';
import { constructLine } from './sprites/vertical-line';
import { constructSelfMovingCircleWithLine, SelfMovingWithLine } from './sprites/self-moving-with-line';
import { Orientations } from './physics/orientations';

const canvas = <HTMLCanvasElement> document.getElementById('main-canvas');
const context = canvas.getContext('2d');
const environment = new Environment(new Renderer(canvas));
environment.willHaveGravity = false;


const rows = 4;
const cols = rows;
const circles: Circle[] = [];
const cellWidth = canvas.clientWidth / cols;
const cellHeight = canvas.clientHeight / rows;
let i = 0;
let j = cellWidth / 2;
let speed = 1;
for (  i = cellWidth * 3 / 2; i <= canvas.clientHeight; i += cellHeight) {
    environment.addElement(constructCircle(i, j, cellWidth / 2));
    environment.addElement(constructSelfMovingCircleWithLine(new Point(i, j), cellWidth / 2, 5, speed, true, Orientations.vertical))
    speed *= 2;
    const circle = constructCircle(10, 10, 100);
    circles.push(circle);
    environment.addElement(circle);
} 
speed = 1;
i = cellWidth / 2;
for ( j = cellWidth * 3 / 2; j <= canvas.clientWidth; j += cellWidth) {
    environment.addElement(constructCircle(i, j, cellWidth / 2));
    environment.addElement(constructSelfMovingCircleWithLine(new Point(i, j), cellWidth / 2, 5, speed, false, Orientations.horizontal))
    speed *= 2;
    const circle = constructCircle(10, 10, 100);
    circles.push(circle);
    environment.addElement(circle);
}
environment.addMiddleware((environment: Environment) => {
    const vertical = (environment.elements.filter(e => e instanceof SelfMovingWithLine) as SelfMovingWithLine[]).filter(e => e.orientation === Orientations.vertical);
    const horizontal = (environment.elements.filter(e => e instanceof SelfMovingWithLine) as SelfMovingWithLine[]).filter(e => e.orientation === Orientations.horizontal);
    let index = 0;
    vertical.forEach((first, i) => {
        horizontal.forEach((second, j) => {
            const cir = circles[index];
            if(cir) {
                cir.x = first.x;
                cir.y = second.y;
            }
            index++;
        })
    });
 });

environment.isRunning = true;
