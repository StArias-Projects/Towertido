//import Nivel0 from './Levels/nivel0'

export default class Menu extends Phaser.Scene {
    constructor() {
      super({ key: 'Menu' });
    }
    preload() {  
        this.load.image("boton_inicio","./Assets/Images/botonJugar.png");
        this.load.image("logo","./Assets/Images/LogoTowertido.png");
        this.load.image("bg","./Assets/Images/BGmenu.jpg");
    }
  
    create() {
        this.bg = this.add.image(960,540,"bg");

        this.logo = this.add.image(960,250, "logo");
        this.logo.setScale(2);

        
        this.boton_ini = this.add.image(960,540, "boton_inicio").setInteractive();
        this.boton_ini.setScale(0.5);

        
         //Puntero y eventos
        let pointer = this.input.activePointer;

        this.boton_ini.on('pointerdown', pointer => {
            console.log("Se ha pulsado");
            this.scene.start('Nivel0');
        }); 
    }
  
    update(time, delta) {
          
    }
  }