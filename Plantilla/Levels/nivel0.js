//Importaciones de objetos
import TorretaPrincipal from '../Sources/torreta_principal.js';
import BalaNormal from '../Sources/bala_normal.js';
import Infanteria from '../Sources/infanteria.js';
import Torre from '../Sources/torre.js';
import Hueco from '../Sources/hueco.js';
import TorretaNormal from '../Sources/torreta_normal.js';

//Constantes
// NUM_INFANTERIA = 10;

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
    this.tiempoEnem = 0;
    
    //Creación de objetos
    this.torre = new Torre(this, 960, 1050, "torre", "vida");
    this.torreta_principal = new TorretaPrincipal (this, 960, 400, "tor_prin");
    this.infanteria = new Infanteria(this, 1500, 1080, "infant");
    this.hueco_uno = new Hueco(this, 1060, 600, "hueco");
    this.hueco_dos = new Hueco(this, 860, 600, "hueco");
    this.hueco_tres = new Hueco(this, 1060, 750, "hueco");
    this.hueco_cuatro = new Hueco(this, 860, 750, "hueco");
    this.huecos = this.add.group(); //Array de huecos
    this.enemigos = this.add.group(); //Array de enemigos
    this.tiempoUltEnem = 0;

    //Activa el imput de ratón
    let pointer = this.input.activePointer;

    //Eventos
    //Ratón
    this.infanteria.on('pointerdown', function(pointer){
      this.infanteria.PierdeVida(200);
    }, this);

    this.input.on('pointermove', function (pointer) {
      this.torreta_principal.Rotar(pointer.x, pointer.y);
    }, this);

    this.input.on('pointerdown', function (pointer) {
      this.torreta_principal.Disparar(pointer.x, pointer.y);
      console.log("Suelto bala")
    }, this);      

    //Agrupar huecos en un array
    this.hueco_uno.on('pointerdown', pointer => {
      this.torreta_uno = new TorretaNormal(this, this.hueco_uno.x, this.hueco_uno.y, "torreta_normal");
      this.hueco_uno.destroy();
    });

    this.hueco_dos.on('pointerdown', pointer => {
      this.torreta_dos = new TorretaNormal(this, this.hueco_dos.x, this.hueco_dos.y, "torreta_normal");
      this.hueco_dos.destroy();
    });

    this.hueco_tres.on('pointerdown', pointer => {
      this.torreta_tres = new TorretaNormal(this, this.hueco_tres.x, this.hueco_tres.y, "torreta_normal");
      this.hueco_tres.destroy();
    });

    this.hueco_cuatro.on('pointerdown', pointer => {
      this.torreta_cuatro = new TorretaNormal(this, this.hueco_cuatro.x, this.hueco_cuatro.y, "torreta_normal");
      this.hueco_cuatro.destroy();
    });
  }
    
  update(time, delta) {  

    // Spawner
    // if(this.tiempoUltEnem >= this.tiempoEnem){
    //   this.enemigos.add(new Infanteria(this, 0, 1080, "infant", 1000, 5, this.torre.x));
    //   this.tiempoUltEnem = 0;
    //   this.tiempoEnem = Phaser.Math.Between(10,600);
    // }else this.tiempoUltEnem += delta/5;
  }
}