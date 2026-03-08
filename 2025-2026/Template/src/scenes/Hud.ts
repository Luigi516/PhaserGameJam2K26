import GamePlay from "./GamePlay";

export default class Hud extends Phaser.Scene {


private _Punteggio: Phaser.GameObjects.Text; 
private _Vita: Phaser.GameObjects.Text;
private _Munizioni: Phaser.GameObjects.Text; 

  constructor() {
    super({
      key: "Hud",
    });
  }


  create() {
    console.log("-> HUD"); 
    this._Vita = this.add.text(20, 20, "VITA: 100", {font:"20px Calibri", color: "rgb(255, 0, 0)"}); 
    this._Munizioni = this.add.text(20, 55, "COLPI: 40", {font:"20px Calibri", color: "rgb(255, 0, 0)"}); 
    this._Punteggio = this.add.text(20, 90, "PUNTI: 0", { font: "25px calibri", color: "#ffff00" });


    const backBtn = this.add.text(this.game.canvas.width - 150, 20, "INDIETRO", { font: "20px Arial", color: "#ff0000" })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.stop("GamePlay");
        this.scene.start("Intro");
      });


      const GPLAY = this.scene.get("GamePlay");
      GPLAY.events.on("AggiornaVita", (vita: number) => {
        this._Vita.setText("VITE: " + vita);
      });
      GPLAY.events.on("AggiornaMuniz", (munizioni : number) =>{
        this._Munizioni.setText("COLPI: "+ munizioni); 
      });
  }
}
