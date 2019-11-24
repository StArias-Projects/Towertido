import BalaNormal from './bala_normal.js'

export default class TorretaPrincipal extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        this.setScale(0.4);
    }
    
    Rotar(x, y) {
        console.log("giro")
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, x, y);
    }

    Disparar(x, y){
        let angle = Phaser.Math.Angle.Between(this.x, this.y, x, y);
        console.log("Crea bala");
        // CrearBala(this.x, this.y, angle);
        this.nueva_bala = new BalaNormal (this.scene, this.x, this.y, "bala_normal", angle, 10);
    }
}