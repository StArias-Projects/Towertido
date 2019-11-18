export default class TorretaPrincipal extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        this.setScale(0.4);
    }
    Rotar(x, y) {
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, x, y);
    }
/*     Disparar(x, y){
        let angle = Phaser.Math.Angle.Between(this.x, this.y, x, y);
        console.log("Crea bala");
        // CrearBala(this.x, this.y, angle);
        this.nueva_bala = new BalaNormal (this, 960, 400, "tor_prin");
    } */
}