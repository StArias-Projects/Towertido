import { Bala } from "./bala.js";

export default class BalaNormal extends Bala {
    constructor(scene, x, y, type, angle, velocidad, enemigo, daño){
        super(scene, x, y, type, angle, velocidad, enemigo);        
        scene.add.existing(this);
        this.setScale(0.1);
        this.daño = daño;
    }
}