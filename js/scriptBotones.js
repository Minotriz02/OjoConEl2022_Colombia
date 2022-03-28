class pregunta {
    constructor(txtbt1,txtbt2,MinBoton,tiempoTran,tiempoRegreso,tiempoB1,tiempoB2,btCorrecto) {
        this.txt = txtbt1;
        this.txt2=txtbt2
        this.MinBoton = MinBoton;
        this.tiempoTran= tiempoTran;
        this.tiempoRegre=tiempoRegreso;
        this.bt1 = tiempoB1;
        this.bt2 = tiempoB2;
        this.correcto=btCorrecto;
    }
}

var video = document.querySelector("video");


var bt1 =  document.getElementById("bt1");
var bt2 =  document.getElementById("bt2");
var txtAfinidad = document.getElementById("txtAfinidad");


bt1.style.display = "none";
bt2.style.display = "none";

const P1 = new pregunta('Frailejón Ernesto Perez','Frailejón Ernesto Pancho',30,10,40.5,60,0,1);


var preguntas =[P1];
var VA= 0;
var esCorrecto=true;

bt1.addEventListener('click',cambiarVideo1,true);
bt2.addEventListener('click',cambiarVideo2,true);



video.ontimeupdate= function(){    
    bt1.innerText = preguntas[VA].txt;
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

function cambiarEsCorrecto() {
    console.log(preguntas[VA].tiempoRegre);
    video.currentTime = preguntas[VA].tiempoRegre;
   }

function cambiarVideo1 (){
    var correcto=false;
    if(preguntas[VA].correcto===1){
        correcto=true;
        txtAfinidad.innerHTML = "Tu nivel de frailejon es: ¡Mas de 9000!"
    }else{
        esCorrecto=false;   
        setTimeout(cambiarEsCorrecto,preguntas[VA].tiempoTran*1000);
    }
    modificarBotones(preguntas[VA].bt1,correcto);
}
function cambiarVideo2 (){
    var correcto=false;
    if(preguntas[VA].correcto===2){
       mostrarMedalla(VA);
       correcto=true;
       
    }else{
        esCorrecto=false;   
      
        setTimeout(cambiarEsCorrecto,preguntas[VA].tiempoTran*1000);
    }
    modificarBotones(preguntas[VA].bt2,correcto);
}

function modificarBotones(tiempoNuevo,cor){
    CT=0;
    bt1.style.display = "none";
    bt2.style.display = "none";
    video.pause();
    video.currentTime = tiempoNuevo;
    video.play();

 
}
