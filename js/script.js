var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var image = document.getElementById('source');


var characterHeight = 70;
var characterWidth = 75;
var characterX = (canvas.width - characterWidth) / 2;
var characterY = (canvas.width - characterWidth) / 2;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var ePressed = false;


if(sessionStorage.getItem('Estrella')===null){
    sessionStorage.setItem('Estrella',0);
}


class hotSpot {
    constructor(posX, posY, width, height, departamento) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.departamento = departamento;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
    else if (e.keyCode == 38) {
        upPressed = true;
    }
    else if (e.keyCode == 40) {
        downPressed = true;
    }
    else if (e.keyCode == 69) {
        ePressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
    else if (e.keyCode == 38) {
        upPressed = false;
    }
    else if (e.keyCode == 40) {
        downPressed = false;
    }
    else if (e.keyCode == 69) {
        ePressed = false;
    }
}

function drawCharacter() {
    ctx.drawImage(image, characterX, characterY, characterWidth, characterHeight);
}
function drawHotSpots(HS) {
    ctx.beginPath();
    ctx.rect(HS.posX, HS.posY, HS.width, HS.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const H1 = new hotSpot((canvas.width / 4), (canvas.height / 2), 20, 20, "Valle");
    drawHotSpots(H1);

    drawCharacter();

    if (rightPressed && characterX < canvas.width - characterWidth) {
        characterX += 4;
    }
    else if (leftPressed && characterX > 0) {
        characterX -= 4;
    }
    else if (upPressed && characterY > 0) {
        characterY -= 4;
    }
    else if (downPressed && characterY < canvas.height - characterWidth) {
        characterY += 4;
    }

    if (ePressed && characterY < H1.posY && characterY > H1.posY - characterHeight && characterX < H1.posX && characterX > H1.posX - characterWidth) {
        //var w=  window.open("video.html", "Valle del Cauca")
      window.location.replace("http://127.0.0.1:5500//video.html");
      //w.traerEstrellas(numeroEstrellas);
        ePressed = false;
    }


}

setInterval(draw, 10);