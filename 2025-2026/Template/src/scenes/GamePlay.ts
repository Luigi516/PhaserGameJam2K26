import { GameData } from "../GameData";
import Bullet from "./Bullet"; 


enum playerState{
  IDLE, 
  RUNNING, 
  JUMPING, 
  FALLING
}

export default class GamePlay extends Phaser.Scene {

private _image1 : Phaser.GameObjects.Image; 
private _CameraPrincipale: Phaser.Cameras.Scene2D.Camera; 

private _controls: Phaser.Cameras.Controls.SmoothedKeyControl;
private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;


private _playerImage: Phaser.GameObjects.Sprite;
private _playersfizioso: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody; 
private _playerState: playerState = playerState.IDLE;

/* Stato */
private _Vita : number; 
private _Munizioni : number; 

private _ProiettiliGRP: Phaser.Physics.Arcade.Group;
private _fireRate: number = 200; 
private _lastFired: number = 0;


/* Mappa */
private _map : Phaser.Tilemaps.Tilemap; 
private _tileset : Phaser.Tilemaps.Tileset; 
private _layer : Phaser.Tilemaps.TilemapLayer; 
private _layer2 : Phaser.Tilemaps.TilemapLayer; 


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

  create(){
    this._CameraPrincipale = this.cameras.main; 
    this._cursors = this.input.keyboard.createCursorKeys();
    // const margin = 100;

    console.log("siamo in gemaplay"); 

  
    /*      ROBA PERSONAGGIO
    this._playerImage = this.add.sprite(this.game.canvas.width/2,this.game.canvas.width/2 - 200, "player", 10)
    .setOrigin(0.5, 0.5)
    .setScale(2); 


      let _animation: Phaser.Types.Animations.Animation = {
      	key: "player-running", 
        frames: this.anims.generateFrameNumbers("player", { frames: [10,11,12,13,14,15,16,17] }),
        frameRate: 10,
        yoyo: false,    // reverse
        repeat: -1       // loop continuo
      };



      this.anims.create(_animation);
	    this._playerImage.play("player-running");    // sempre lagata al personaggio



      _animation = {
        key : "player-idle", 
        frames : this.anims.generateFrameNumbers("player", { frames : [0,1,2,3,4]}), 
        frameRate: 5,
        yoyo: false,    // reverse
        repeat: -1       // loop continuo
      }
      this.anims.create(_animation); 
      this._playerImage.play("player-idle");
      */
    
    //this.add.image(this.game.canvas.width / 2, this.game.canvas.height /2 , "intro-bg").setScale(10); 

    this._playersfizioso = this.physics.add.sprite(this.game.canvas.width/2, this.game.canvas.height/2, "delimiter")
      .setScale(1) 
      .setOrigin(0.5, 0.5)
      .setCollideWorldBounds(true)
      .setPosition(70 + 100, 180 + 100); // + margin


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


    // barra stato
    this.scene.launch("Hud");
    this._Vita = 100;
    this._Munizioni = 30;

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonDown()) {
          if (this._Munizioni > 0) {
              this._Munizioni--;
              this.events.emit("AggiornaMuniz", this._Munizioni);
              // Qui chiamerai la funzione per creare fisicamente il proiettile
          }
      }
    });


  }

  preload(){

  }
  update(time: number, delta: number): void {

    const timeNow = this.time.now;
    this.GestoreMouse(this._Munizioni, timeNow, this._lastFired, this._ProiettiliGRP); 

    this._playersfizioso.setVelocity(0);

    if(this._cursors.left.isDown){
      this._playersfizioso.setVelocityX(-160); 
    } else if(this._cursors.right.isDown){
      this._playersfizioso.setVelocityX(160); 
    }

    if(this._cursors.up.isDown){
      this._playersfizioso.setVelocityY(-160); 
    } else if(this._cursors.down.isDown){
      this._playersfizioso.setVelocityY(160); 
    }
    console.log("posizione:", this._playersfizioso.x, "|", this._playersfizioso.y);


    
}




  createMap(): void{
      if(this._map != null) this._map.destroy(); 
      this._map = this.make.tilemap({key:"mappa-v1"});
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

      this._tileset = this._map.addTilesetImage("mappasperiamo", "tilesetv1"); 



      this._layer = this._map
        .createLayer("world", this._tileset, margin, margin)
        .setDepth(0);

      this._layer2 = this._map
        .createLayer("collision", this._tileset, margin, margin)
        .setDepth(1);

      this._layer2.setCollisionByProperty({
        collide : true,
      }); 

        
  }
  GestoreMouse(munizioni: number, timeNow: number, lastFired: number, proiettili: Phaser.Physics.Arcade.Group ) : void{
    if (this.input.activePointer.leftButtonDown()) {
      if (munizioni > 0 && timeNow > lastFired) {
          
          const bullet = proiettili.get() as Bullet;

          if(bullet){
              const targetX = this.input.activePointer.x + this.cameras.main.scrollX;
              const targetY = this.input.activePointer.y + this.cameras.main.scrollY;

              bullet.fire(this._playersfizioso.x, this._playersfizioso.y, targetX, targetY);

              this._Munizioni--;
              this.events.emit("AggiornaMuniz", this._Munizioni);
              this._lastFired = timeNow + this._fireRate;
          }
      }
    }
  }

    
}




