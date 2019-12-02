//Importaciones de objetos
import Infanteria from '../Sources/infanteria.js';
import Torre from '../Sources/torre.js';
import Dinero from '../Sources/dinero.js';

//Clase principal
export default class Nivel0 extends Phaser.Scene {
  constructor() {
    super({ key: 'Nivel0' });
  }

  preload() {  
    //Objetos
    this.load.image("fondo", "./Assets/Images/fondo.png");
    this.load.image("tor_prin", "./Assets/Images/torreta_principal.png");
    this.load.image("bala_normal", "./Assets/Images/bala_normal.png");
    this.load.spritesheet("infant", "./Assets/Images/infanteria.png", {frameWidth: 70, frameHeight: 77});
    this.load.image("torre", "./Assets/Images/torre.png");
    this.load.image("hueco", "./Assets/Images/hueco.png");
    this.load.image("torreta_normal", "./Assets/Images/torreta_normal.png");
    this.load.image("vida", "./Assets/Images/barra_vida.png");
  }

  create() {
    console.log("Nivel 0");
    this.fondo = this.add.image(960, 525, "fondo");

    //Tiempos de espera
    this.tiempoEnem = 0;
    this.torPrinDelay = 500;
    this.torPrinDisparaTime = 0;

    //Variables númericas
    this.pisos = 4; //2, 3 o 4
    this.tiempoUltEnem = 0;
    this.costeTNormal = 100;
    this.infanteriaDinero = 200;
    this.tiempoEntreRonda = 5000;
    this.empiezaRonda = 0;

    //Creación de objetos
      //Torre
    this.torre = new Torre(this, 960, 1024, "torre", this.pisos); //La torre tiene que crear los huecos y poner la torreta principal encima suya en función del número de pisos
    this.numHuecos = this.torre.huecos.length;

      //Enemigos
    this.infanteria = new Infanteria(this, 1500, 1080, "infant");
    this.enemigos = this.add.group(); //Array de enemigos
    
      //Dinero
    this.dinero = new Dinero(this, 1340, 0);

    //Activa el imput de ratón
    let pointer = this.input.activePointer;

    //Eventos
      //Ratón
        //Prueba de Infantería
    this.infanteria.on('pointerdown', function(pointer){
      this.infanteria.PierdeVida(200);
    }, this);

        //Rotación de la torreta principal en función del ratón
    this.input.on('pointermove', function (pointer) {
      this.torre.torreta_principal.Rotar(pointer.x, pointer.y);
    }, this);

        //Cadencia de la torreta principal
    this.input.on('pointerdown', function (pointer) {
      if(this.torPrinDisparaTime > this.torPrinDelay){
        this.torre.torreta_principal.Disparar(pointer.x, pointer.y);
        this.torPrinDisparaTime = 0;
      }
    }, this);    

       //Construcción de torretas
    for(let i = 0; i < this.numHuecos; i++){
      this.torre.huecos[i].on('pointerdown', function (pointer) {
        console.log("pulsado el hueco " + i)
        if(this.dinero.cantidad >= this.costeTNormal){
          this.torre.huecos[i].ConstruirTorretaNormal();
          this.dinero.ActualizaDinero(-this.costeTNormal);
        } 
      }, this);
    }       
  }
    
  update(time, delta) {  

    if(this.empiezaRonda >= this.tiempoEntreRonda){
    // Spawner
      if(this.tiempoUltEnem >= this.tiempoEnem){
        this.enemigos.add(new Infanteria(this, 0, 1080, "infant", 1000, 5, this.torre.x));
        this.tiempoUltEnem = 0;
        this.tiempoEnem = Phaser.Math.Between(1000,3000);
      }else this.tiempoUltEnem += delta;
    }
    else this.empiezaRonda += delta;
    
    this.torPrinDisparaTime += delta; //Controla la cadencia de la torreta principal
  }
}