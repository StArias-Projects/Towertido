export default class BalaNormal extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, angle){
        super(scene, x, y, type, angle);
        scene.add.existing(this);
        this.angle = angle;
        this.rotation = angle;
        this.setScale(0.08);
    }

    Mover(){
        var velocity = 10;
        this.x = this.x - Math.cos(this.angle) * velocity;   
        this.y = this.y - Math.sin(this.angle) * velocity;
    }

    preUpdate(){
        this.Mover();
    }
}