// import Vida from '../Sources/vida.js';

export class Enemigos extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, type, vidaMax, vel){
        super(scene, x, y, type, vidaMax, vel);
    }

    Dispara(){
        console.log("He disparado");
    }

    //Detecta al objetivo a una distancia en X
    DetectaObjectivo(objeto, distancia){
        if(!this.flipX && this.x >= objeto.x - distancia ||
            this.flipX && this.x <= objeto.x + distancia){
            this.vel = 0;
            this.Dispara();
        }
    }      
    
    //Mueve al objeto
    Movimiento(){
        if(this.x >= 1920){
            this.vel = -this.vel;
            this.flipX = true;
        }else if(this.x < 0){
            this.vel = -this.vel;
            this.flipX = false;
        }

        this.x += this.vel;
    }
}