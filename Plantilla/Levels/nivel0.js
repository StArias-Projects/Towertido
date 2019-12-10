//Importaciones de objetos
import Infanteria from '../Sources/infanteria.js';
import Torre from '../Sources/torre.js';
import Dinero from '../Sources/dinero.js';
import Oleada from '../Sources/oleadas.js';

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
    this.load.image("HUD", "./Assets/Images/HUD.png");
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
    this.torre = new Torre(this, 960, 1024, "torre", this.pisos).setInteractive(); //La torre tiene que crear los huecos y poner la torreta principal encima suya en función del número de pisos
    this.numHuecos = this.torre.huecos.length;

    //Enemigos
    // this.inf = new Infanteria(this, 1300, 1080, "infant", 1000, 5, this.torre.x).setInteractive();
    // this.inf2 = new Infanteria(this, 700, 1080, "infant", 1000, 5, this.torre.x).setInteractive();
    this.enemigos = this.add.group(); //Array de enemigos
    this.muertesOleada = 0;
    this.numEnem = new Array(4); //Array para saber el número de enemigos de cada oleada
    this.numEnem[0] = 10;
    this.numEnem[1] = 12;
    this.numEnem[2] = 14;
    this.numEnem[3] = 15;
    this.wave = 0; //Sirve para iterar entre el array numEnem
    this.it = 0; //Sirve para iterar entre el grupo de enemigos

    //Balas
    this.balasAliadas = this.add.group(); //Array de balas aliadas
    this.balasEnemigas = this.add.group(); //Array de balas enemigas

    //HUD
    this.hud = this.add.image(1920,1080, "HUD").setOrigin(0).setPosition(0,0);
    
    //Oleada
    this.oleadas = new Oleada(this, 1842, 68, 4);

    //Dinero
    this.dinero = new Dinero(this, 1677, 68);

    //Colisiones
    this.physics.add.overlap(this.enemigos, this.balasAliadas, function(enemigo, balasAliada){
      console.log("bala aliada + enemigo");
      this.balasAliadas.destroy();
    });

    this.physics.add.overlap(this.torre, this.balasEnemigas, function(torre, balasEnemigas){
      console.log("bala enemiga + torre");
      this.balasEnemigas.destroy();
      if(this.torre.Muerto()) console.log("GAME OVER!"); //Aqui va el cambio a la escena de GAME OVER
    });

    this.physics.add.collider(this.torre, this.balasEnemigas);

    //Activa el imput de ratón
    let pointer = this.input.activePointer;

    //Eventos Ratón
    //Auxiliares para debug
    this.torre.on('pointerdown', function (pointer) {
      this.torre.PierdeVida(200);
    }, this); 

    // this.inf.on('pointerdown', function (pointer) {
    //   this.inf.PierdeVida(200);
    // }, this);  

    // this.inf2.on('pointerdown', function (pointer) {
    //   this.inf2.PierdeVida(200);
    // }, this);  

    //Rotación de la torreta principal en función del ratón
    this.input.on('pointermove', function (pointer) {
      this.torre.torreta_principal.Rotar(pointer.x, pointer.y);
    }, this);

    //Disparos de la torreta principal
    this.input.on('pointerdown', function (pointer) {
      if(this.torPrinDisparaTime > this.torPrinDelay){
        this.torre.torreta_principal.Disparar(pointer.x, pointer.y);
        console.log("Balas aliadas" + this.balasAliadas)
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
      if(this.tiempoUltEnem >= this.tiempoEnem && this.wave < this.numEnem.length && this.it < this.numEnem[this.wave]){
        let rand = Phaser.Math.Between(0, 6);
        if(rand <= 2) this.enemigos.add(new Infanteria(this, 0, 1080, "infant")); //Lado izquierdo
        else if(rand >2) this.enemigos.add(new Infanteria(this, 1920, 1080, "infant")); //Lado derecho
        
        console.log(this.enemigos.children.size);
        this.tiempoUltEnem = 0;
        this.tiempoEnem = Phaser.Math.Between(1000,3000);
        this.it++;
      }else this.tiempoUltEnem += delta;
    }
    else this.empiezaRonda += delta;
    
    if(this.wave < this.numEnem.length && this.muertesOleada >= this.numEnem[this.wave]){
      this.muertesOleada = 0;
      this.it = 0;
      this.wave++; 
      this.oleadas.CambiaOleada();
    }
    this.torPrinDisparaTime += delta; //Controla la cadencia de la torreta principal
  }
}