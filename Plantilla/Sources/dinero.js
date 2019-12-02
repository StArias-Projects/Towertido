export default class Dinero extends Phaser.GameObjects.Text{
    constructor(scene, x, y){
        super(scene, x, y);
        this.cantidad = 400;
        this.setFontSize(200);
        // this.setFont('Showcard Gothic')
        this.setText(this.cantidad);
        scene.add.existing(this);
    }
  
    ActualizaDinero(nuevo){
        this.cantidad += nuevo;
        this.setText(this.cantidad);
    }
  
    //Esto en la funcion del hueco del puntero de Nivel0
    /* */
 }
 
 