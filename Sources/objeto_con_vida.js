import Barra from "./barra_vida.js";

export class ObjetoConVida extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, vidaMax, torre){ 
        super(scene, x, y, type);
        scene.add.existing(this);
        this.game = scene;
        this.vida = vidaMax;
        this.vidaMax = vidaMax;
        this.barra = new Barra(scene, x, y - this.height * 3, "vida");
        this.barraScaleX;
        this.barraScaleY;
        
        //Diferencia entre las posiciones de la barra de vida de la torre y del resto
        this.torre = torre;
        if(torre){
            this.barra.setPosition(5, 0);
            this.barra.setOrigin(0);
            this.barraScaleX = 1.09;
            this.barraScaleY = 0.4;
            this.barra.setScale(this.barraScaleX, this.barraScaleY);
        }
        else{
            this.barra.setOrigin(0.5 ,0);
            this.barraScaleX = 0.2;
            this.barraScaleY = 0.1;
            this.barra.setScale(this.barraScaleX, this.barraScaleY);
        }
        this.newOriginX;

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
        this.IgualaVida();
        this.ReduceBarra();
        if(this.torre && this.Muerto()) this.game.Finish(false);
        else if(!this.torre && this.Muerto()){            
            this.barra.destroy();
            this.destroy();
            this.game.enemigos.remove(this);
            this.game.muertesOleada++;
            this.game.dinero.ActualizaDinero(this.valorAlMorir);
            if(this.game.muteOff.visible)this.game.money_earn.play();
        }
    }

    ReduceBarra(){
        if(this.torre){
            this.barraScaleX = (this.vida/this.vidaMax) * 1.09;
            this.barra.setScale(this.barraScaleX, this.barraScaleY);
        } 
        else{
            this.barraScaleX = (this.vida/this.vidaMax) * 0.2;
            this.barra.setScale(this.barraScaleX, this.barraScaleY);
        }
    }

    //recupera una cantidad de vida
    RecuperaVida(cantidad){
       if(this.vida < this.vidaMax) this.vida += cantidad; 
        this.IgualaVida();
    }

    //Iguala a la vida máxima si supera los límites
    IgualaVida(){
        if(this.vida >= this.vidaMax) this.vida = this.vidaMax;
        else if(this.vida <= 0) this.vida = 0;
    }
}