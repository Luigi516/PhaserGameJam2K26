import { GameData } from "../GameData";

export default class GamePlay extends Phaser.Scene {

private _level : number; 
private _difficolta : number; 
private _image1 : Phaser.GameObjects.Image; 

  constructor() {
    super({
      key: "GamePlay",
    });
  }


  init(data: {difficolta: number}) {
		this._difficolta =  data.difficolta; 
    if(data != undefined && data.difficolta != undefined){
      this._difficolta = data.difficolta; 
    }else {
      this._difficolta = 0
    }
	}

  create() {
    console.log("siamo in GamePlay");
    this.startGame(this._difficolta);
    
    this 
  }
  AggiornaPunteggio(){
    this.events.emit("aggiorna-punteggio", [100]); // emit prende un evento (una stringa) e in qualche altra scena sarà captato l'evento e si eseguirà del codice
  
  
  }






  startGame(difficolta: number){
    console.log("startgame "); 
    switch(difficolta){
      case 0: 
        console.log("Easy"); 
        break; 
      case 1: 
        console.log("Media"); 
        break; 
      case 2: 
        console.log("Elevata"); 
        break; 
    }
  }

  update(time: number, delta: number): void {

  }


}
