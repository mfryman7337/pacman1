var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.height = 400;
canvas.width = 600;
document.body.appendChild(canvas);
ctx.fillText("Hello World!!",10,150);