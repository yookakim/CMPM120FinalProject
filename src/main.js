'use strict';

// define game config
let config = {
    type: Phaser.Canvas,
    width: 640,
    height: 480,
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
    scene: [ PlanetSelection , PlanetMenu ],
}


// initialize the Phaser game
let game = new Phaser.Game(config);

// insert static globals into the game's freebie data registry
game.registry.set({
    
    // arbitrary engine start strength
    INITIAL_PLANET_OBJECT: new Planet('startplanet'),
    INITIAL_SHIP_MAX_FUEL: 200,
    INITIAL_ENGINE_OUTPUT: 40,
    INITIAL_ENGINE_EFFICIENCY: 8,
    
    // arbitrary placeholder initial planet distance
    PLACEHOLDER_PLANET_DISTANCE: 1000,
})

// global "uninteractable" tint value
let TINT_GRAY = 0x8c8c8c;

// initialize the ship as a global object
let ship = new Ship(game);