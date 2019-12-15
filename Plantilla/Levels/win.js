export default class Win extends Phaser.Scene{
  constructor() {
      super({ key: 'Win' });
  }

  preload(){
    //Imagenes
    this.load.image("fondo", "./Assets/Images/fondo.png");
    this.load.image("win","./Assets/Images/win.png");
    this.load.image("boton_menu","./Assets/Images/botonMenu.png");
    this.load.image("boton_rein","./Assets/Images/botonReiniciar.png");
    //Audio
    this.load.audio("win_sound", "./Assets/Sounds/Win.mp3");
  }

  create(){
    this.fondo = this.add.image(960, 525, "fondo");
    this.win = this.add.image(960,400, "win");
    this.win.setScale(2.2);

    
    this.win_sound = this.sound.add("win_sound");
    this.win_sound.play();
    this.click = this.sound.add("click");

    //Boton para volver al Menu
    this.boton_menu = this.add.image(650,800, "boton_menu").setInteractive();
    this.boton_menu.on('pointerdown', pointer => {
      this.click.play();
      this.scene.start('Menu');
    });
    
    //Boton para volver a jugar
    this.boton_rein = this.add.image(1270,800, "boton_rein").setInteractive();
    this.boton_rein.on('pointerdown', pointer => {
      this.click.play();
      this.scene.start('Nivel0');
    }); 
  }
}