export let GameData: gameData = {
  globals: {
    gameWidth: 1920,
    gameHeight: 1080,
    bgColor: "#8f8f8f",
    debug: false
  },

  preloader: {      // qui carichiamo i data di ciascuna scena
    bgColor: "#000000",
    image: "logo",      // corrisponde alla key dell'immagine precaricata in boot
    imageX: 1920 / 2,
    imageY: 1080 / 2,
    loadingText: "Sto caricando...",
    loadingTextFont: "roboto",
    loadingTextComplete: "***",
    loadingTextY: 800,
    loadingBarColor: 0x000,
    loadingBarY: 630,
  },

  spritesheets: [
    { name: "player", path: "assets/images/player.png", width: 82, height: 70, frames: 50 },
    { name: "solaris", path: "assets/images/solaris.png", width: 251, height: 105, frames: 14},
    { name: "tilemap-extruded", path: "assets/map/tilemap-extruded.png", width: 32, height: 32, spacing: 2},

    { 
      name: "sfondoplay", 
      path: "assets/images/background.png", 
      width: 480, 
      height: 270, 
      frames: 12 
    },



    { name: "propulsore", path: "assets/images/Propulsione.png", width: 80, height: 48},

    {   // IMPORTANTE
      name: "tileset-astronave", 
      path: "assets/map/tileset-astronave-extruded.png", 
      width: 16, 
      height: 16, 
      margin: 1, 
      spacing: 2},

    {
      name: "tilesetv1", 
      path: "assets/map/tileset.png", 
      width: 16, 
      height: 16, 
      spacing: 0},



      // In GameData.ts
    //{name: "boss", path : "assets/images/boss.png"};
    { name: "solarplayer", path: "assets/images/Modello.png", width: 32, height: 32 },
    { name: "nemicobase", path: "assets/images/enemy.png", width: 32, height: 32 },
    { name: "naveTerzaPersona", path: "assets/images/naveTerzaPersona.png", width: 768, height: 427, frames: 5},
  ],

  images: [   // array di immagini che viene richiamato su

    { name: "phaser", path: "assets/images/logo-phaser.png" },
    { name: "INIZIO", path: "assets/images/Inizio.png"}, 
    { name: "delimiter", path: "assets/images/Delimiter.png"},
    { name: "hud-vita", path: "assets/images/HUD/vita.png"}, 
    { name: "hud-evo", path: "assets/images/HUD/evo.png"}, 
    { name: "hud-colpi", path: "assets/images/HUD/colpi.png"}, 



    { name: "pistola", path: "assets/images/pistola.png" },
    { name: "bullet", path: "assets/images/bullet.png"}, 
    { name: "fireball", path: "assets/images/fireball.png" }, // Usa bullet.png o un'altra immagine per test


    { name: "btn-back", path: "assets/images/btn_back.png" },
    { name: "btn-next", path: "assets/images/btn_next.png" }
  ],

  atlas: [],
  sounds: [
    /*{
    name: "music",
    paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"],
    volume: 1,
    loop: true,
    frame: 1,
  }*/
  ],

  videos: [

    // { name: "video", path: "/assets/video/video.mp4" },

  ],
  audios: [

    /*{
    name: "sfx",
    jsonpath: "assets/sounds/sfx.json",
    paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"],
    instances: 10,
  }*/
  ],

  scripts: [],
  fonts: [{key:"yoster", path:"assets/fonts/yoster.ttf",type:"truetype"}],
  webfonts: [{ key: 'Nosifer' }, { key: 'Roboto' }, { key: 'Press+Start+2P' }, { key: 'Rubik+Doodle+Shadow' }, { key: 'Rubik+Glitch' }],
  bitmapfonts: [],

  tilemaps: [
    {key : "level-0", path : "assets/map/level-0.json"},
    {key: "level-1", path : "assets/map/level-1.json"},
    {key: "mappa-v1", path: "assets/map/speriamo.json"},

    // IMPORTANTE
    {key: "mappa-astronave", path: "assets/map/AstroNave.json"},
  ]
};


// lo spritesheet può avere animazione