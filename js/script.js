let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
//let image = document.getElementById('source');



let characterHeight = 30;
let characterWidth = 20;
let characterX = (canvas.width - characterWidth) / 2;
let characterY = (canvas.height - characterWidth) / 2;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let ePressed = false;
let touch = false;

let delay = 100;


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

document.addEventListener("touchstart", function (e) {
    touch = true;
    setTimeout(() => {
        touch = false
    }, delay);
});

document.addEventListener('swiped', function (e) {
    if (e.detail.dir == "right") {
        rightPressed = true;
        setTimeout(() => {
            rightPressed = false
        }, delay);
    }
    else if (e.detail.dir == "left") {
        leftPressed = true;
        setTimeout(() => {
            leftPressed = false
        }, delay);
    }
    else if (e.detail.dir == "up") {
        upPressed = true;
        setTimeout(() => {
            upPressed = false
        }, delay);
    }
    else if (e.detail.dir == "down") {
        downPressed = true;
        setTimeout(() => {
            downPressed = false
        }, delay);
    }
});

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




function drawHotSpots(HS) {
    ctx.beginPath();
    ctx.rect(HS.posX, HS.posY, HS.width, HS.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

let draw = (ctx, frame) => {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    //drawCharacter();
    ctx.drawImage(frame.buffer, characterX, characterY, characterWidth, characterHeight); 
    //onDrawFrame();
}
let draw2 = () => {
    

    if (rightPressed && characterX < canvas.width - characterWidth) {
        characterX += 8;
    }
    else if (leftPressed && characterX > 0) {
        characterX -= 8;
    }
    else if (upPressed && characterY > 0) {
        characterY -= 8;
    }
    else if (downPressed && characterY < canvas.height - characterWidth) {
        characterY += 8;
    }

    if ((ePressed || touch) && characterY < H1.posY && characterY > H1.posY - characterHeight && characterX < H1.posX && characterX > H1.posX - characterWidth) {
        window.open("http://127.0.0.1:5500/video.html", "Valle del Cauca");
        ePressed = false;
    }

}

gifler('../img/idle.gif').frames(canvas, draw);
setInterval(draw2, 400);