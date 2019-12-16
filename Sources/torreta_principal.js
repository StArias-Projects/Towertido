import BalaNormal from './bala_normal.js'

export default class TorretaPrincipal extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        this.setScale(0.4);
        this.game = scene;
        this.daño = 200;
    }
    
    Rotar(x, y) {
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, x, y);
    }

    Disparar(x, y){
        let angle = Phaser.Math.Angle.Between(this.x, this.y, x, y);
        this.nueva_bala = new BalaNormal (this.scene, this.x, this.y, "bala_normal", angle, 50, this.daño);
        this.game.shot_torr.play();
        if(this.game.enemigos != undefined){
            this.game.enemigos.children.iterate(enem =>{
                this.game.physics.add.overlap(this.nueva_bala, enem, this.BalaEnem, null, this.game);
            });
        }
        this.game.balas.add(this.nueva_bala);
    }

    BalaEnem(bala, enem){
        console.log(enem.vida);
        console.log("Bala Aliada + enem");
        enem.PierdeVida(bala.daño);
        bala.destroy();
    }
}