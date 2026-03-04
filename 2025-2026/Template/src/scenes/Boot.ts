//viene importato un riferimento a gamedata per poter usare le variabili globali
import { GameData } from "../GameData"; //importare modulo da altro file

//creiamo la classe Boot che estende Phaser.Scene
export default class Boot extends Phaser.Scene {    // boot è figlia di phaser.scene da cui eredita le funzionalità


  private _text: Phaser.GameObjects.Text;
  //il costruttore richiama il costruttore della classe Phaser.Scene
  //si usa il metodo super per richiamare il costruttore della classe Phaser.Scene

  constructor() {   // richiama la classe padre
    // il metodo super prende come parametro un oggetto con una chiave key che ha come valore il nome della scena
    super({
      key: "Boot",    //attributo necessario, i due nomi devono coincidere
    });

  }

  //il metodo init viene chiamato all'inizio della scena
  //in questo caso non esegue nessuna operazione
  init() {
    console.log("init di boot")     // non facciamo nnt
  }
  //il metodo preload viene chiamato dopo il metodo init
  //nel metodo preload vengono caricati gli assets che servono per il caricamento della scena successiva
  preload() {

    console.log("preload di boot")
    this.cameras.main.setBackgroundColor("#ffffff");      // settiamo sfondo 
    this.load.image("logo", "assets/images/phaser.png");    // settiamo immagine load è un metodo ereditato
                                                            // chiave + percorso 
  }

  //il metodo create viene chiamato dopo il metodo preload
  create() {
    // 1 sola volta; avvia la logica di gioco che viene poi continuata dall'update
    console.log("create di boot"); 


    // completata la funzionalità la fermiamo e avviamo la successiva 
    this.scene.stop("Boot"); // ha come argomento il nome della scena -> si può usare anche this
    this.scene.start("Preloader");  // caricamento della scena successiva 

  }

  update(time: number, delta: number): void {
    // L'UPDATE NON SERVE A UN CAZZO QUA
    // 1/60 di secondo
  }
}


// quando viene creata una scena vi sono dei metodi utilizzati dalla libreria e vengono chiamati
// in maniera sequenziale init -> preload -> create -> update ***SEMPRE COSI***
