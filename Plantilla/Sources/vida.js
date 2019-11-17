export class Vida extends Phaser {
    constructor(scene, vidaMax, x, y){ 
        this.barra = this.create(x, y, "barra_vida");
        this.vida = this.vidaMax;
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