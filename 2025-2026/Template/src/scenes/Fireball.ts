// Fireball.ts
export default class Fireball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "fireball");
    }

    fire(x: number, y: number, targetX: number, targetY: number) {
        this.enableBody(true, x, y, true, true);
        this.setDepth(10);
        this.setScale(0.5);
        
        const angle = Phaser.Math.Angle.Between(x, y, targetX, targetY);
        const speed = 250; 
        
        this.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
        this.setRotation(angle);

        this.scene.time.delayedCall(3000, () => {
            if (this.active) this.disableBody(true, true);
        });
    }
}