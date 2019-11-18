import { Torreta } from "./torreta.js";
import BalaNormal from "./bala_normal.js";

export default class TorretaNormal extends Torreta {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        var time_to_shoot = 0;
    }

    Disparar(){
        this.nueva_bala = new BalaNormal (this, 960, 400, "bala_normal", 0);
    }

    preupdate(time, delta){
        this.time_to_shoot = this.time_to_shoot + 1;
        if(this.time_to_shoot > 100){
            this.Disparar();
            this.time_to_shoot = 0;
        }
        console.log("actualizo   " + this.time_to_shoot)
    }
}