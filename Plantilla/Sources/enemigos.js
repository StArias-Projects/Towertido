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

    //Funciones de la vida
        //Sirve para conocer la vida actual
    VidaActual(){
        return this.vida;
    }   
        //Permite saber si el personaje ha muerto 
    Muerto(){
        return this.vida <= 0;
    }

        //Inflige daño a la vida
    PierdeVida(daño){
        this.vida -= daño;
        if(this.vida <= 0) this.vida = 0;
    }

        //recupera una cantidad de vida
    RecuperaVida(cantidad){
        if(this.vida < this.vidaMax) this.vida += cantidad; 
         this.IgualaVida();
     }

        //Iguala a la vida máxima si supera los límites
    IgualaVida(){
        if(this.vida >= this.vidaMax) this.vida = this.vidaMax;
    }
}