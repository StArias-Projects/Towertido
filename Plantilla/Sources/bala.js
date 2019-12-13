export  class Bala extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, angle, velocidad){
        super(scene, x, y, type);
        this.rotation = angle;
        this.velocity = velocidad;
        this.vx = Math.cos(this.rotation) * this.velocity;
        this.vy = Math.sin(this.rotation) * this.velocity;
        scene.physics.world.enable(this);
    }

    Mover(){
        this.x += this.vx;
        this.y += this.vy;
    }


    DestruyeBala(){
       if(this.x > 1920 + this.width || this.x < 0 - this.width ||
         this.y < 0 - this.height || this.y > 1080 + this.height){ //Comparar tambien la colision
        console.log("Destruye la bala");   
        this.destroy();
       }
    }
    
    preUpdate(time, delta){
        this.Mover();
        this.DestruyeBala();
    }
}