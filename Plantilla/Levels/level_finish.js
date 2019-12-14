export default class LevelFinish extends Phaser.Scene {
    constructor() {
      super({ key: 'LevelFinish' });
    }

    preload() {  
        this.load.image("win","./Assets/Images/win.png");
        this.load.image("logo","./Assets/Images/LogoTowertido.png");
        this.load.image("boton_atras","./Assets/Images/boton.png");
    }
  
    create() {
        this.win = this.add.image(960,540,"win");

        this.logo = this.add.image(960,250, "logo");
        this.logo.setScale(2);

        
        this.boton_atras = this.add.image(300,800, "boton_atras").setInteractive();
        this.boton_atras.setScale(1, 1);

        this.boton_rein = this.add.image(1500,800, "boton_atras").setInteractive();
        this.boton_rein.setScale(1, 1);

         //Puntero y eventos
        let pointer = this.input.activePointer;

        this.boton_atras.on('pointerdown', pointer => {
            console.log("volver al menu");
            this.scene.start('Menu');
        }); 

        this.boton_rein.on('pointerdown', pointer => {
            console.log("Cargar nivel 0");
            this.scene.start('Nivel0');
        }); 
    }
}