class pregunta {
    constructor(txtbt1,txtbt2,MinBoton,tiempoTran,btCorrecto) {
        this.txt = txtbt1;
        this.txt2=txtbt2
        this.MinBoton = MinBoton;
        this.tiempoTran= tiempoTran;
        this.correcto=btCorrecto;
    }
}

var video = document.querySelector("video");


var bt1 =  document.getElementById("bt1");
var bt2 =  document.getElementById("bt2");
var btEmpe = document.getElementById("BotonEmpezar");
var txtAfinidad = document.getElementById("txtAfinidad");
var contAfinidad = document.getElementById("contAfinidad");
var contAfinidadFinal = document.getElementById("contAfinidadFinal");
var btVolver= document.getElementById("buttonVoler");



var estrellas = document.getElementsByClassName("imgEstrella");
var estrellasF = document.getElementsByClassName("imgEstrellaF");

bt1.style.display = "none";
bt2.style.display = "none";
contAfinidad.style.display = "none";
contAfinidadFinal.style.display = "none";

const P1 = new pregunta('SI','NO',3,10,1);


var preguntas =[P1];
var VA= 0;
var esCorrecto=0;
var numeroDeEstrellas =sessionStorage.getItem('Estrella');;

bt1.addEventListener('click',cambiarVideo1,true);
bt2.addEventListener('click',cambiarVideo2,true);
btEmpe.addEventListener('click',reproducirVideo,true);
btVolver.addEventListener('click',volver,true);



video.ontimeupdate= function(){    
    
    bt1.innerText = preguntas[VA].txt;
   // bt1.innerHTML=''
    bt2.innerText = preguntas[VA].txt2;

    CT=video.currentTime;

    if(CT<30){
        VA=0;
    }

    if(CT>=preguntas[VA].MinBoton && (CT<=preguntas[VA].MinBoton+10)){
        bt1.style.display = "block";
        bt2.style.display = "block";

    }else{
        bt1.style.display = "none";
        bt2.style.display = "none";
    }
};

function reproducirVideo(){
    video.play();
    btEmpe.style.display="none";
}

function volver(){
    sessionStorage.setItem('Estrella',numeroDeEstrellas);
    window.location.replace("http://127.0.0.1:5500/");
}

function cambiarEsCorrecto() {
    console.log(preguntas[VA].tiempoRegre);
    video.currentTime = preguntas[VA].tiempoRegre;
   }

function cambiarVideo1 (){
    var correcto=false;
    if(preguntas[VA].correcto===1){
        correcto=true;
    }else{
        esCorrecto=false;   
    }
    modificarBotones(preguntas[VA].bt1,correcto);
}
function cambiarVideo2 (){
    var correcto=false;
    if(preguntas[VA].correcto===2){
     
       correcto=true;
       numeroEstrellas++;
    }else{
        esCorrecto=false;   
    }
    modificarBotones(preguntas[VA].bt2,correcto);
}

function modificarBotones(tiempoNuevo,cor){
   
    bt1.style.display = "none";
    bt2.style.display = "none";
    if(cor){
        numeroDeEstrellas++;
    }
 
    if(numeroDeEstrellas>2){
        contAfinidadFinal.style.display = "flex";
    }else{
        contAfinidad.style.display = "flex";
    }

    if(numeroDeEstrellas>3){
        numeroDeEstrellas=3;
    }
   
    video.pause();
    
    ponerEstrella();
}

function ponerEstrella(){
    for(let i =0;i<estrellas.length;i++){
        if((i)<numeroDeEstrellas){
            estrellas[i].src="img/star2.png";
            estrellasF[i].src="img/star2.png";
        }
    }
    
}

window.traerEstrellas = function(num){
    numeroDeEstrellas = num;
}
