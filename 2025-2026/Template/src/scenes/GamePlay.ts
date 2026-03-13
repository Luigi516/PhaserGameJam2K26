import { GameData } from "../GameData";
import Bullet from "./Bullet"; 
import Enemy from "./Enemy";
import Fireball from "./Fireball";
import SpaceInvaders from "./SpaceInvaders";


export default class GamePlay extends Phaser.Scene {

private _CameraPrincipale: Phaser.Cameras.Scene2D.Camera; 
private _controls: Phaser.Cameras.Controls.SmoothedKeyControl;
private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;


private _playerImage: Phaser.GameObjects.Sprite;
private _playersfizioso: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody; 

/* Stato */
private _Vita : number; 
private _Munizioni : number; 
private _isInvulnerable : boolean = false; 
private _ProiettiliGRP: Phaser.Physics.Arcade.Group;
private _fireRate: number = 200; 
private _lastFired: number = 0;


/* Mappa */
private _map : Phaser.Tilemaps.Tilemap; 
private _tileset : Phaser.Tilemaps.Tileset; 
private _layer : Phaser.Tilemaps.TilemapLayer; 
private _layer2 : Phaser.Tilemaps.TilemapLayer; 
private _layerTrigger : Phaser.Tilemaps.TilemapLayer; 

private _pistola: Phaser.GameObjects.Sprite;


// nemici
private _nemiciGRP: Phaser.Physics.Arcade.Group;
private _fireballsGRP: Phaser.Physics.Arcade.Group;

/* Gestione Aggiuntiva */
private _isRitornoDalComando: boolean = false;

/*  constructor() {
    super({
      key: "GamePlay",
    });
  }

  init(){


  }


  create(){
    this._CameraPrincipale = this.cameras.main; 

    this._cursors = this.input.keyboard.createCursorKeys();

    this._CameraPrincipale.setSize(700, 500).setBackgroundColor(0xff00ff)
    console.log(this._CameraPrincipale); 


    // this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, "phaser");
    // this.add.sprite(this.game.canvas.width, this.game.canvas.height / 2 + 200, "phaser");
    // this.add.sprite(this.game.canvas.width * 2, this.game.canvas.height / 2, "phaser");
  
    this.cameras.main.setBounds(
      0, 
      0, 
      this.game.canvas.width * 2, //laghezza
      this.game.canvas.height * 2 //altezza
    );

    this._cursors = this.input.keyboard.createCursorKeys();

    const controlConfig: Phaser.Types.Cameras.Controls.SmoothedKeyControlConfig = {
      camera: this._CameraPrincipale,
      left: this._cursors.left,
      right: this._cursors.right,
      up: this._cursors.up,
      down: this._cursors.down,
      acceleration: 0.06, //l'accelerazione
      drag: 0.0005, //il rallentamento quando fermiamo il movimento
      maxSpeed: 1.0 //la velocità massima
    };
    this._playerImage = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "phaser").setScale(2);
    this._controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    this._cursors = this.input.keyboard.createCursorKeys();
    this._CameraPrincipale.setBounds(
      0, //x
      0, //y
      this.game.canvas.width * 2, //width
      this.game.canvas.height * 2 //height

	  );
    this._CameraPrincipale.startFollow(this._playerImage, true, 0.05, 0.05);

	  this._CameraPrincipale.stopFollow();


  }

  preload(){
    console.log("preloading Gameplay")
    console.log("width: ", )
  }



  update(time: number, delta: number): void {
	  if (this._cursors.left.isDown) {
      		//sottraiamo 10px alla x del player
		  this._playerImage.x -= 10;
    }
        //se il tasto cursore right è premuto
    else if (this._cursors.right.isDown) {
            //aggiungiamo 10px alla x del player
      this._playerImage.x += 10;
    }
        //se il tasto cursore up è premuto
    if (this._cursors.up.isDown) {
            //sottraiamo 10px alla y del player
      this._playerImage.y -= 10;
    }
        //se il tasto cursore down è premuto
    else if (this._cursors.down.isDown) {
            //aggiungiamo 10px alla y del player
      this._playerImage.y += 10;
    }
}
}*/

  constructor() {
    super({
      key: "GamePlay",
    });
  }
  init(data: any) {
    if (data && data.spawnInvasori) {
        this._isRitornoDalComando = true;
    } else {
        this._isRitornoDalComando = false;
    }
  }
  private spawnInvasoriInBase() {
      for (let i = 0; i < 2; i++) {
          const nemico = new Enemy(this, 400 + (i * 100), 400, "enemy_texture");
          this._nemiciGRP.add(nemico);
      }
  }

