//importiamo la libreria phaser
import "phaser";
//importiamo le nostre scene
import Boot from "./scenes/Boot";
import Hud from "./scenes/Hud";
import Preloader from "./scenes/Preloader";
import GamePlay from "./scenes/GamePlay";
import GameOver from "./scenes/GameOver";
import Intro from "./scenes/Intro";
import Character from "./scenes/Character";
import Comando from "./scenes/Comando"; 


//importiamo GameData che contiene i valori globali del gioco
import { GameData } from "./GameData";

//il listener per l'evento load della pagina
//questo evento viene lanciato quando la pagina è stata caricata
//e tutti gli elementi della pagina sono disponibili
window.addEventListener("load", () => {


  //creiamo un oggetto di configurazione per il gioco
  //questo oggetto viene passato al costruttore di Phaser.Game
  // e contiene i parametri di configurazione del gioco
  // come il tipo di rendering, le dimensioni del canvas, le scene, ecc.
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    backgroundColor: GameData.globals.bgColor,
    parent: "my-game",
    scale: {
      mode: Phaser.Scale.FIT,
      width: GameData.globals.gameWidth,
      height: GameData.globals.gameHeight,
    },

    scene: [
      Boot,
      Hud,
      Preloader,
      Intro,
      GamePlay,
      Character, 
      Comando, 
      GameOver
    ],
    physics: {
      default: "arcade",
      arcade: { debug: GameData.globals.debug, }
    },

    input: {
      activePointers: 2,
      keyboard: true,
    },
    render: {
      pixelArt: true,
      antialias: true,
    },
  };

  //inizializziamo il gioco passando la configurazione
  const game = new Phaser.Game(config);

});


// i gameobjects sono gli elementi del gioco,  diversi tipi:
// text, image 
// sprite -> immagini animate montate in spritesheet
// tilesprite -> immagini contigue che si possono replicare -> utilizzato per il parallax
// group -> serve a raggruppare altri ogetti -> possono essere messi in collisione tra loro 
// container -> serve raggrupatori ma utili all'interfaccia es. menu a tendina agisce su tt gli elementi in esso
// GameObjectFactory contiene questi ogetti
// all'interno della scena possono esserci vari metodi