import GamePlay from "./GamePlay";

export default class Hud extends Phaser.Scene {
private _score: Phaser.GameObjects.Text; 

  constructor() {
    super({
      key: "Hud",
    });
  }


  create() {
    console.log("HUD");
    this._score = this.add.text(16, 16, "Bongiorno", {font: "40px Calibri", color: "00000000"}); 
  }
}