  create(){

    this.scene.bringToTop("Hud");
    this.createPlayerAnimations();
    this.createEnemyAnimations()

    this._CameraPrincipale = this.cameras.main; 
    this.cameras.main.setBackgroundColor(0x000);
    this._cursors = this.input.keyboard.createCursorKeys();
    console.log("siamo in gemaplay"); 

    this._playersfizioso = this.physics.add.sprite(this.game.canvas.width/2, this.game.canvas.height/2, "solarplayer")
      .setScale(1) 
      .setOrigin(0.5, 0.5)
      .setCollideWorldBounds(true)
      .setPosition(400, 318); // + margin
    this._playersfizioso.play('idle'); 

    this._pistola = this.add.sprite(0, 0, "pistola");
    this._pistola.setDepth(3).setScale(0.5); 
    this._pistola.setOrigin(-1, 0.5);


    this._CameraPrincipale.setZoom(4);
    this._cursors = this.input.keyboard.createCursorKeys(); 


    this.time.addEvent({
      delay:100, 
      callback: () => { }, callbackScope: this
    })
    this._CameraPrincipale.startFollow(this._playersfizioso, true, 0.05, 0.05); 

    this.createMap(); 
    
    //this.setupObjects(); 
    this._layer.setDepth(0); 
    this._layer2.setDepth(1).setAlpha(0);
    this._playersfizioso.setDepth(2);
    this.physics.add.collider(this._playersfizioso, this._layer2);


    this._ProiettiliGRP = this.physics.add.group({
      classType: Bullet,
      maxSize: 30,
      runChildUpdate: true
    });
    this.physics.add.collider(this._ProiettiliGRP, this._layer2, (proiettile: any) => {
      proiettile.disableBody(true, true);
    });

    this.spawnEnemies();
    console.log("qua");
    this._Vita = 100;
    this._Munizioni = 300;

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonDown()) {
          if (this._Munizioni > 0) {
              this._Munizioni--;
              this.events.emit("AggiornaMuniz", this._Munizioni);
          }
      }
    });

    this.anims.create({
      key: 'propulsore-sheet',
      frames: this.anims.generateFrameNumbers('propulsore', {frames : [0, 1, 2, 3]}), 
      frameRate: 12,
      repeat: -1 // Loop infinito
    });

    const motoreSup = this.add.sprite(140, 283, 'propulsore');
    motoreSup.setDepth(1); 
    motoreSup.play('propulsore-sheet', true);

    const motoreInf = this.add.sprite(140, 363, "propulsore"); 
    motoreInf.setDepth(1).play("propulsore-sheet", true);


     this.anims.create({
        key: "bgplay",
        frames: this.anims.generateFrameNumbers("sfondoplay", {frames: [0, 1, 2, 3, 4, 5, 6, 7]}),
        frameRate: 12,
        repeat: -1
      })
      const bo = this.add.sprite(480, 350, "sfondoplay").setScale(2).setDepth(-3);
      bo.play("bgplay", true);

    

    this._fireballsGRP = this.physics.add.group({
      classType: Fireball,
      maxSize: 10,
      runChildUpdate: true
    });

    // se il nemico mi colpisce o mi picchia toglie 10 sti nabbi
    this.physics.add.overlap(this._playersfizioso, this._fireballsGRP, (player, ball) => {
      const fb = ball as any; 
      this.playerHit(10, {x: fb.x, y: fb.y}); 
      fb.disableBody(true, true)
    }, null, this);


    this.physics.add.collider(this._playersfizioso, this._nemiciGRP, (player, enemy) => {
      const e = enemy as Enemy;
      this.playerHit(10, { x: e.x, y: e.y });
    }, null, this);

    /* Quello che deve succede quando torno da spaceinv */
    this.input.keyboard.clearCaptures();
    this._cursors = this.input.keyboard.createCursorKeys();
    this.physics.resume();

    if (this._isRitornoDalComando) {
        // Se torniamo dallo spazio, facciamo spawnare SOLO 3 nemici
        this.spawnTreInvasori();
    }
}


private spawnTreInvasori() {
    this._nemiciGRP.clear(true, true);
    for (let i = 0; i < 3; i++) {
        let offsetX = (i === 1) ? -20 : 20;
        let offsetY = (i === 2) ? -20 : 20;

        const nemico = new Enemy(this, this._playersfizioso.x + offsetX, this._playersfizioso.y + offsetY, "enemy_texture");
        this._nemiciGRP.add(nemico);
    }
}


