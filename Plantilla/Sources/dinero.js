export default class Dinero extends Phaser.GameObjects.Text{
    constructor(scene, x, y){
        super(scene, x, y);
        this.cantidad = 400;
        this.setFontSize(65);
        this.setFontFamily('Showcard Gothic');
        // this.setFontFamily('Impact');
        this.setText(this.cantidad);
        this.setColor('#990000');
        scene.add.existing(this);
    }
  
    ActualizaDinero(nuevo){
        this.cantidad += nuevo;
        this.setText(this.cantidad);
    }
 }
 
 