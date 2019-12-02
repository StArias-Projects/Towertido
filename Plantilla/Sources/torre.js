import { ObjetoConVida } from "./objeto_con_vida.js";
import TorretaPrincipal from '../Sources/torreta_principal.js';
import Hueco from '../Sources/hueco.js';
import Barra from "./barra_vida.js";

export default class Torre extends ObjetoConVida{
    constructor(scene, x, y, type, pisos){
        super(scene, x, y, type);
        this.setScale(1.8, 2.2);
        this.altura = 1024;
        if(pisos == 3) this.altura -= 198;
        if(pisos == 4) this.altura -= 396;
        this.setPosition(960, this.altura);
        scene.add.existing(this);

        //Creamos la torreta principal
        this.torreta_principal = new TorretaPrincipal (scene, 960, this.altura - 500, "tor_prin");

        //Creamos los huecos
        this.huecos = new Array(pisos * 2); //Array de huecos
        var altura_ini = 860;
        var distancia_al_centro = 145;
        for(let i = 0; i < pisos; i++){
            this.huecos[i * 2] = new Hueco(scene, 960 - distancia_al_centro, altura_ini, "hueco");;//Huecos de la izquierda
            this.huecos[i * 2 + 1] = new Hueco(scene, 960 + distancia_al_centro, altura_ini, "hueco"); //Huecos de la derecha
            altura_ini -= 198;
        }
    }
}