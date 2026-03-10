export let GameData: gameData = {
  globals: {
    gameWidth: 1920,
    gameHeight: 1080,
    bgColor: "#ffffff",
    debug: false
  },

  preloader: {      // qui carichiamo i data di ciascuna scena
    bgColor: "ffffff",
    image: "logo",      // corrisponde alla key dell'immagine precaricata in boot
    imageX: 1920 / 2,
    imageY: 1080 / 2,
    loadingText: "Sto caricando...",
    loadingTextFont: "roboto",
    loadingTextComplete: "Tappa/clicca per iniziare!!",
    loadingTextY: 700,
    loadingBarColor: 0xff0000,
    loadingBarY: 630,
  },

  spritesheets: [
    { name: "player", path: "assets/images/player.png", width: 82, height: 70, frames: 50 },
    { name: "solaris", path: "assets/images/solaris.png", width: 251, height: 105, frames: 14},
    { name: "tilemap-extruded", path: "assets/map/tilemap-extruded.png", width: 32, height: 32, spacing: 2},


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
      spacing: 0}
  ],

  images: [   // array di immagini che viene richiamato su

    { name: "phaser", path: "assets/images/logo-phaser.png" },
    { name: "freedoom", path: "assets/images/freedoom.png" },
    { name: "thelucasart", path: "assets/images/thelucasart.png" },
    { name: "intro-bg", path: "assets/images/intro-bg.jpg" },
    { name: "bg-1", path: "assets/images/bg/1.png" },
    { name: "bg-2", path: "assets/images/bg/2.png" },
    { name: "bg-3", path: "assets/images/bg/3.png" },
    { name: "bg-4", path: "assets/images/bg/4.png" },
    { name: "bg-5", path: "assets/images/bg/5.png" },
    { name: "bg-6", path: "assets/images/bg/6.png" },
    { name: "bg-7", path: "assets/images/bg/7.png" },

    { name: "INIZIO", path: "assets/images/Inizio.png"}, 
    { name: "delimiter", path: "assets/images/Delimiter.png"},
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
  fonts: [{key:"ralewayRegular", path:"assets/fonts/raleway.regular.ttf",type:"truetype"}],
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