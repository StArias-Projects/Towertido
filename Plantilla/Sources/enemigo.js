import { ObjetoConVida } from "./objeto_con_vida.js";
import Barra from "./barra_vida.js"

export class Enemigos extends ObjetoConVida {

    constructor(scene, x, y, type, vidaMax, vel){
        super(scene, x, y, type, vidaMax);
        if(this.x > 960){
            this.flipX = true;
        }
        this.vel = vel;
        this.time_to_shoot = 0;
        this.objetivo_encontrado = false;       

        this.barra = new Barra(scene, x, y - this.height*1.5, "vida");
        this.barra.setOrigin(0.5, 0);
        this.barra.setScale(0.2, 0.1);
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
        if(this.Muerto()) {
            this.barra.destroy();
            this.destroy();
        }else{
            if(!this.objetivo_encontrado){
                this.DetectaObjectivo(960, 300);
                this.Movimiento();
            }else this.Dispara(delta);
            this.barra.ReduceBarra((this.vida/this.vidaMax)*0.2, 0.1);
        }
    }
}