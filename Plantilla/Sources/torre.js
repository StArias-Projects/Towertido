export default class Torre extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, vida){
        super(scene, x, y, type); 
         scene.add.existing(this);
        this.setScale(4.7, 7);
    }
}