private playerHit(damage: number, source?: { x: number, y: number }) {
    if (this._isInvulnerable) return;

    this._Vita -= damage;
    this._isInvulnerable = true;

    // HUD aggiornamento
    this.events.emit("AggiornaVita", this._Vita);

    if (source) {
        const angle = Phaser.Math.Angle.Between(source.x, source.y, this._playersfizioso.x, this._playersfizioso.y);
        this._playersfizioso.setVelocity(Math.cos(angle) * 300, Math.sin(angle) * 300);
    }

    // Lampeggio tattico di debolezza 
    this.tweens.add({
        targets: this._playersfizioso,
        alpha: 0,
        duration: 100,
        yoyo: true,
        repeat: 5, // 1seccc
        onComplete: () => {
            this._playersfizioso.alpha = 1;
            this._isInvulnerable = false;
        }
    });

    if (this._Vita <= 0) {  // HO PERSO 
        console.log("GAME OVER");
    }
}

private createPlayerAnimations(): void {
  // Definiamo le righe per ogni direzione basandoci sullo spritesheet
  const directions = [
      { key: 'walk-n',  row: 0 }, 
      { key: 'walk-ne', row: 0 }, 
      { key: 'walk-e',  row: 3 }, 
      { key: 'walk-se', row: 3 }, 
      { key: 'walk-s',  row: 1 }, 
      { key: 'walk-sw', row: 2 }, 
      { key: 'walk-w',  row: 2 }, 
      { key: 'walk-nw', row: 0 }  
  ];

  directions.forEach(dir => {
      this.anims.create({
          key: dir.key,
          frames: this.anims.generateFrameNumbers('solarplayer', { 
              start: dir.row * 8, 
              end: (dir.row * 8) + 7 
          }),
          frameRate: 10,
          repeat: -1
      });
  });
  this.anims.create({
      key: 'idle',
      frames: [{ key: 'solarplayer', frame: 40 }],
      frameRate: 1
  });
}
private createEnemyAnimations(): void {
    const enemyDirections = [
        { key: 'enemy-down',  row: 0 },
        { key: 'enemy-left',  row: 1 },
        { key: 'enemy-right', row: 2 },
        { key: 'enemy-up',    row: 3 }
    ];

    enemyDirections.forEach(dir => {
        this.anims.create({
            key: dir.key,
            frames: this.anims.generateFrameNumbers('nemicobase', { 
                start: dir.row * 4, 
                end: (dir.row * 4) + 3 
            }),
            frameRate: 8,
            repeat: -1
        });
    });
}


private spawnEnemies(): void {
    // Inizializziamo il gruppo in modo semplice
    this._nemiciGRP = this.physics.add.group();

    // Prendiamo il layer dal file JSON della mappa
    const enemyLayer = this._map.getObjectLayer('enemies');
    
    if (enemyLayer && enemyLayer.objects) {
        enemyLayer.objects.forEach(obj => {
            const nemico = new Enemy(this, obj.x + 100, obj.y + 100, "nemicobase");
            this._nemiciGRP.add(nemico);
        });
    }
    this.physics.add.collider(this._nemiciGRP, this._layer2); 
    this.physics.add.overlap(this._ProiettiliGRP, this._nemiciGRP, this.damageEnemy, null, this);

    enemyLayer.objects.forEach((obj, index) => {
        const isRanged = index % 2 !== 0; 
        const nemico = new Enemy(this, obj.x + 100, obj.y + 100, "nemicobase", isRanged);
        this._nemiciGRP.add(nemico);
    });
}

