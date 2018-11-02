const canvas = document.getElementById('main-canvas');
const context = canvas.getContext('2d');
context.moveTo(0, 0);
context.lineTo(200, 100);
context.stroke();

context.beginPath();
context.arc(600/2, 600/2, 100, 0, 2 * Math.PI);
context.stroke();