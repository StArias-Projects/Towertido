import { ObjetoConVida } from "./objeto_con_vida.js";
import BalaNormal from './bala_normal.js';

export class Enemigos extends ObjetoConVida {

    constructor(scene, x, y, type, vidaMax, vel){
        super(scene, x, y, type, vidaMax, false);
        if(this.x > 960){
            this.flipX = true;
        }
        this.vel = vel;
        this.time_to_shoot = 0;
        this.objetivo_encontrado = false;
        this.game = scene;
    }

    Dispara(delta){
        this.time_to_shoot += delta;
        if(this.time_to_shoot > 2000){
            console.log("PIUM PIUM");
            this.time_to_shoot = 0;
            this.game.torre.PierdeVida(10);
            let angle = Phaser.Math.Angle.Between(this.x, this.y, 960,1080 - this.height);
            this.nueva_bala = new BalaNormal (this.scene, this.x, this.y - this.height, "bala_normal", angle, 50);
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
            this.game.enemigos.remove(this);
            this.game.muertesOleada++;
            console.log(this.game.muertesOleada);
        }else{
            if(!this.objetivo_encontrado){
                this.DetectaObjectivo(960, 300);
                this.Movimiento();
            }else this.Dispara(delta);
            this.PierdeVida(delta/10);
        }
    }
}