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
        this.distancia = Phaser.Math.Between( 300, 500);
        scene.physics.world.enable(this);
    }

    Dispara(delta){
        this.time_to_shoot += delta;
        if(this.time_to_shoot > 2000){
            this.time_to_shoot = 0;
            let angle = Phaser.Math.Angle.Between(this.x, this.y, this.game.torre.x ,700);
            this.nueva_bala = new BalaNormal (this.scene, this.x, this.y - this.height, "bala_normal", angle, 50, true, 100);
            console.log(this.game.torre);
            this.game.physics.add.overlap(this.nueva_bala, this.game.torre, this.BalaTorre, null, this.game);
        }
    }

    BalaTorre(bala, torre){
        console.log("Bala enem + Torre");
        torre.PierdeVida(bala.daño);
        bala.destroy();
        if(torre.Muerto()) this.game.Finish(false);
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
        if(this.Muerto()) {
            this.barra.destroy();
            this.destroy();
            this.game.enemigos.remove(this);
            this.game.muertesOleada++;
            this.game.dinero.ActualizaDinero(this.valorAlMorir);
            console.log("Enemigos muertos: " + this.game.muertesOleada);
        }else{
            if(!this.objetivo_encontrado){
                this.DetectaObjectivo(960);
                this.Movimiento();
            }else this.Dispara(delta);

        }
    }
}