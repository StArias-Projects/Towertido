//Importaciones de objetos
import Infanteria from '../Sources/infanteria.js';
import Torre from '../Sources/torre.js';
import Dinero from '../Sources/dinero.js';
import Oleada from '../Sources/oleadas.js';
import Timer from '../Sources/tiempo_entre_oleada.js';
import Pausa from './pausa.js';

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
    this.load.image("HUD", "./Assets/Images/HUDsinMode.png");
    
    //Audio
    this.load.image("muteOn", "./Assets/Images/muteOn.png");
    this.load.image("muteOff", "./Assets/Images/muteOff.png");
    this.load.audio("shot_enem", "./Assets/Sounds/ShotEnemy.mp3");
    this.load.audio("shot_torr", "./Assets/Sounds/ShotTorret.mp3");
    this.load.audio("money_earn", "./Assets/Sounds/MoneyEarn.mp3");
    this.load.audio("money_drop", "./Assets/Sounds/MoneyDrop.mp3");
  }

  create() {
    this.fondo = this.add.image(960, 525, "fondo");
    this.pause = new Pausa(this);
    
    //Efectos de sonido
    this.bg_sound = this.sound.add("bg_music");
    this.bg_sound.play();
    this.click = this.sound.add("click");
    this.shot_enem = this.sound.add("shot_enem");
    this.shot_torr = this.sound.add("shot_torr");
    this.money_earn = this.sound.add("money_earn");
    this.money_drop = this.sound.add("money_drop");

    this.muteOff = this.add.image( 1377, 68, "muteOff").setInteractive();
    this.muteOn = this.add.image( 1377, 68, "muteOn").setInteractive();
    this.muteOn.visible = false;

    //Tiempos de espera
    this.tiempoEnem = 0;
    this.torPrinDelay = 500;
    this.torPrinDisparaTime = 500;

    //Variables generales
    this.pisos = 3; //2, 3 o 4
    this.tiempoUltEnem = 0;
    this.costeTNormal = 100;
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
    this.numEnem[0] = 8;      //8
    this.numEnem[1] = 16;     //8 mas
    this.numEnem[2] = 26;     //10 mas
    this.numEnem[3] = 38;     //12 mas
    this.wave = 0; //Sirve para iterar entre el array numEnem
    this.it = 0; //Sirve para iterar entre el grupo de enemigos
    this.rangoIniEnem = 1200; //Rango de apracición de enemigos(x, y);
    this.rangoFinEnem = 2000;

    //HUD
    this.hud = this.add.image(1920,1080, "HUD").setOrigin(0).setPosition(0,0);
    
    //Oleada
    this.oleadas = new Oleada(this, 1842, 68, 4);
    this.timer = new Timer(this, 970, 68);
    //Dinero
    this.dinero = new Dinero(this, 1677, 68);

    //Balas
    this.balas = this.add.group();

    //Input
    this.p = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

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

    this.muteOff.on('pointerdown', function(pointer){
      this.muteOff.visible = false;
      this.muteOn.visible = true;
      this.bg_sound.pause();
    }, this);
    
    this.muteOn.on('pointerdown', function(pointer){
      this.muteOn.visible = false;
      this.muteOff.visible = true;
      this.bg_sound.play();
    }, this);

    //Construcción de torretas
    for(let i = 0; i < this.numHuecos; i++){
      this.torre.huecos[i].on('pointerdown', function (pointer) {
        if(this.dinero.cantidad >= this.costeTNormal){
          if(this.muteOff.visible)this.money_drop.play();
          this.torre.huecos[i].ConstruirTorretaNormal();
          this.dinero.ActualizaDinero(-this.costeTNormal);
        } 
      }, this);
    }  
  }
    
  update(time, delta) {
    if(this.p.isDown){
      this.scene.launch("PausaMenu");
      this.scene.pause();
      this.p.isDown = false;
    }
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
      this.timer.ActualizaTiempo((this.tiempoEntreRonda - this.empiezaRonda)/ 1000);
    }
    
    if(this.wave < this.numEnem.length && this.muertesOleada >= this.numEnem[this.wave]){
      this.wave++; 
      if(this.wave == this.numEnem.length) this.Finish(true);
      else{
        this.muertesOleada = 0;
        this.it = 0;
        this.oleadas.CambiaOleada();
        this.empiezaRonda = 0;
        this.rangoIniEnem -= 200;
        this.rangoFinEnem -= 200;
      }
    }
    this.torPrinDisparaTime += delta; //Controla la cadencia de la torreta principal    
  }

  Finish(win){
    this.bg_sound.stop();
    if(win) this.scene.start('Win');
    else this.scene.start('GameOver');
  }
}