class pregunta {
    constructor(urlVideo,txtbt1,txtbt2,MinBoton,tiempoTran,btCorrecto) {
        this.url=urlVideo;
        this.txt = txtbt1;
        this.txt2=txtbt2;
        this.MinBoton = MinBoton;
        this.tiempoTran= tiempoTran;
        this.correcto=btCorrecto;
    }
}

var video = document.querySelector("video");


var bt1 =  document.getElementById("bt1");
var bt2 =  document.getElementById("bt2");
var btEmpe = document.getElementById("BotonEmpezar");
var txtAfinidad = document.getElementById("txtAfiidad");
var contAfinidad = document.getElementById("contAfinidad");
var contAfinidadFinal = document.getElementById("contAfinidadFinal");
var btVolver= document.getElementById("buttonVoler");



var estrellas = document.getElementsByClassName("imgEstrella");
var estrellasF = document.getElementsByClassName("imgEstrellaF");

bt1.style.display = "none";
bt2.style.display = "none";
contAfinidad.style.display = "none";
contAfinidadFinal.style.display = "none";

const P1 = new pregunta("video/1.mp4",'SI','NO',3,10,1);
const P2 = new pregunta("video/FEP.mp4",'SI','NO',3,10,2);
const P3 = new pregunta("video/SxF.mp4",'SI','NO',3,10,1);


var preguntas =[P1,P2,P3];
var VA= 0;
var esCorrecto=0;
var numeroDeEstrellas =sessionStorage.getItem('Estrella');
var numVideos= sessionStorage.getItem("numVideos");
console.log(numVideos);

bt1.addEventListener('click',cambiarVideo1,true);
bt2.addEventListener('click',cambiarVideo2,true);
btEmpe.addEventListener('click',reproducirVideo,true);
btVolver.addEventListener('click',volver,true);

definirVideo();

video.ontimeupdate= function(){    
    
    bt1.innerText = preguntas[VA].txt;
   // bt1.innerHTML=''
    bt2.innerText = preguntas[VA].txt2;

    CT=video.currentTime;

    if(CT>=preguntas[VA].MinBoton && (CT<=preguntas[VA].MinBoton+10)){
        bt1.style.display = "block";
        bt2.style.display = "block";

    }else{
        bt1.style.display = "none";
        bt2.style.display = "none";
    }
};

function definirVideo(){
    var vi = sessionStorage.getItem("Video");
    
    if(vi==1){
        VA=0;
    }

    if(vi==2){
        VA=1;
     
    }

    if(vi==3){
        VA=2;
    }

    video.src=preguntas[VA].url;
}

function reproducirVideo(){
    video.play();
    btEmpe.style.display="none";
}

function volver(){
    var key = "video"+sessionStorage.getItem("Video");
    sessionStorage.setItem(key,1);
    sessionStorage.setItem('Estrella',numeroDeEstrellas);
    window.location.replace("http://127.0.0.1:5500/");
}


function cambiarVideo1 (){
    var correcto=false;
    if(preguntas[VA].correcto==1){
        correcto=true;
        numeroDeEstrellas++;
    }
    modificarBotones();
}
function cambiarVideo2 (){
    var correcto=false;
    if(preguntas[VA].correcto==2){
     
       correcto=true;
       numeroDeEstrellas++;
    }
    modificarBotones();
}

function modificarBotones(){
   
    bt1.style.display = "none";
    bt2.style.display = "none";
    numVideos++;
    sessionStorage.setItem("numVideos",numVideos);
    var afinidad = ((numeroDeEstrellas/3)*100).toFixed();
    var newTxt ="Tienes un un "+afinidad+"%"+" de compaginidad con Rodolfo Hernandez";
    console.log(newTxt);
    txtAfinidad.innerHTML = newTxt;
    if(numVideos>2){
        contAfinidadFinal.style.display = "flex";
    }else{
        contAfinidad.style.display = "flex";
    }

    if(numeroDeEstrellas>3){
        numeroDeEstrellas=3;
    }
    sessionStorage.setItem("numVideos",numVideos);
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


