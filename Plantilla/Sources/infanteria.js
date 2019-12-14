import { Enemigos } from "./enemigo.js";

export default class Infanteria extends Enemigos {
    constructor(scene, x, y, type){
        super(scene, x, y, type, 400, 5);
        this.setScale(2);
        this.setOrigin(0.5, 1);  
        scene.add.existing(this);
        this.valorAlMorir = 30;
    }
}