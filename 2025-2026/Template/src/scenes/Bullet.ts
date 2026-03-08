export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "bullet");
  }

  fire(x: number, y: number, targetX: number, targetY: number) {
    this.enableBody(true, x, y, true, true);
    
    const angle = Phaser.Math.Angle.Between(x, y, targetX, targetY);
    
    this.setRotation(angle);
    this.scene.physics.velocityFromRotation(angle, 600, this.body.velocity);
  }
  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    if (this.y < 0 || this.y > 2000 || this.x < 0 || this.x > 2000) {
      this.setActive(false).setVisible(false);
    }
  }
}