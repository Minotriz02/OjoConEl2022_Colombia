var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var image = document.getElementById('source');
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var characterHeight = 70;
var characterWidth = 75;
var characterX = (canvas.width-characterWidth)/2;
var characterY = (canvas.width-characterWidth)/2;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawCharacter() {
    ctx.drawImage(image, characterX, characterY, characterWidth, characterHeight);
}
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawCharacter();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > characterX && x < characterX + characterWidth) {
           if(y= y-characterHeight){
            dy = -dy  ;
			 }
        }
        else {
            //alert("GAME OVER");
            //document.location.reload();
        }
    }
    
    if(rightPressed && characterX < canvas.width-characterWidth) {
        characterX += 4;
    }
    else if(leftPressed && characterX > 0) {
        characterX -= 4;
    }
    else if(upPressed && characterY > 0) {
        characterY -= 4;
    }
    else if(downPressed && characterY < canvas.height-characterWidth) {
        characterY += 4;
    }
    
    x += dx;
    y += dy;
}

setInterval(draw, 10);