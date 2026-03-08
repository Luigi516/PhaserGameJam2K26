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
    this._text = this.add.text(this.game.canvas.width / 2, this.game.canvas.height/2,  "Buonasera", {font: "70px Roboto", color:"#ff0000"});       // x, y e style ogetto di configuarazioje
    this._text.setOrigin(0.5).setInteractive().on("pointerdown", () => {
      this._text.setPosition(Phaser.Math.RND.integerInRange(0, 1280), Phaser.Math.RND.integerInRange(0, 800))
      .setText(Phaser.Math.RND.uuid());  // setta ad ogni click un testo numerico
      // Math è una estensione Phaser che mette a disposizioni metodi utili per le posizioni
      // in questo caso la scritta se cliccata viene posizionata in punti casuali del range indicato per h ed l

    }).setAlpha(0.5).setTint(0xfff, 0xffff0, 0x4563, 0x2); 
    // regola l'opacità dell'oggetto
    
    this._text.on("pointerover", () =>{
      this._text.setFontSize(100); 
      this._text.setColor("#ff0000"); 
      this._text.setStroke("#ffff", 10); 
    })
    this._text.on("pointerout", () =>{
      this._text.setFontSize(100); 
      this._text.setColor("#fff"); 
      this._text.setStroke("#ff0000", 10); 
    })





    // 1 sola volta; avvia la logica di gioco che viene poi continuata dall'update
    console.log("create di boot"); 
    // completata la funzionalità la fermiamo e avviamo la successiva 


    this.scene.stop("Boot"); // ha come argomento il nome della scena -> si può usare anche this
    // per riutilizzarlo dopo è necessario salvarlo
    this.scene.start("Preloader");  // caricamento della scena successiva 

  }

  update(time: number, delta: number): void {
    // L'UPDATE NON SERVE A
    // 1/60 di secondo
    // this._text.angle += 1
    // se vogliamo fissare un angolo del nostro ogetto 
    this._text.rotation = 45; 
    // se  non viene definito la posizione il baricentro è 0 0
  }
}


// quando viene creata una scena vi sono dei metodi utilizzati dalla libreria e vengono chiamati
// in maniera sequenziale init -> preload -> create -> update ***SEMPRE COSI***


// attenzione alla depth delle immagini. Immagini aggiunte prima sono sul livello più basso 
// .setdepth(1) -> partono da 0 e vanno in su