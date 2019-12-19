export default class Pausa extends Phaser.Scene{
    constructor(scene) {
        super({ key: 'PausaMenu' });
    }

    preload(){
        this.load.image("fondoPausa", "./Assets/Images/bgPausa.png");
        this.load.image("boton_menu","./Assets/Images/botonMenu.png");
    }

    create(){
        this.bgPausa = this.add.image(960, 540, "fondoPausa");
        this.bgPausa.alpha = 0.5;

        this.botonPlay = this.add.image(480,650, "botonPlay").setInteractive();
        this.boton_menu = this.add.image(1440, 650, "boton_menu").setInteractive();

        this.click = this.sound.add("click");

        this.botonPlay.on('pointerdown', pointer => {
            this.click.play();
            this.scene.resume('Nivel0');
            this.scene.stop();
            }); 

        this.boton_menu.on('pointerdown', pointer => {
            this.click.play();
            this.scene.moveDown('Nivel0');
            this.scene.stop();
            this.scene.start('Menu');
        });
    }
}