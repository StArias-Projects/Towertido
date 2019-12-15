export default class Menu extends Phaser.Scene {
    constructor() {
      super({ key: 'Menu' });
    }
    preload() {  
        //Imagenes
        this.load.image("boton_inicio","./Assets/Images/botonJugar.png");
        this.load.image("logo","./Assets/Images/LogoTowertido.png");
        this.load.image("bg","./Assets/Images/BGmenu.jpg");
        //Audio
        this.load.audio("bg_music", "./Assets/Sounds/Background1.mp3");
        this.load.audio("bg_music2", "./Assets/Sounds/Background2.mp3");
        this.load.audio("click", "./Assets/Sounds/Click.mp3");
    }
  
    create() {
        this.bg = this.add.image(960,540,"bg");

        this.logo = this.add.image(960,250, "logo");
        this.logo.setScale(3);

        this.boton_ini = this.add.image(960,650, "boton_inicio").setInteractive();
        
        this.bg_sound = this.sound.add("bg_music2");
        //this.bg_sound.play();
        this.click = this.sound.add("click");

        this.boton_ini.on('pointerdown', pointer => {
            this.click.play();
            this.bg_sound.stop();
            this.scene.start('Nivel0');
        }); 
    }
}