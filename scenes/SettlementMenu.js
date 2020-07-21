'use strict';

class SettlementMenu extends Phaser.Scene {
    constructor() {
        super('settlementmenu');
        this.ship = ship;
    }
    
    preload() {
        
    }

    create() {

        /* 
        
        */
        this.add.image(0, 0, 'settlementbackground').setOrigin(0, 0);
        this.hostPlanet = this.scene.settings.data;
        this.settlement = this.hostPlanet.inhabitants;
        this.add.text(80, 40, "You grab your things and enter...", DEFAULT_TEXT_STYLE);
        this.add.text(80, 80, this.settlement.settlementName + ', ' + this.hostPlanet.name, HEADER_TEXT_STYLE);
        

        // again, later on, we can have a ubiquitous scene that handles UI for us
        // (maybe make child objects of a base Scene.UIScene class?)

        this.loadUI();
    }

    loadUI() {

        // display time left in day
        this.add.text(game.config.width - 280, 140, 'Time left: ' + this.ship.hoursLeftInDay, DEFAULT_TEXT_STYLE);

        // if this settlement DOES have civilians:
        if (!this.settlement.abandoned) {
            this.add.text(80, 140, this.settlement.population + ' beings live here.', DEFAULT_TEXT_STYLE);

            // for each civilian in the array:
            this.settlement.civilians.forEach((element, index) => {
                // right now all we do is display the name, but later we can do more complicated things
                // for each civilian there

                // maybe make a button to talk with each civilian liek we made custom button for choosing planet
                // we pass the civilian object through the button parameter, so that the called function knows which
                // civilian it is dealing with
                if (element.hasVisited) {
                    this.civilianButton = new TalkButtonObject(this, 155, 180 + (index * 120 + 75), 'talkbutton', 0, this.settlement.civilians[index])
                } else if (!element.hasVisited) {
                    this.civilianButton = new TalkButtonObject(this, 155, 180 + (index * 120 + 75), 'meetbutton', 0, this.settlement.civilians[index])
                }
                this.add.text(80, 180 + (index * 120),
                    'you see ' + 
                    element.name + ', ' +
                    element.age +
                    ' years old',
                    DEFAULT_TEXT_STYLE);
                    
            });
        } else {
            // if nobody lives in this settlement:
            this.add.text(80, 140, 'Nobody lives here.', DEFAULT_TEXT_STYLE);
        }

        this.add.sprite(game.config.width - 200, game.config.height - 125, 'returnshipbutton')
            .setInteractive()
            .on('pointerdown', this.returnToShip, this);

        
    }

    loadCivilianTalkScene(civilian) {
        // once click input detected, loads civilian interaction scene with the NPC in question
        this.scene.start('civiliantalkscene', civilian);
        // plays door-knocking sound only if first time visiting
        if (!civilian.hasVisited) {
            this.sound.play('doorknock', DEFAULT_SFX_CONFIG);
            
        }
    }

    returnToShip() {
        this.scene.switch('planetscene');
        this.scene.stop('settlementmenu');
    }
}