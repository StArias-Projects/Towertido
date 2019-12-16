import { ObjetoConVida } from "./objeto_con_vida.js";

export class Enemigos extends ObjetoConVida {
    constructor(scene, x, y, type, vidaMax, vel){
        super(scene, x, y, type, vidaMax, false);
        if(this.x > 960){
            this.flipX = true;
        }
        this.vel = vel;
        this.objetivo_encontrado = false;
        this.distancia = Phaser.Math.Between( 300, 500);
        scene.physics.world.enable(this);
    }

    BalaTorre(bala, torre){
        torre.PierdeVida(bala.daño);
        bala.destroy();
    }

    //Detecta al objetivo a una distancia en X
    DetectaObjectivo(refPos){
        if(!this.flipX && this.x >= refPos - this.distancia || this.flipX && this.x <= refPos + this.distancia){
            this.vel = 0;
            this.objetivo_encontrado = true;
        }
    }      
    
    //Mueve al objeto
    Movimiento(){       
        if(this.x < 960){
            this.x += this.vel;
            this.barra.x += this.vel
        }
        else{
            this.x -= this.vel;
            this.barra.x -= this.vel
        }
    }

    //Funciones de la vida
    preUpdate(time, delta){
        if(!this.objetivo_encontrado){
            this.DetectaObjectivo(960);
            this.Movimiento();
        }else this.Dispara(delta);
    }
}