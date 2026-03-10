enum difficolta{
  EASY = 0, 
  MEDIUM = 1, 
  HARD = 2
}
export default class Intro extends Phaser.Scene {

  private _LevelDifficulty: difficolta; 
  private _bottoneInizio : Phaser.GameObjects.Image; 
  private _zona : Phaser.GameObjects.Image; 
  private _player: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: "Intro",
    });

  }

  preload() {
    console.log("siamo in intro");
  }

  create() {
    this.cameras.main.setBackgroundColor("#000000");

    this._bottoneInizio = this.add.image(this.game.canvas.width / 4, this.game.canvas.height / 2, "INIZIO");
    this._bottoneInizio
      .setScale(6)
      .setInteractive()
      .on("pointerdown", () =>{
        // this._LevelDifficulty = difficolta.EASY; 
        this.startGame(); 
    }); 

    this._bottoneInizio = this.add.image(this.game.canvas.width / 4, this.game.canvas.height / 1.580, "INIZIO");
    this._bottoneInizio
      .setScale(6)
      .setInteractive()
      .on("pointerdown", () =>{
        // this._LevelDifficulty = difficolta.EASY; 
        this.startGame(); 
    }); 

    this._zona = this.add.image(this.game.canvas.width - 400,  this.game.canvas.height / 2, "delimiter"); 
    this._zona 
      .setScale(12)
      .setInteractive()
      .on("pointerdown", () =>{
        this.startGameCharacter(); 
      })

      /* Titolone */

      this.anims.create({
        key: "titolo",
        frames: this.anims.generateFrameNumbers("solaris", {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}),
        frameRate: 12,
        repeat: -1
      })
      this._player = this.add.sprite(800, 290, "solaris").setScale(4.83);
      this._player.play("titolo", true);
  }

  startGame(){
    this.scene.stop(this); 
    this.scene.start("GamePlay", {difficolta: this._LevelDifficulty}); 
    this.scene.launch("Hud");
  }

  startGameCharacter(){
    this.scene.stop(this); 
    this.scene.start("Character");
  }
}

