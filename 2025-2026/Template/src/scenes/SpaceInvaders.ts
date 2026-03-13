import { GameData } from "../GameData"; 

export default class SpaceInvaders extends Phaser.Scene {
    private _astronavesfiziosa : Phaser.Physics.Arcade.Sprite; 
    private _cursors : Phaser.Types.Input.Keyboard.CursorKeys; 

    // fisica a gruppi 
    private _proiettilisfiziosi : Phaser.Physics.Arcade.Group; 
    private _nemici : Phaser.Physics.Arcade.Group; 
    private _proiettilinemici : Phaser.Physics.Arcade.Group; 

    // navicella vita
    private _barravitaBG : Phaser.GameObjects.Graphics; 
    private _barravitaRiempi : Phaser.GameObjects.Graphics; 
    private _astronavevita : number = 100; 
    private readonly _massimavita : number = 100; 


    // affuoco
    private _lastFired : number = 0; 
    private _fireRate : number = 150;

    // stats
    private _puntiEvo: number = 0;
    private _nemiciSpawnati: number = 0;
    private readonly _maxNemici: number = 15;
    private _nemiciRimasti: number = 15;
    private _iconaEvo: Phaser.GameObjects.Image;
    private _testoEvo: Phaser.GameObjects.Text;
    
    constructor() {
        super({key : "SpaceInvaders"}); 
    }

    create(){
        console.log("siamo arrivati"); 
        const width = this.game.canvas.width; 
        const height = this.game.canvas.height; 
        this.cameras.main.setBackgroundColor(0x000); 

        const evoX = 20;
        const evoY = 60;

        this.anims.create({
            key : 'naveazione', 
            frames : this.anims.generateFrameNumbers('naveTerzaPersona', {frames: [0, 1, 2, 3, 4, 5]}),
            frameRate: 15, 
            repeat : -1,
        })
        this._astronavesfiziosa = this.physics.add.sprite(150, height/2, "naveTerzaPersona")
            .setScale(0.4)
            .setCollideWorldBounds(true); 
        this._astronavesfiziosa.play('naveazione');

        this._cursors = this.input.keyboard.createCursorKeys(); 
        this._proiettilisfiziosi = this.physics.add.group({maxSize : 50}); 
        this._proiettilinemici = this.physics.add.group({maxSize: 50}); 
        this._nemici = this.physics.add.group(); 

        this._barravitaBG = this.add.graphics().setDepth(100); 
        this._barravitaRiempi = this.add.graphics().setDepth(100); 
        this.disegnaBarraVita();

        this.time.addEvent({
            delay : 1500, 
            callback: this.spawnEnemy, 
            callbackScope: this,
            loop: true, 
        }); 

        


        this.physics.add.overlap(this._proiettilisfiziosi, this._nemici, this.colpisciNemico, null, this); 
        this.physics.add.overlap(this._proiettilinemici, this._astronavesfiziosa, this.colpisciPlayer, null, this);
        this.physics.add.overlap(this._nemici, this._astronavesfiziosa, this.schiantoPlayer, null, this);

        this.physics.add.overlap(this._proiettilisfiziosi, this._proiettilinemici, (proiettileAmico, proiettileNemico) => {proiettileAmico.destroy(); proiettileNemico.destroy();}, null, this);
    }
    update(time:number, delta:number){

        if(this._astronavevita <= 0){
            return; 
        }
        const speed = 300; 
        let vx = 0; 
        let vy = 0; 

        if(this._cursors.left.isDown) vx = -speed; 
        else if (this._cursors.right.isDown) vx = speed; 

        if(this._cursors.up.isDown) vy = -speed; 
        else if(this._cursors.down.isDown) vy = speed; 

        this._astronavesfiziosa.setVelocity(vx, vy); 

        const puntatore = this.input.activePointer; 
        const angolo = Phaser.Math.Angle.Between(this._astronavesfiziosa.x, this._astronavesfiziosa.y, puntatore.x, puntatore.y);
        this._astronavesfiziosa.rotation = angolo;

        // fuocoamico
        if(puntatore.leftButtonDown() && time > this._lastFired){
            this.spara(this._astronavesfiziosa.x, this._astronavesfiziosa.y, angolo); 
            this._lastFired = time + this._fireRate; 
        }

    }




    // funzioni di gestione un po' miste

    private spara(x: number, y: number, angle: number) {
        const bulletSpeed = 900; 
        
        // Calcoliamo la punta in base all'angolo (distanza dal centro della navicella)
        const distanzaPunta = 180; // Regola questo valore se il dardo esce troppo o troppo poco
        const puntaX = x + Math.cos(angle) * distanzaPunta;
        const puntaY = y + Math.sin(angle) * distanzaPunta;

        // Colpo centrale
        this.creaProiettile(puntaX, puntaY, angle, bulletSpeed);
        if (this._puntiEvo >= 70) {
            const deviazione = 0.25; 
            this.creaProiettile(puntaX, puntaY, angle - deviazione, bulletSpeed); 
            this.creaProiettile(puntaX, puntaY, angle + deviazione, bulletSpeed); 
        }
    }

    private creaProiettile(x: number, y: number, angle: number, speed: number) {
        const bullet = this._proiettilisfiziosi.get() as Phaser.Physics.Arcade.Sprite;
        
        if (bullet) {
            bullet.enableBody(true, x, y, true, true);
            bullet.setTexture("bullet");
            // Se il dardo è orizzontale di default, potresti dover aggiungere + Math.PI/2 all'angolo qui sotto
            bullet.setRotation(angle); 
            bullet.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

            // Timer per non intasare la memoria
            this.time.delayedCall(1500, () => {
                if (bullet.active) bullet.disableBody(true, true);
            });
        }
    }



