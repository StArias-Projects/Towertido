//Importaciones de objetos
import TorretaPrincipal from '../Sources/torreta_principal.js';
import BalaNormal from '../Sources/bala_normal.js';
import Infanteria from '../Sources/infanteria.js';
import Torre from '../Sources/torre.js';

let angle;
//Clase principal
export default class Nivel0 extends Phaser.Scene {
    constructor() {
      super({ key: 'Nivel0' });
    }
    preload() {  

      this.load.image("fondo", "./Assets/Images/fondo.png");

      //Objetos
      this.load.image("tor_prin", "./Assets/Images/torreta_principal.png");
      this.load.image("bala_normal", "./Assets/Images/bala_normal.png");
      this.load.spritesheet("infant", "./Assets/Images/infanteria.png",
        {frameWidth: 70, frameHeight: 77});
      this.load.image("torre", "./Assets/Images/torre.png");
    }
    create() {
      //this.physics.world.setBoundsCollision(true, true, true, true);  //Izquierda, Derecha, Arriba, Abajo
      console.log("Nivel 0");
      this.fondo = this.add.image(960, 525, "fondo");

      //Creación de objetos
      this.torre = new Torre(this, 960, 1050, "torre");
      this.torreta_principal = new TorretaPrincipal (this, 960, 400, "tor_prin");
      this.infanteria = new Infanteria(this, 0, 1080, "infant", 1000, 5);
      this.infanteria.setOrigin(0 , 1);

      //Activa el imput de ratón
      let pointer = this.input.activePointer;

      //Eventos
        //Ratón
        this.input.on('pointermove', function (pointer) {
          this.torreta_principal.Rotar(pointer.x, pointer.y);
        }, this);

        this.input.on('pointerdown', function (pointer) {
          let angle = Phaser.Math.Angle.Between(this.torreta_principal.x, this.torreta_principal.y, pointer.x, pointer.y);
          this.nueva_bala = new BalaNormal (this, 200, 200, "bala_normal", angle);
        }, this);      
        
        this.infanteria.on('pointerdown', pointer => {
          this.infanteria.PierdeVida(100);
          console.log(this.infanteria.VidaActual());
          if(this.infanteria.Muerto()) console.log("He muerto");
      }); 
      }
      
      update(time, delta) {  

        this.infanteria.Movimiento();
        if(!this.infanteria.Muerto())
          this.infanteria.DetectaObjectivo(this.torre, 300);
    }
  }