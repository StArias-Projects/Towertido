export class Torreta extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);        

        this.game = scene;
        this.izq = false; //Lado derecho
        if(x < 960) { //Lado izquierdo
            this.flipX = true;
            this.izq = true;
        }
        this.target = false; //Determina si ha encontrado objetivo
        this.time_to_shoot = 0;
        this.enem;
    }

    BuscaEnemigo(){
        if(!this.izq){ //Lado derecho
            this.game.enemigos.children.iterate(enem =>{
                if(enem.x > 960 && !this.target){
                    this.target = true;
                    this.enem = enem;
                }
            })            
        }else{ //Lado izquierdo
            this.game.enemigos.children.iterate(enem =>{
                if(enem.x < 960 && !this.target){
                    this.target = true;
                    this.enem = enem;
                    this.flipX = false;
                }
            })   
        }
    }

    Rotar() {
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.enem.x, this.enem.y);
    }


    preUpdate(time, delta){
        if(this.target && this.enem != undefined && !this.enem.Muerto() ){
            this.Rotar();
            this.time_to_shoot = this.time_to_shoot + 1;
            if(this.time_to_shoot > 100){
                this.Disparar();
                this.time_to_shoot = 0;
            }
        }else this.BuscaEnemigo();
        if(this.enem != undefined && this.enem.Muerto()) this.target = false;
    }
}