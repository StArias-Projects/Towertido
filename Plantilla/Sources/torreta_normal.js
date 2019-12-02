import { Torreta } from "./torreta.js";
import BalaNormal from './bala_normal.js';

export default class TorretaNormal extends Torreta {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        this.setScale(0.05);
    }        
    
    Disparar(){
        let angle = Phaser.Math.Angle.Between(this.x, this.y, this.targetX, this.targetY);
        this.nueva_bala = new BalaNormal (this.scene, this.x, this.y, "bala_normal", angle, 50);
    }
}