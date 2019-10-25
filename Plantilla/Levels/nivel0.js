//Importaciones de objetos
import TorretaPrincipal from '../Sources/torreta_principal.js';

//Clase principal
export default class Nivel0 extends Phaser.Scene {
    constructor() {
      super({ key: 'Nivel0' });
    }
    preload() {  
        this.load.image("tor_prin", "./Assets/Images/torreta_principal.png");
    }
  
    create() {
        this.physics.world.setBoundsCollision(true, true, true, true);  //Izquierda, Derecha, Arriba, Abajo
        console.log("Nivel 0");
        this.torreta_principal = new TorretaPrincipal (this, 400, 400, "tor_prin");
    }
  
    update(time, delta) {  
          
    }
  }