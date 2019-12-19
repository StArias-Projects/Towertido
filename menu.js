export default class Menu extends Phaser.Scene {
    constructor() {
      super({ key: 'Menu' });
    }
    preload() {  
        //Imagenes
        this.load.image("botonPlay","./Assets/Images/botonJugar.png");
        this.load.image("logo","./Assets/Images/LogoTowertido.png");
        this.load.image("bg","./Assets/Images/BGmenu.jpg");
        this.load.image("botonControls","./Assets/Images/botonControles.png");
        this.load.image("controles","./Assets/Images/controles.png");

        //Audio
        this.load.audio("bg_music", "./Assets/Sounds/Background1.mp3");
        this.load.audio("bg_music2", "./Assets/Sounds/Background2.mp3");
        this.load.audio("click", "./Assets/Sounds/Click.mp3");
    }
  
    create() {
        this.bg = this.add.image(960,540,"bg");
        this.logo = this.add.image(960,250, "logo");
        this.logo.setScale(3);

        //Botones
        this.botonPlay = this.add.image(480,650, "botonPlay").setInteractive();
        this.botonControls = this.add.image(1440, 650, "botonControls").setInteractive();
        this.bg_sound = this.sound.add("bg_music2");
        this.bg_sound.play();
        this.click = this.sound.add("click");

        this.botonPlay.on('pointerdown', pointer => {
            this.click.play();
            this.bg_sound.stop();
            this.scene.start('Nivel0');
        }); 
        this.botonControls.on('pointerdown', pointer => {
            this.botonControls.destroy();
            this.botonControls = this.add.image(1440, 650, "controles");

        }); 
    }
}