private damageEnemy(proiettile: any, nemico: any): void {
    const b = proiettile as any;
    const e = nemico as Enemy;

    b.disableBody(true, true);
    e.damage(1); 
    
    if (e.active && e.applyKnockback) {
        e.applyKnockback(b.x, b.y);
    }
}





  preload(){

  }
  update(time: number, delta: number): void {

    const speed = 160;
    let vx = 0;
    let vy = 0;
    let animKey = 'idle';

    if (this._cursors.left.isDown) vx = -speed;
    else if (this._cursors.right.isDown) vx = speed;

    if (this._cursors.up.isDown) vy = -speed;
    else if (this._cursors.down.isDown) vy = speed;

    if (vx === 0 && vy < 0) animKey = 'walk-n';
    else if (vx > 0 && vy < 0) animKey = 'walk-ne';
    else if (vx > 0 && vy === 0) animKey = 'walk-e';
    else if (vx > 0 && vy > 0) animKey = 'walk-se';
    else if (vx === 0 && vy > 0) animKey = 'walk-s';
    else if (vx < 0 && vy > 0) animKey = 'walk-sw';
    else if (vx < 0 && vy === 0) animKey = 'walk-w';
    else if (vx < 0 && vy < 0) animKey = 'walk-nw';

    this._playersfizioso.setVelocity(vx, vy);

    if (vx !== 0 && vy !== 0) {
        this._playersfizioso.body.velocity.normalize().scale(speed);
    }

    if (animKey !== 'idle') {
        this._playersfizioso.anims.play(animKey, true);
    } else {
        this._playersfizioso.anims.play('idle');
    }

    const worldX = this._playersfizioso.x;
    const worldY = this._playersfizioso.y;
    const tile = this._map.getTileAtWorldXY(worldX, worldY, true, this._CameraPrincipale, "triggers");
    if (tile && tile.properties && tile.properties.COMANDO === true) {
        this.AvviaComando();
    }

    this._pistola.setPosition(this._playersfizioso.x, this._playersfizioso.y);

    const mouseX = this.input.activePointer.worldX;
    const mouseY = this.input.activePointer.worldY;

    const angle = Phaser.Math.Angle.Between(
        this._playersfizioso.x, 
        this._playersfizioso.y, 
        mouseX, 
        mouseY
    );

    this._pistola.rotation = angle;

    if (mouseX < this._playersfizioso.x) {
        this._pistola.flipY = true;
    } else {
        this._pistola.flipY = false;
    }
    
    this.GestoreMouse(this._Munizioni, this.time.now, this._lastFired, this._ProiettiliGRP);

    if (this._nemiciGRP && this._nemiciGRP.getLength() > 0) {
      this._nemiciGRP.children.iterate((nemico: any) => {
          const e = nemico as Enemy;
          if (e && e.active && e.updateAI) {
              e.updateAI(this._playersfizioso.x, this._playersfizioso.y, this._fireballsGRP);
          }
          return true;
      });
    }

  }


  createMap(): void{
      if(this._map != null) this._map.destroy(); 
      this._map = this.make.tilemap({key:"mappa-astronave"});
      const margin = 100; 


      this._CameraPrincipale.setBounds(
        0, 
        0, 
        this._map.widthInPixels + (margin * 2),
        this._map.heightInPixels + (margin * 2), 
      ); 


      this.physics.world.setBounds(
        margin, 
        margin, 
        this._map.widthInPixels,
        this._map.heightInPixels
      );

      this._tileset = this._map.addTilesetImage("paola", "tileset-astronave"); 



      this._layer = this._map
        .createLayer("world", this._tileset, margin, margin)
        .setDepth(0);

      this._layer2 = this._map
        .createLayer("collision", this._tileset, margin, margin)
        .setDepth(1);

      this._layer2.setCollisionByProperty({
        collide : true,
      }); 

      this._layerTrigger = this._map
        .createLayer("triggers", this._tileset, margin, margin)
        .setDepth(2) 
        .setAlpha(0.5);

  }
  GestoreMouse(munizioni: number, timeNow: number, lastFired: number, proiettili: Phaser.Physics.Arcade.Group ) : void{
    if (this.input.activePointer.leftButtonDown()) {
      if (munizioni > 0 && timeNow > lastFired) {
          
          const bullet = proiettili.get() as Bullet;

          if(bullet){
              const distanzaPunta = 25;
              const targetX = this.input.activePointer.x + this.cameras.main.scrollX;
              const targetY = this.input.activePointer.y + this.cameras.main.scrollY;

              const puntaX = this._playersfizioso.x + Math.cos(this._pistola.rotation) * distanzaPunta;
              const puntaY = this._playersfizioso.y + Math.sin(this._pistola.rotation) * distanzaPunta;


              bullet.fire(puntaX, puntaY, targetX, targetY);

              this._Munizioni--;
              this.events.emit("AggiornaMuniz", this._Munizioni);
              this._lastFired = timeNow + this._fireRate;
          }
      }
    }
  }
  AvviaComando(): void{
    console.log("Trigger di comando attivato: Avvio Battaglia Spaziale!");
    this.scene.pause(); 
    this.scene.get("Hud").events.emit("modalita-spazio", true);
    this.scene.launch("SpaceInvaders"); 
  }
}




