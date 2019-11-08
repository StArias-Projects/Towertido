export default class BalaNormal extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, angle){
        super(scene, x, y, type, angle);
        scene.add.existing(this);
        this.rotation = angle;
    }
}