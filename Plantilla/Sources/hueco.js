import TorretaNormal from './torreta_normal.js';

export default class Hueco extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        this.setInteractive();
        this.setScale(0.04);
        this.scene = scene;
    }

    ConstruirTorretaNormal(){
        console.log("construyo torreta");
        this.torreta = new TorretaNormal(this.scene, this.x, this.y, "torreta_normal");
        this.destroy();
    }
}