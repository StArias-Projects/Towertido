export default class Timer extends Phaser.GameObjects.Text{
    constructor(scene, x, y){
        super(scene, x, y);
        this.setOrigin(0.5);
        this.setFontSize(50);
        this.setFontFamily('Showcard Gothic');
        this.setText("");
        this.setColor('#E5BE01 ');
        scene.add.existing(this);
    }

    ActualizaTiempo(tiempo){
        if(tiempo > 0) this.setText("Next Wave: " + (tiempo + 1).toString().substr(0, 1));
        else this.setText("");
    }
}