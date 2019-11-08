//Importaciones de objetos
import TorretaPrincipal from '../Sources/torreta_principal.js';
import BalaNormal from '../Sources/bala_normal.js';

let angle;
//Clase principal
export default class Nivel0 extends Phaser.Scene {
    constructor() {
      super({ key: 'Nivel0' });
    }
    preload() {  
        this.load.image("tor_prin", "./Assets/Images/torreta_principal.png");
        this.load.image("bala_normal", "./Assets/Images/bala_normal.png");
    }
    create() {
        //this.physics.world.setBoundsCollision(true, true, true, true);  //Izquierda, Derecha, Arriba, Abajo
        console.log("Nivel 0");

        //Creación de objetos
        this.torreta_principal = new TorretaPrincipal (this, 960, 400, "tor_prin");
        s
        //Activa el imput de ratón
        let pointer = this.input.activePointer;

        //Eventos del ratón 
        this.input.on('pointermove', function (pointer) {
          this.torreta_principal.Rotar(pointer.x, pointer.y);
        }, this);

        this.input.on('pointerdown', function (pointer) {
          let angle = Phaser.Math.Angle.Between(this.torreta_principal.x, this.torreta_principal.y, pointer.x, pointer.y);
          this.nueva_bala = new BalaNormal (this, 200, 200, "bala_normal", angle);
        }, this);        
      }
      
      update(time, delta) {  
    }
  }