//Importaciones de objetos
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
    var pisos = 4; //2, 3 o 4
    this.torre = new Torre(this, 960, 1024, "torre", pisos); //La torre tiene que crear los huecos y poner la torreta principal encima suya en función del número de pisos
    this.infanteria = new Infanteria(this, 1500, 1080, "infant");
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
      this.torre.torreta_principal.Rotar(pointer.x, pointer.y);
    }, this);

    this.input.on('pointerdown', function (pointer) {
      this.torre.torreta_principal.Disparar(pointer.x, pointer.y);
      console.log("Suelto bala")
    }, this);   

    for(var i = 0; i < pisos * 2; i++){
      this.torre.huecos[i].on('pointerdown', function (pointer) {
        console.log("pulsado el hueco " + i)
        //this.torre.huecos[i].ConstruirTorretaNormal();
      }, this); 
    }   

    //Agrupar huecos en un array
    //Funcion hueco
    /* this.hueco_dos.on('pointerdown', pointer => {
      this.torreta_dos = new TorretaNormal(this, this.hueco_dos.x, this.hueco_dos.y, "torreta_normal");
      this.hueco_dos.destroy();
    });
 */
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