export default class BalaNormal extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, angle){
        super(scene, x, y, type, angle);
        scene.add.existing(this);
        this.rotation = angle;
        this.setScale(0.1);
        //No sé como poner aqui var/let direction = Phaser.Math.DegToRad(this.angle) para poder sustituirlo más abajo
    }

    Mover(){
        var velocity = 10;
        this.x = this.x + Math.cos(Phaser.Math.DegToRad(this.angle)) * velocity;
        this.y = this.y + Math.sin(Phaser.Math.DegToRad(this.angle)) * velocity;
    }

    preUpdate(time, delta){
        this.Mover();
    }
}