import { Environment } from './physics/environment';
import { Rectangle, contructRectangle } from './sprites/rectangle';
import { Renderer } from './physics/renderer';
import { Circle, constructCircle } from './sprites/circle';
import { Point } from './physics/point';
import { constructSelfMovingCircleWithLine, SelfMovingWithLine } from './sprites/self-moving-with-line';
import { Orientations } from './physics/orientations';
import { Path } from './sprites/path';

let rows = 4;
const canvas = <HTMLCanvasElement> document.getElementById('main-canvas');
const moreButton = document.getElementById('more');
const minusButton = document.getElementById('minus');
const stopButton = document.getElementById('stop-button');



function init(circlesByRow: number) {
    const environment = getPreparedEnvironment(); 
    const rows =  circlesByRow;
    const cols = rows; 
    const cellWidth = canvas.clientWidth / cols;
    const cellHeight = canvas.clientHeight / rows;
    const currentPaths = generatePaths((rows - 1) ** 2);
    currentPaths.forEach(e => environment.addElement(e));
    fillCircles(environment, cellWidth, cellHeight);
    environment.addMiddleware((environment: Environment) => {
        pathMiddleware(environment, currentPaths);
    });
    environment.isRunning = true;
    return environment;
}

function getPreparedEnvironment(): Environment {
    const environment = new Environment(new Renderer(canvas));
    environment.willHaveGravity = false;
    return environment;
}

function generatePaths(numerOfPaths) {
    return Array.from(new Array(numerOfPaths)).map((e, i) => new Path(constructCircle(10, 10, 3), 500));
}

function pathMiddleware(environment: Environment, currentPaths: Path[]) {
    const vertical = (environment.elements.filter(e => e instanceof SelfMovingWithLine) as SelfMovingWithLine[]).filter(e => e.orientation === Orientations.vertical);
        const horizontal = (environment.elements.filter(e => e instanceof SelfMovingWithLine) as SelfMovingWithLine[]).filter(e => e.orientation === Orientations.horizontal);
        let index = 0;
        vertical.forEach((first, i) => {
            horizontal.forEach((second, j) => {
                const cir = currentPaths[index];
                if(cir) {
                    cir.addToPath(first.x, second.y);
                }
                index++;
            })
        });
}

function fillCircles(environment: Environment, cellWidth: number, cellHeight: number) {
    let i = 0;
    let j = cellHeight / 2; 
    let speed = 1;
    for (i = cellWidth * 3 / 2; i <= canvas.clientWidth; i += cellWidth) {
        environment.addElement(constructCircle(i, j, cellWidth / 2));
        environment.addElement(constructSelfMovingCircleWithLine(new Point(i, j), cellWidth / 2, 5, speed, true, Orientations.vertical))
        speed *= 2;
    } 

    speed = 1;
    i = cellWidth / 2;
    for ( let j = cellHeight * 3 / 2; j <= canvas.clientHeight; j += cellHeight) {
        environment.addElement(constructCircle(i, j, cellWidth / 2));
        environment.addElement(constructSelfMovingCircleWithLine(new Point(i, j), cellHeight / 2, 5, speed, false, Orientations.horizontal))
        speed *= 2;

    }
}
let previousEnvironment: Environment;
moreButton.addEventListener('click', () => {
    if(previousEnvironment) previousEnvironment.isRunning = false;
    previousEnvironment = init(++rows);
})
minusButton.addEventListener('click', () => {
    if(previousEnvironment) previousEnvironment.isRunning = false;
    previousEnvironment = init(--rows);
})
stopButton.addEventListener('click', (event: MouseEvent) => {
    if(previousEnvironment) {
        if(previousEnvironment.isRunning) {
            console.log(event);
            (<HTMLButtonElement>event.target).innerText = 'Pause';
        } else {
            (<HTMLButtonElement>event.target).innerText = 'Continue';
        }
        previousEnvironment.isRunning = !previousEnvironment.isRunning;
    }
});
