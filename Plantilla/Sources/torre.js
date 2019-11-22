import { ObjetoConVida } from "./objeto_con_vida.js";
import Barra from "./barra_vida.js";

export default class Torre extends ObjetoConVida{
    constructor(scene, x, y, type, barra){
        super(scene, x, y, type, 1000, barra);
        scene.add.existing(this);
        this.setScale(4.7, 7);
        this.barra = new Barra(scene, 0, 0, barra);
        this.barra.setOrigin(0);
        this.barra.setScale(1, 0.5);
    }
}