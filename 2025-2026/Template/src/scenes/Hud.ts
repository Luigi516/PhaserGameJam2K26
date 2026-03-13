// Hud.ts
export default class Hud extends Phaser.Scene {
  private _Punteggio: Phaser.GameObjects.Text;
  private _Vita: Phaser.GameObjects.Text;
  private _Munizioni: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "Hud" });
  }

  create() {
    const margin = 20;
    const spacing = 100;
    const SPACE_SCENE = this.scene.get("SpaceInvaders");


    let _IconaVita = this.add.image(margin, margin, "hud-vita").setOrigin(0,0).setScale(3);
    this._Vita = this.add.text(margin + 45, margin + 12, "100", {
      font: "bold 48px yoster",
      color: "#000000"
    }).setOrigin(0.5, -0.1); 

    let _IconaMunizioni = this.add.image(margin, margin + (spacing *2), "hud-colpi").setOrigin(0, 0).setScale(3);
    this._Munizioni = this.add.text(margin + 45, margin + (spacing * 2+ 12), "40", {
      font: "bold 50px yoster",
      color: "#000000"
    }).setOrigin(0.3, -0.1);

    let _IconaEVO = this.add.image(margin, margin + spacing, "hud-evo").setOrigin(0, 0).setScale(3);
    this._Punteggio = this.add.text(margin + 45, margin + spacing + 12, "0", {
      font: "bold 50px yoster",
      color: "#000000"
    }).setOrigin(0.4, -0.1);

    this.events.on("modalita-spazio", (isSpace: boolean) => {
        if (isSpace) {
            _IconaVita.setVisible(false);
            this._Vita.setVisible(false);
            _IconaMunizioni.setVisible(false);
            this._Munizioni.setVisible(false);
        } else {
            _IconaVita.setVisible(true);
            this._Vita.setVisible(true);
            _IconaMunizioni.setVisible(true);
            this._Munizioni.setVisible(true);
        }
    });

    const GPLAY = this.scene.get("GamePlay");

    GPLAY.events.on("AggiornaVita", (p: number) => {
      this._Vita.setText(p.toString());
    });

    GPLAY.events.on("AggiornaMuniz", (p: number) => {
      this._Munizioni.setText(p.toString());
    });

    GPLAY.events.on("AggiornaPunti", (p: number) => {
      this._Punteggio.setText(p.toString());
    });

    SPACE_SCENE.events.on("AggiornaPuntiEvo", (punti: number) => {
      this._Punteggio.setText(punti.toString());
      this._Punteggio.setTint(0xffff00);
      this.time.delayedCall(200, () => { this._Punteggio.clearTint(); });
    });
  }
}