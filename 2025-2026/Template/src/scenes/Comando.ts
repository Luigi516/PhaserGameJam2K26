import { GameData } from "../GameData";

export default class Comando extends Phaser.Scene {
    private _targetCursor: Phaser.GameObjects.Image;
    private _nemiciColpiti: number = 0;
    private _areaCielo: Phaser.Geom.Rectangle;
    private _groupNemici: Phaser.GameObjects.Group;

    constructor() {
        super({ key: "Comando" });
    }

    create() {
        console.log("Inizio sequenza comando");
        this.input.setDefaultCursor('none');
        this._targetCursor = this.add.image(0, 0, "mirino").setDepth(100);
        const width = this.game.canvas.width;
        const height = this.game.canvas.height;
        const cieloHeight = height * 0.75;


        const plancia = this.add.image(0, height, "grafica_comando")
        .setOrigin(0, 1)
        .setDepth(10);

        plancia.displayWidth = width;
        plancia.displayHeight = height * 0.25;

        this._areaCielo = new Phaser.Geom.Rectangle(0, 0, width, cieloHeight);

        // this.add.image(0, 0, "spazio").setOrigin(0).setDisplaySize(width, cieloHeight);
        this._groupNemici = this.add.group();
        this.time.addEvent({
            delay: 1200,
            callback: this.spawnNavicella,
            callbackScope: this,
            repeat: 4 
        });
        
        this.add.text(width / 2, height - 50, "SISTEMI DI PUNTAMENTO ATTIVI", {
            font: "20px Arial",
            color: "#00ff00"
        }).setOrigin(0.5);
    }

    private spawnNavicella() {
        const x = Phaser.Math.Between(50, this._areaCielo.width - 50);
        const y = Phaser.Math.Between(50, this._areaCielo.height - 50);
        const nave = this.add.sprite(x, y, "navicella_nemica").setInteractive();
        nave.setScale(0);
        
        this.tweens.add({
            targets: nave,
            scale: 1.5,
            duration: 1000,
            ease: 'Back.easeOut'
        });

        const maskShape = this.make.graphics({});
        maskShape.fillRect(0, 0, this._areaCielo.width, this._areaCielo.height);
        nave.setMask(maskShape.createGeometryMask());

        nave.on("pointerdown", () => {
            this.distruggiNave(nave);
        });

        this._groupNemici.add(nave);
    }

    private distruggiNave(nave: Phaser.GameObjects.Sprite) {
        nave.setTint(0xff0000);
        this.tweens.add({
            targets: nave,
            alpha: 0,
            scale: 2,
            duration: 200,
            onComplete: () => {
                nave.destroy();
                this._nemiciColpiti++;
                if (this._nemiciColpiti >= 5) {
                    this.concludiSequenza();
                    this._nemiciColpiti = 0; 
                }
            }
        });
    }

    update() {
        this._targetCursor.x = this.input.x;
        this._targetCursor.y = this.input.y;
    }

    private concludiSequenza() {
    this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2, "AREA PULITA!", {
        fontSize: "60px", color: "#315e31"
    }).setOrigin(0.5);

    this.time.delayedCall(2000, () => {
        const worldScene = this.scene.get("GamePlay") as any;
        if (worldScene._playersfizioso) {
            worldScene._playersfizioso.x -= 60; 
        }

        this.input.setDefaultCursor('default');
        this.scene.stop();
        worldScene.scene.resume();
        
        if (this.scene.get("Hud")) {
            this.scene.get("Hud").scene.wake();
        }
    });
}
}