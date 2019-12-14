import { Torreta } from "./torreta.js";
import BalaNormal from './bala_normal.js';

export default class TorretaNormal extends Torreta {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        this.setScale(0.05);
        this.game = scene;
    }        
    
    Disparar(){
        this.nueva_bala = new BalaNormal (this.game, this.x, this.y, "bala_normal", this.rotation, 50, 200);
        if(this.game.enemigos != undefined){
            this.game.enemigos.children.iterate(enem =>{
                this.game.physics.add.overlap(this.nueva_bala, enem, this.BalaEnem, null, this.game);
            });
        }
        this.game.balas.add(this.nueva_bala);
    }

    BalaEnem(bala, enem){
        enem.PierdeVida(bala.daño);
        bala.destroy();
    }
}