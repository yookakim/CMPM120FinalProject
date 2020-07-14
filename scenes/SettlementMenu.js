'use strict';

class SettlementMenu extends Phaser.Scene {
    constructor() {
        super('settlementmenu');
    }
    
    preload() {
        this.load.image('settlementbackground', './assets/settlement_background.png');
        this.load.image('returnshipbutton', './assets/UI/buttons/returnship_button.png');
        this.load.image('talkbutton', './assets/UI/buttons/settlement_talk_button.png');
        this.load.audio('doorknock', './assets/SFX/door_knock.wav');
    }

    create() {

        /* 
        
        */
        this.add.image(0, 0, 'settlementbackground').setOrigin(0, 0);
        this.hostPlanet = this.scene.settings.data;
        this.settlement = this.hostPlanet.inhabitants;
        this.add.text(40, 40, 'Welcome to ' + this.settlement.settlementName + ', ' + this.hostPlanet.name, DEFAULT_TEXT_STYLE);
        

        // again, later on, we can have a ubiquitous scene that handles UI for us
        // (maybe make child objects of a base Scene.UIScene class?)

        this.loadUI();
    }

    loadUI() {
        // if this settlement DOES have civilians:
        if (!this.settlement.abandoned) {
            this.add.text(40, 60, this.settlement.population + ' beings live here.', DEFAULT_TEXT_STYLE);

            // for each civilian in the array:
            this.settlement.civilians.forEach((element, index) => {
                // right now all we do is display the name, but later we can do more complicated things
                // for each civilian there

                // maybe make a button to talk with each civilian liek we made custom button for choosing planet
                // we pass the civilian object through the button parameter, so that the called function knows which
                // civilian it is dealing with
                this.civilianButton = new TalkButtonObject(this, 115, 140 + (index * 120 + 75), 'talkbutton', 0, this.settlement.civilians[index])
                this.add.text(40, 140 + (index * 120),
                    'you see ' + 
                    this.settlement.civilians[index].name + 
                    ', ' + this.settlement.civilians[index].age + 
                    ' years old, with ' + this.settlement.civilians[index].wealth +
                    ' pieces of gold in their pocket.', DEFAULT_TEXT_STYLE)
                    .setInteractive()
                    
            });
        } else {
            // if nobody lives in this settlement:
            this.add.text(40, 80, 'Nobody lives here.', DEFAULT_TEXT_STYLE);
        }

        this.add.sprite(game.config.width - 200, game.config.height - 125, 'returnshipbutton')
            .setInteractive()
            .on('pointerdown', this.returnToShip, this);

        
    }

    loadCivilianTalkScene(civilian) {
        // once click input detected, loads civilian interaction scene with the NPC in question
        console.log('talk button clicked');
        this.scene.start('civiliantalkscene', civilian);

        // plays door-knocking sound only if first time visiting
        if (!civilian.hasVisited) {
            this.sound.play('doorknock', DEFAULT_SFX_CONFIG);
            civilian.hasVisited = true;
        }
    }

    returnToShip() {
        this.scene.switch('planetscene');
        this.scene.stop('settlementmenu');
    }

}