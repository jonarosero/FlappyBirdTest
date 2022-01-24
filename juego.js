var contexto = document.getElementById("lienzoJuego").getContext("2d");

contexto.canvas.width = 300;
contexto.canvas.height = 530;
//Variables
var FPS = 60;
var gravedad = 1.5;
var score = 0;

var personaje = {
  x: 50,
  y: 150,
  w: 50,
  h: 50,
};

var tuberias = new Array();
tuberias[0] = {
  x: contexto.canvas.width,
  y: 0,
};

//Audios

var punto = new Audio()
punto.src = "sound/punto.mp3"

//Imagenes
var bird = new Image();
bird.src = "img/bird.png";

var background = new Image();
background.src = "img/background.png";

var tuberiaNorte = new Image();
tuberiaNorte.src = "img/tuberiaNorte.png";

var tuberiaSur = new Image();
tuberiaSur.src = "img/tuberiaSur.png";

var suelo = new Image();
suelo.src = "img/suelo.png";

//CONTROL
function keyDown() {
  personaje.y -= 25;
}

//BUCLE
setInterval(loop, 1000 / FPS);
function loop() {
  contexto.clearRect(0, 0, 300, 530);

  //Fondo
  contexto.drawImage(background, 0, 0);
  contexto.drawImage(suelo, 0, contexto.canvas.height - suelo.height);

  //personaje
  contexto.drawImage(bird, personaje.x, personaje.y);
  personaje.y += gravedad;

  //Tuberias
  for (var i = 0; i < tuberias.length; i++) {
    var constante = tuberiaNorte.height + 80;
    contexto.drawImage(tuberiaNorte, tuberias[i].x, tuberias[i].y);
    contexto.drawImage(tuberiaSur, tuberias[i].x, tuberias[i].y + constante);
    tuberias[i].x--
    if (tuberias[i].y + tuberiaNorte.height < 80){
        tuberias[i].y=0
    }
    if (tuberias[i].x==150) {
        tuberias.push({
            x:contexto.canvas.width,
            y: Math.floor(Math.random()*tuberiaNorte.height) - tuberiaNorte.height
        })
    }

    //Colisiones
    if (personaje.x+bird.width >= tuberias[i].x && personaje.x <= tuberias[i].x + tuberiaNorte.width && 
        (personaje.y <= tuberias[i].y + tuberiaNorte.height || personaje.y + bird.height >= tuberias[i].y + constante 
            || personaje.y + bird.height >= contexto.canvas.height - suelo.height)){
        location.reload();
    }

    if (tuberias[i].x == 50) {
        score+=10;
        punto.play();
    }
  }
  //CONDICIONES
  contexto.fillStyle = "rgba(0,0,0,1)";
  contexto.font = "25px Arial"
  contexto.fillText("Puntos: "+score,10,contexto.canvas.height-40)
}

//EVENTOS
window.addEventListener("click", keyDown);
window.addEventListener("keydown", keyDown);
