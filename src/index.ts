import { Environment } from './physics/environment';
import { Rectangle } from './sprites/rectangle';
import { Renderer } from './physics/renderer';
import { Circle, constructCircle } from './sprites/circle';
import { Point } from './physics/point';
import { constructSelfMovingCircle } from './sprites/self-moving-circle';
import { constructLine } from './sprites/vertical-line';
import { constructSelfMovingCircleWithLine } from './sprites/self-moving-with-line';
import { Orientations } from './physics/orientations';

const canvas = <HTMLCanvasElement> document.getElementById('main-canvas');
const environment = new Environment(new Renderer(canvas));
environment.willHaveGravity = false;


const rows = 4;
const cols = rows;

const cellWidth = canvas.clientWidth / cols;
const cellHeight = canvas.clientHeight / rows;
let i = 0;
let j = cellWidth / 2;
let speed = 1;
for (  i = cellWidth * 3 / 2; i <= canvas.clientHeight; i += cellHeight) {
    environment.addElement(constructCircle(i, j, cellWidth / 2));
    environment.addElement(constructSelfMovingCircleWithLine(new Point(i, j), cellWidth / 2, 5, speed, Orientations.vertical))
    speed ++;
}
speed = 1;
i = cellWidth / 2;
for ( j = cellWidth * 3 / 2; j <= canvas.clientWidth; j += cellWidth) {
    environment.addElement(constructCircle(i, j, cellWidth / 2));
    environment.addElement(constructSelfMovingCircleWithLine(new Point(i, j), cellWidth / 2, 5, speed, Orientations.horizontal))
    speed ++;
}

environment.isRunning = true;
