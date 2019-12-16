export default class Oleada extends Phaser.GameObjects.Text{
    constructor(scene, x, y, maxOleada){
        super(scene, x, y);
        this.oleada = 1;
        this.maxOleada = maxOleada;
        this.setOrigin(1,0);
        this.setFontSize(30);
        this.setFontFamily('Showcard Gothic');
        this.setText(this.oleada + "/" + this.maxOleada);
        this.setColor('#FF8000');
        scene.add.existing(this);
    }

    CambiaOleada(){
        this.oleada++;
        this.setText(this.oleada + "/" + this.maxOleada);
    }
}