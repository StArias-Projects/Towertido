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
    this.load.image("infant", "./Assets/Images/infanteria.png");
    this.load.image("torre", "./Assets/Images/torre.png");
    this.load.image("hueco", "./Assets/Images/hueco.png");
    this.load.image("torreta_normal", "./Assets/Images/torreta_normal.png");
    this.load.image("vida", "./Assets/Images/barra_vida.png");
    this.load.image("HUD", "./Assets/Images/HUD.png");
    this.load.image("boton_menu","./Assets/Images/botonMenu.png");
    this.load.image("boton_rein","./Assets/Images/botonReiniciar.png");
    this.load.image("win","./Assets/Images/win.png");
    this.load.image("gameover","./Assets/Images/gameover.png");
    //Sonidos
  }

  create() {
    this.fondo = this.add.image(960, 525, "fondo");

    //Tiempos de espera
    this.tiempoEnem = 0;
    this.torPrinDelay = 500;
    this.torPrinDisparaTime = 0;

    //Variables generales
    this.pisos = 3; //2, 3 o 4
    this.tiempoUltEnem = 0;
    this.costeTNormal = 100;
    this.infanteriaDinero = 200;
    this.tiempoEntreRonda = 5000;
    this.empiezaRonda = 0;

    //Creación de objetos
      //Torre
      this.torre = new Torre(this, 960, 1024, "torre", this.pisos); //La torre tiene que crear los huecos y poner la torreta principal encima suya en función del número de pisos
      this.numHuecos = this.torre.huecos.length;
      //Torretas
      this.torretas = this.add.group(); //Aray de torretas aliadas
      
      //Enemigos
      this.enemigos = this.add.group(); //Array de enemigos
      this.muertesOleada = 0;
      this.numEnem = new Array(4); //Array para saber el número de enemigos de cada oleada
      this.numEnem[0] = 20;      //8
      this.numEnem[1] = 25;     //12 
      this.numEnem[2] = 30;     //18
      this.numEnem[3] = 35;     //28
      this.wave = 0; //Sirve para iterar entre el array numEnem
      this.it = 0; //Sirve para iterar entre el grupo de enemigos
      this.rangoIniEnem = 500; //Rango de apracición de enemigos(x, y);
      this.rangoFinEnem = 1500;

      //HUD
      this.hud = this.add.image(1920,1080, "HUD").setOrigin(0).setPosition(0,0);
      
      //Oleada
      this.oleadas = new Oleada(this, 1842, 68, 4);

      //Dinero
      this.dinero = new Dinero(this, 1677, 68);

      //Balas
      this.balas = this.add.group();

    //Activa el imput de ratón
    let pointer = this.input.activePointer;

    //Eventos Ratón
    //Rotación de la torreta principal en función del ratón
    this.input.on('pointermove', function (pointer) {
      this.torre.torreta_principal.Rotar(pointer.x, pointer.y);
    }, this);

    //Disparos de la torreta principal
    this.input.on('pointerdown', function (pointer) {
      if(this.torPrinDisparaTime > this.torPrinDelay){
        this.torre.torreta_principal.Disparar(pointer.x, pointer.y);
        this.torPrinDisparaTime = 0;
      }
    }, this);

    //Construcción de torretas
    for(let i = 0; i < this.numHuecos; i++){
      this.torre.huecos[i].on('pointerdown', function (pointer) {
        if(this.dinero.cantidad >= this.costeTNormal){
          this.torre.huecos[i].ConstruirTorretaNormal();
          this.dinero.ActualizaDinero(-this.costeTNormal);
        } 
      }, this);
    }  

    //Win y Game Over
    this.win = this.add.image(960,350, "win");
    this.win.setScale(2.2);
    this.win.visible = false;
    this.gameover = this.add.image(960,400, "gameover");
    this.gameover.visible = false;

    //Boton para volver al Menu
    this.boton_menu = this.add.image(650,800, "boton_menu").setInteractive();
    this.boton_menu.visible = false;
    this.boton_menu.on('pointerdown', pointer => {
      this.scene.start('Menu');
    }); 

    //Boton para volver a jugar
    this.boton_rein = this.add.image(1270,800, "boton_rein").setInteractive();
    this.boton_rein.visible = false;
    this.boton_rein.on('pointerdown', pointer => {
      this.scene.start('Nivel0');
    }); 
  }
    
  update(time, delta) {  
    if(this.empiezaRonda >= this.tiempoEntreRonda){
    // Spawner
      if(this.tiempoUltEnem >= this.tiempoEnem && this.wave < this.numEnem.length && this.it < this.numEnem[this.wave]){
        let rand = Phaser.Math.Between(0, 1);
        if(rand == 0) this.enemigos.add(new Infanteria(this, 0, 1066, "infant")); //Lado izquierdo
        else if(rand == 1) this.enemigos.add(new Infanteria(this, 1920, 1066, "infant")); //Lado derecho
        
        this.tiempoUltEnem = 0;
        this.tiempoEnem = Phaser.Math.Between(this.rangoIniEnem,this.rangoFinEnem);
        this.it++;
      }else this.tiempoUltEnem += delta;
    }
    else {
      this.empiezaRonda += delta;
      // console.log("Tiempo para ronda: " + (this.tiempoEntreRonda - this.empiezaRonda)/1000);
    }
    
    if(this.wave < this.numEnem.length && this.muertesOleada >= this.numEnem[this.wave]){
      this.wave++; 
      if(this.wave == this.numEnem.length) this.Finish(true);
      else{
        this.muertesOleada = 0;
        this.it = 0;
        this.oleadas.CambiaOleada();
        this.empiezaRonda = 0;
        this.rangoIniEnem -= 100;
        this.rangoFinEnem -= 100;
      }
    }
    this.torPrinDisparaTime += delta; //Controla la cadencia de la torreta principal
  }

  Finish(win){
    if(win) this.win.visible = true;
    else this.gameover.visible = true;
    this.boton_menu.visible = true;
    this.boton_rein.visible = true;

    //Destrucción y visibilidad de objetos
    for(let i = 0; i < this.numHuecos; i++){
      this.torre.huecos[i].visible = false;
    } 

    this.torretas.children.iterate(torreta =>{
      torreta.visible = false;
    })

    this.enemigos.children.iterate(enem =>{      
      if(enem != undefined) {
        enem.barra.destroy();
        enem.destroy();
      }
    })

    this.balas.children.iterate(bala =>{
      if(bala!= undefined) bala.destroy();
    })

    this.torre.torreta_principal.visible = false;;
    this.torre.barra.visible = false;;
    this.torre.visible = false;
    this.oleadas.visible = false;
    this.dinero.visible = false;
    this.hud.visible = false;
  }
}