import Fireball from "./Fireball";


export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    private _hp: number = 3;
    private _speed: number = 50;
    private _isFlashing: boolean = false; // Per evitare sovrapposizioni di lampeggi

    private _isKnockedBack: boolean = false;
    private _lastShot: number = 0;
    private _fireRate: number = 2000; // Spara ogni 2 secondi
    private _isRanged: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, isRanged : boolean = false) {
        super(scene, x, y, texture);

        this._isRanged = isRanged;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0, 0);
        this.setCollideWorldBounds(true);
        this.setImmovable(false);
    }

    updateAI(playerX: number, playerY: number, fireballGroup: Phaser.Physics.Arcade.Group) {
        // 1. Calcolo movimento (deve essere fuori da ogni IF per funzionare sempre)

        if (this._isKnockedBack || !this.body) return; 
        const  body = this.body as Phaser.Physics.Arcade.Body; 
        const angle = Phaser.Math.Angle.Between(this.x, this.y, playerX, playerY);
        const distance = Phaser.Math.Distance.Between(this.x, this.y, playerX, playerY);

        this.setVelocity(Math.cos(angle) * this._speed, Math.sin(angle) * this._speed);

        if (this._isRanged && distance < 300 && fireballGroup) {
            this.shootFireball(playerX, playerY, fireballGroup);
        }
        let animKey = '';
        if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
            animKey = this.body.velocity.x > 0 ? 'enemy-right' : 'enemy-left';
        } else {
            animKey = this.body.velocity.y > 0 ? 'enemy-down' : 'enemy-up';
        }
        this.play(animKey, true);
    }

    



    damage(amount: number) {
        this._hp -= amount;
        

        if (this._hp <= 0) {
            this.destroy();
            return; 
        }
        this.flashEffect();
    }

    private flashEffect() {
        if (this._isFlashing) return;
        this._isFlashing = true;

        this.scene.tweens.add({
            targets: this,
            alpha: 0.5,          // Diventa semi-trasparente
            tint: 0xff0000,      // Diventa rosso
            duration: 50,        // Molto veloce (50ms)
            yoyo: true,          // Torna allo stato iniziale
            repeat: 2,           // Ripete un paio di volte
            onComplete: () => {
                this._isFlashing = false;
                this.clearTint(); // Rimuove il colore rosso
                this.alpha = 1;   // Ripristina l'alpha
            }
        });
    }

    private shootFireball(px: number, py: number, group: Phaser.Physics.Arcade.Group) {
        const time = this.scene.time.now;
        if (time > this._lastShot) {
            const ball = group.get() as Fireball;
            if (ball) {
                ball.fire(this.x + 16, this.y + 16, px, py);
                this._lastShot = time + this._fireRate;
            }
        }
    }


    applyKnockback(sourceX: number, sourceY: number) {
        this._isKnockedBack = true;

        // Calcola l'angolo dell'impatto
        const angle = Phaser.Math.Angle.Between(sourceX, sourceY, this.x, this.y);
        const force = 250; // Intensità del rinculo

        // Applica la velocità di sbalzo
        this.setVelocity(Math.cos(angle) * force, Math.sin(angle) * force);

        // Dopo un breve istante, riabilita l'IA
        this.scene.time.delayedCall(150, () => {
            this._isKnockedBack = false;
        });
    }
}
