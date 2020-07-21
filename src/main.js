'use strict';

/* 
    CMPM 120 Project

    by:

    Yooha Kim
    Oliver Berggren
    Jonathan Palafox
*/

// define game config
let config = {
    type: Phaser.Canvas,
    width: 1024,
    height: 768,
    fps: {
        // smoothStep: true,
        target: 30,
    },
    
    pixelArt: true,
    
    physics: {
        default: 'arcade',
        arcade: {
            // debug: false,
            fps: 140,
        },
    },
    scene: [ 
        Preloader ,
        TitleScreen , PlanetSelection , PlanetSelectionUI, PlanetScene , InventoryScene ,
        InventoryUI , SettlementMenu , CivilianTalkScene , TradeScene 
    ],
}

let HEADER_TEXT_STYLE = {
    font: '40px Tahoma',
    fontStyle: 'strong',
}

let DEFAULT_TEXT_STYLE = {
    fontFamily: 'Tahoma',
}

let DEFAULT_SFX_CONFIG = {
    volume: .8,
}

// global "uninteractable" tint value
let TINT_GRAY = 0x8c8c8c;

// global itemlist var to add item json data to in preloader
let ITEMLIST;


// initialize the Phaser game
let game = new Phaser.Game(config);

// insert static globals into the game's freebie data registry
game.registry.set({
    
    // arbitrary engine start strength
    INITIAL_PLANET_OBJECT: new Planet('startplanet'),
    INITIAL_SHIP_MAX_FUEL: 100,
    INITIAL_ENGINE_OUTPUT: 60,
    INITIAL_ENGINE_EFFICIENCY: 11,
    INITIAL_MAX_SANITY: 100,
    
    // arbitrary placeholder initial planet distance
    PLACEHOLDER_PLANET_DISTANCE: 1000,
})

// initialize the ship as a global object
let ship = new Ship(game);