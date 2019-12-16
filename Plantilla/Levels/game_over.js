export default class GameOver extends Phaser.Scene{
  constructor() {
    super({ key: 'GameOver' });
  }

  preload(){
    //Imagenes
    this.load.image("fondo", "./Assets/Images/fondo.png");
    this.load.image("gameover","./Assets/Images/gameover.png");
    this.load.image("boton_menu","./Assets/Images/botonMenu.png");
    this.load.image("boton_rein","./Assets/Images/botonReiniciar.png");
    //Audio
    this.load.audio("gameover_sound", "./Assets/Sounds/GameOver.mp3");
  }

  create(){
    this.fondo = this.add.image(960, 525, "fondo");
    this.gameover = this.add.image(960,400, "gameover");

    this.gameover_sound = this.sound.add("gameover_sound");
    this.gameover_sound.play();
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