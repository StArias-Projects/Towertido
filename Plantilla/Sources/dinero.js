export default class Dinero extends Phaser.GameObjects.Text{
    constructor(scene, x, y){
        super(scene, x, y);
        this.cantidad = 0;
        this.setOrigin(1,0);
        this.setFontSize(30);
        this.setFontFamily('Showcard Gothic');
        // this.setFontFamily('Impact');
        this.setText(this.cantidad);
        this.setColor('#FF8000');
        scene.add.existing(this);
    }
  
    ActualizaDinero(nuevo){
        this.cantidad += nuevo;
        this.setText(this.cantidad);
    }
 }
 
 