// import Vida from '../Sources/vida.js';

export class Enemigos extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, type, vidaMax, vel){
        super(scene, x, y, type);
        this.setOrigin(0 , 1);
        if(this.x > 960){
            this.flipX = true;
        }
        this.vidaMax = vidaMax;
        this.vel = vel;
        this.time_to_shoot = 0;
        this.objetivo_encontrado = false;
    }

    Dispara(delta){
        this.time_to_shoot += delta;
        if(this.time_to_shoot > 2000){
            console.log("PIUM PIUM");
            this.time_to_shoot = 0;
        }
    }

    //Detecta al objetivo a una distancia en X
    DetectaObjectivo(refPos, distancia){
        if(!this.flipX && this.x >= refPos - distancia || this.flipX && this.x <= refPos + distancia){
            this.vel = 0;
            this.objetivo_encontrado = true;
        }
    }      
    
    //Mueve al objeto
    Movimiento(){       
        if(this.x < 960)
        this.x += this.vel;
        else this.x -= this.vel;
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

    preUpdate(time, delta){
        if(!this.objetivo_encontrado){
            this.DetectaObjectivo(960, 300);
            this.Movimiento();
        }else this.Dispara(delta);
    }
}