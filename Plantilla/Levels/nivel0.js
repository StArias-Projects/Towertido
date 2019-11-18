//Importaciones de objetos
import TorretaPrincipal from '../Sources/torreta_principal.js';
import BalaNormal from '../Sources/bala_normal.js';
import Infanteria from '../Sources/infanteria.js';
import Torre from '../Sources/torre.js';
import Hueco from '../Sources/hueco.js';
import TorretaNormal from '../Sources/torreta_normal.js';

//Constantes
// NUM_INFANTERIA = 10;

let angle;
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
  }

  create() {
    console.log("Nivel 0");
    this.fondo = this.add.image(960, 525, "fondo");
    this.tiempoEnem = 0;
    
    //Creación de objetos
    this.torre = new Torre(this, 960, 1050, "torre");
    this.torreta_principal = new TorretaPrincipal (this, 960, 400, "tor_prin");
    this.infanteria = new Infanteria(this, 1500, 1080, "infant", 1000, 5);
    this.hueco_uno = new Hueco(this, 1060, 600, "hueco");

    // this.enemigos = this.add.group(); //Array de enemigos
    this.tiempoUltEnem = 0;

    //Activa el imput de ratón
    let pointer = this.input.activePointer;

    //Eventos
    //Ratón
    this.input.on('pointermove', function (pointer) {
      this.torreta_principal.Rotar(pointer.x, pointer.y);
    }, this);

    this.input.on('pointerdown', function (pointer) {
      let angle = Phaser.Math.Angle.Between(this.torreta_principal.x, this.torreta_principal.y, pointer.x, pointer.y);
      this.nueva_bala = new BalaNormal (this, 960, 400, "bala_normal", angle);
    }, this);      

    this.hueco_uno.on('pointerdown', pointer => {
      this.torreta_uno = new TorretaNormal(this, this.hueco_uno.x, this.hueco_uno.y, "torreta_normal");
      this.hueco_uno.destroy();
    });
  }
    
  update(time, delta) {  

    //Spawner
    // if(this.tiempoUltEnem >= this.tiempoEnem){
    //   this.enemigos.add(new Infanteria(this, 0, 1080, "infant", 1000, 5, this.torre.x));
    //   this.tiempoUltEnem = 0;
    //   this.tiempoEnem = Phaser.Math.Between(10,600);
    // }else this.tiempoUltEnem += 5;
  }
}