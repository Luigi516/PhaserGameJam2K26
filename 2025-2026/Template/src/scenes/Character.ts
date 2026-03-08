import { GameData } from "../GameData";


export default class Character extends Phaser.Scene{

    private _title = Phaser.GameObjects.Text;

    constructor(){
        super({
            key : "Character",
        })
    }

    preload(){


    }
    create(){
       // this._title = this.add.text(16, 16, "Seleziona personaggio", {font: "40px Calibri", color: "00000000"}); 
        console.log("scena creata correttamente"); 
    
    
    }
}