    private spawnEnemy() {
        if (this._nemiciSpawnati >= this._maxNemici) return;
        this._nemiciSpawnati++;

        const height = this.game.canvas.height;
        const width = this.game.canvas.width;
        const startY = Phaser.Math.Between(100, height - 100);

        const enemy = this._nemici.create(width + 50, startY, "navenemica") as Phaser.Physics.Arcade.Sprite;
        enemy.setTint(0xff5555);
        enemy.setVelocityX(Phaser.Math.Between(-150, -250));

        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 2000), // Spara ogni 1-2 sec
            callback: () => {
                if (enemy.active && this._astronavevita > 0) {
                    this.sparonemico(enemy);
                }
            },
            loop: true
        });
    }


    private sparonemico(enemy: Phaser.Physics.Arcade.Sprite) {
        const bullet = this._proiettilinemici.get() as Phaser.Physics.Arcade.Sprite;
        if (bullet) {
            bullet.enableBody(true, enemy.x, enemy.y, true, true);
            bullet.setTexture("fireball");
            const angolo = Phaser.Math.Angle.Between(enemy.x, enemy.y, this._astronavesfiziosa.x, this._astronavesfiziosa.y);
            bullet.setRotation(angolo);
            
            const bulletSpeed = 300;
            bullet.setVelocity(Math.cos(angolo) * bulletSpeed, Math.sin(angolo) * bulletSpeed);

            this.time.delayedCall(3000, () => {
                if (bullet.active) bullet.disableBody(true, true);
            });
        }
    }

    private colpisciNemico(bullet: any, enemy: any) {
        bullet.disableBody(true, true);
        this._puntiEvo += 15;
        this._nemiciRimasti--;


        this.events.emit("AggiornaPuntiEvo", this._puntiEvo);
        const txt = this.add.text(enemy.x, enemy.y, "+15 EVO", {
            fontFamily: "yoster", 
            fontSize: "20px",
            color: "#ffff00"
        }).setOrigin(0.5);

        this.tweens.add({
            targets: txt,
            y: txt.y - 50,
            alpha: 0,
            duration: 800,
            onComplete: () => txt.destroy()
        });

        this.tweens.add({
            targets: enemy,
            scale: 1.5,
            alpha: 0,
            duration: 100,
            onComplete: () => {
                enemy.destroy();
                if (this._nemiciRimasti <= 0) {
                    this.mostraMenuFinale();
                    console.log("vinto");
                }
            }
        });
    }

    private colpisciPlayer(player: any, bullet: any) {
        bullet.disableBody(true, true);
        this.subisciDanno(10);
    }

    private schiantoPlayer(player: any, enemy: any) {
        enemy.destroy();
        this.subisciDanno(20);
    }


    private subisciDanno(danno: number) {
        this._astronavevita -= danno;
        if (this._astronavevita < 0) this._astronavevita = 0;
        this.disegnaBarraVita();

        this._astronavesfiziosa.setTint(0xff0000);
        this.tweens.add({
            targets: this._astronavesfiziosa,
            alpha: 0.5,         
            yoyo: true,      
            repeat: 3,          
            duration: 80,        
            onComplete: () => {
                this._astronavesfiziosa.clearTint(); 
                this._astronavesfiziosa.alpha = 1;   
            }
        });

        if (this._astronavevita <= 0) {
            this._astronavesfiziosa.disableBody(true, true);
            this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2, "NAVICELLA DISTRUTTA!", { fontSize: "60px", color: "#ff0000" }).setOrigin(0.5);
        }
    }
    private disegnaBarraVita() {
        this._barravitaBG.clear();
        this._barravitaRiempi.clear();

        const x = 20;
        const y = 20;
        const width = 300;
        const height = 25;


        this._barravitaBG.fillStyle(0x000000);
        this._barravitaBG.fillRect(x, y, width, height);


        let color = 0x00ff00; 
        if (this._astronavevita < 50) color = 0xffff00; 
        if (this._astronavevita < 25) color = 0xff0000; 

        const currentWidth = (this._astronavevita / this._massimavita) * width;
        
        this._barravitaRiempi.fillStyle(color);
        this._barravitaRiempi.fillRect(x + 2, y + 2, currentWidth - 4, height - 4);
    }



    private mostraMenuFinale() {
        const width = this.game.canvas.width;
        const height = this.game.canvas.height;

        const overlay = this.add.graphics();
        overlay.fillStyle(0x000000, 0.7);
        overlay.fillRect(0, 0, width, height);
        overlay.setDepth(1000);

        const btnBack = this.add.image(width / 2, height / 2 - 80, "btn-back")
            .setInteractive({ useHandCursor: true })
            .setDepth(1001)
            .setScale(0);

        const btnNext = this.add.image(width / 2, height / 2 + 80, "btn-next")
            .setInteractive({ useHandCursor: true })
            .setDepth(1001)
            .setScale(0);
        this.tweens.add({
            targets: [btnBack, btnNext],
            scale: 1,
            duration: 500,
            ease: 'Back.easeOut'
        });
        btnBack.on("pointerdown", () => {
            this.scene.get("Hud").events.emit("modalita-spazio", false);
            this.scene.start("GamePlay", { missioneCompletata: true, spawnInvasori: true });
            this.scene.stop(this);
        });

        btnNext.on("pointerdown", () => {
            this.scene.start("ScenaSuccessiva"); 
        });

        [btnBack, btnNext].forEach(btn => {
            btn.on("pointerover", () => btn.setTint(0xaaaaaa));
            btn.on("pointerout", () => btn.clearTint());
        });
    }
    
}

