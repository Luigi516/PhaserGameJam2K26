enum difficolta{
  EASY = 0, 
  MEDIUM = 1, 
  HARD = 2
}
export default class Intro extends Phaser.Scene {

  private _image1: Phaser.GameObjects.Image;
  private _image2: Phaser.GameObjects.Image;
  private _image3: Phaser.GameObjects.Image;
  private _LevelDifficulty: difficolta; 


  constructor() {
    super({
      key: "Intro",
    });

  }

  preload() {
    console.log("siamo in intro");

  }
  create() {
    this.cameras.main.setBackgroundColor("#e65656");


    this._image1 = this.add.image(0, this.game.canvas.height / 2, "phaser")
    this._image1
      .setInteractive()
      .on("pointerdown", () =>{
        this._LevelDifficulty = difficolta.EASY; 
        this.startGame(); 
    }).setTintFill(0xeee33); 

    this._image2 = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "phaser")
    this._image2
      .setInteractive()
      .on("pointerdown", () =>{
        this._LevelDifficulty = difficolta.MEDIUM; 
        this.startGame(); 
    }).setTintFill(0xfff); 

    this._image3 = this.add.image(this.game.canvas.width, this.game.canvas.height / 2, "phaser")
    this._image3
      .setInteractive()
      .on("pointerdown", () =>{
        this._LevelDifficulty = difficolta.HARD; 
        this.startGame
    }).setTintFill(0x4444);

  }

  startGame(){
    this.scene.stop(this); 
    this.scene.start("GamePlay", {difficolta: this._LevelDifficulty}); 
    this.scene.start("Hud");
  }







  update(time: number, delta: number): void {
    this._image1.angle += 4;
    // this.scene.start("GamePlay", {level: this.LevelValue}); 

  }

}

