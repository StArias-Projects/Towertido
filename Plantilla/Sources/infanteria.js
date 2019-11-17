import { Enemigos } from "./enemigos.js";

export default class Infanteria extends Enemigos {
    constructor(scene, x, y, type, vidaMax, vel){
        super(scene, x, y, type, vidaMax, vel);
        // this.vida = new Vida(scene,vidaMax, x, y);
        scene.add.existing(this);
        this.setScale(2);
        this.vel = vel;
    }
}