'use strict';

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

// global uninteractable tint value
let TINT_GRAY = 0x8c8c8c;

// initialize the Phaser game
let game = new Phaser.Game(config);

// insert static globals into the game's freebie data registry
game.registry.set({

    // arbitrary engine start strength
    INITIAL_ENGINE_OUTPUT: 1000,

    // arbitrary placeholder initial planet distance
    PLACEHOLDER_PLANET_DISTANCE: 1000,
})

console.log('um');
// initialize the ship as a global object
let ship = new Ship();

// let keyF;