import { Enemigos } from "./enemigo.js";
import BalaNormal from './bala_normal.js';

export default class Infanteria extends Enemigos {
    constructor(scene, x, y, type){
        super(scene, x, y, type, 400, 7);
        this.setScale(2);
        this.setOrigin(0.5, 1);  
        scene.add.existing(this);
        this.valorAlMorir = 10;
        this.time_to_shoot = 0;

    }
    
    Dispara(delta){
        this.time_to_shoot += delta; //Controla la cadencia
        if(this.time_to_shoot > 2000){
            this.time_to_shoot = 0;
            let angle = Phaser.Math.Angle.Between(this.x, this.y, this.game.torre.x ,700);
            this.nueva_bala = new BalaNormal (this.game, this.x, this.y - this.height, "bala_normal", angle, 50, 100);
            this.game.shot_enem.play();
            this.game.physics.add.overlap(this.nueva_bala, this.game.torre, this.BalaTorre, null, this.game); //Añade colisiones entre la bala y un target
            this.game.balas.add(this.nueva_bala);
        }
    }
}