export class Torreta extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);        

        this.scene = scene;
        this.izq = false; //Lado derecho
        if(x < 960) { //Lado izquierdo
            this.flipX = true;
            this.izq = true;
        }
        this.target = false; //Determina si ha encontrado objetivo
        this.time_to_shoot = 0;
        this.targetX = 0;
        this.targetY = 0;
    }

    BuscaEnemigo(){ //Preguntar al profe
        if(!this.izq){ //Lado derecho
            let i = 0;
            while(!this.target && i < this.scene.enemigos.length){
                if(this.scene.enemigos[i].x > 960){
                    this.target = true;
                    this.targetX = this.scene.enemigos[i].x;
                    this.targetY = this.scene.enemigos[i].y;
                }
                i++;
            }
            
        }else{ //Lado izquierdo
            let i = 0;
            while(!this.target && i < this.scene.enemigos.length){
                if(this.scene.enemigos[i].x < 960){
                    this.target = true;
                    this.targetX = this.scene.enemigos[i].x;
                    this.targetY = this.scene.enemigos[i].y;
                }
                i++;
            }
        }
    }
    preUpdate(time, delta){
        // if(this.target){
            this.time_to_shoot = this.time_to_shoot + 1;
            if(this.time_to_shoot > 100){
                this.Disparar();
                this.time_to_shoot = 0;
            }
        // }else this.BuscaEnemigo();
    }
}