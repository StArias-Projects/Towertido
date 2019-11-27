import Barra from "./barra_vida.js";

export class ObjetoConVida extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, vidaMax, barra){ 
        super(scene, x, y, type);
        scene.add.existing(this);

        this.vida = vidaMax;
        this.vidaMax = vidaMax;

        this.barra = new Barra(scene, x, y - this.height*1.5, "vida");
        this.barra.setOrigin(0.5, 0);
        this.barra.setScale(0.2, 0.1);
    }
    //Sirve para conocer la vida actual
    VidaActual(){
        return this.vida;
    }    
    //Permite saber si el personaje ha muerto
    Muerto(){
        return this.vida <= 0;
    }

    //Inflige daño a la vida
    PierdeVida(daño){
        this.vida -= daño;
        this.barra.ReduceBarra(this.vida/this.vidaMax);
        console.log(this.vida);
    }

    //recupera una cantidad de vida
    RecuperaVida(cantidad){
       if(this.vida < this.vidaMax) this.vida += cantidad; 
        this.IgualaVida();
    }

    //Iguala a la vida máxima si supera los límites
    IgualaVida(){
        if(this.vida >= this.vidaMax) this.vida = this.vidaMax;
    }
}