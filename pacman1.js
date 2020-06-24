/*
PacMan game to learn HTML5 and Javascript coding.
*/
var score = 0;
var gscore = 0;
var ghost = false;

var player = {
    x: 50,
    y: 100,
    speed: 5,
    pacmouth: 320,
    pacdir: 0,
    psize: 32
}

var enemy = {
    x: 250,
    y: 200,
    speed: 5,
    moving: 0,
    dirx: 0,
    diry: 0
}

var canvas = document.createElement("canvas");
// ctx stands for context
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 600;
canvas.height = 400;
mainImage = new Image();
mainImage.ready = false;
mainImage.onload = checkReady;
mainImage.src = "pacman.png"

var keyclick = {};
document.addEventListener("keydown", function (event) {
    keyclick[event.keyCode]=true;
//    console.log(keyclick);       // if you want to log the key clicked to the console
    move(keyclick);
},false);
document.addEventListener("keyup", function (event) {
    delete keyclick[event.keyCode];
},false);

function move(keyclick) {
// pacdir values of 0,32,64,96 are the locations in the PNG image file for the various character
// images facing different directions
    if (37 in keyclick) {  // Left
        player.x -= player.speed;
        player.pacdir=64;
    }   // Left
    if (38 in keyclick) {  // Up
        player.y -= player.speed;
        player.pacdir=96;
    }   // Up
    if (39 in keyclick) {  // Right
        player.x += player.speed;
        player.pacdir=0;
    }   // Right
    if (40 in keyclick) {  // Down
        player.y += player.speed;
        player.pacdir=32;
    }   // Down
//    player.x++;
    if (player.x >= (canvas.width-32)) { player.x = 0; }
    if (player.y >= (canvas.height-32)) { player.y = 0; }
    if (player.x < 0) { player.x = (canvas.width-32); }
    if (player.y < 0) { player.y = (canvas.height-32); }
/* next parts handle the mouth open and mouth closing changes, using the image location of 320 
   for the closed mouth, and 352 (320+32) for the open mouth       */
    if (player.pacmouth == 320) {player.pacmouth = 352;} else {player.pacmouth = 320;}
    render();
}

function checkReady() {
    this.ready = true;
    playgame();
}

function playgame() {
    render();
    requestAnimationFrame(playgame);
}

/* 
     function to help us generate random numbers, like for trying to pick a random
     ghost to appear for PacMan to go after, or the ghost direction and location, etc.
*/
function myNum(n) {
    return Math.floor(Math.random()*n);
}

function render() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!ghost) {
        enemy.ghostNum = myNum(5)*64;
        enemy.x = myNum(450);
        enemy.y = myNum(250)+30;
        ghost = true;
    }
    if (enemy.moving <0) {
        enemy.moving = (myNum(20)*3)+myNum(1);
        enemy.speed = myNum(3)+1;
        enemy.dirx = 0;
        enemy.diry = 0;
        if (enemy.moving % 2) {
            if (player.x < enemy.x) {enemy.dirx = -enemy.speed;} else {enemy.dirx = enemy.speed;}
        } else {
            if (player.y < enemy.y) {enemy.diry = -enemy.speed;} else {enemy.diry = enemy.speed;}
        }
    }

    enemy.moving--;
    enemy.x = enemy.x + enemy.dirx;
    enemy.y = enemy.y + enemy.diry;

    if (enemy.x >= (canvas.width-32)) { enemy.x = 0; }
    if (enemy.y >= (canvas.height-32)) { enemy.y = 0; }
    if (enemy.x < 0) { enemy.x = (canvas.width-32); }
    if (enemy.y < 0) { enemy.y = (canvas.height-32); }

    ctx.font = "20px Verdana";
    ctx.fillStyle = "white";
    ctx.fillText("Pacman: "+score+" vs Ghost: "+gscore,10,20)

    //  draw image  with hard coded values    
//  ctx.drawImage(mainImage,320,0,32,32,50,50,32,32);
    ctx.drawImage(mainImage, enemy.ghostNum, 0, 32, 32, enemy.x, enemy.y, 32, 32);
    ctx.drawImage(mainImage, player.pacmouth, player.pacdir, 32, 32, player.x, player.y, player.psize, player.psize);
}
