'use strict';

class SettlementMenu extends Phaser.Scene {
    constructor() {
        super('settlementmenu');
    }
    
    preload() {
        this.load.image('returnshipbutton', './assets/UI/buttons/returnship_button.png');
    }

    create() {

        /* 
        
        */
        this.hostPlanet = this.scene.settings.data;
        this.settlement = this.hostPlanet.inhabitants;
        this.add.text(40, 40, 'Welcome to ' + this.settlement.settlementName + ', ' + this.hostPlanet.name);
        

        // again, later on, we can have a ubiquitous scene that handles UI for us
        // (maybe make child objects of a base Scene.UIScene class?)

        this.loadUI();
    }

    loadUI() {
        // if this settlement DOES have civilians:
        if (!this.settlement.abandoned) {
            this.add.text(40, 60, this.settlement.population + ' beings live here.');

            // for each civilian in the array:
            this.settlement.civilians.forEach((element, index) => {
                // right now all we do is display the name, but later we can do more complicated things
                // for each civilian there

                // maybe make a button to talk with each civilian liek we made custom button for choosing planet
                // we pass the civilian object through the button parameter, so that the called function knows which
                // civilian it is dealing with
                // this.civilianButton = new TalkButton(this, 40, 140 + (index * 60 + 20), 0, this.settlement.civilian[index])
                this.add.text(40, 140 + (index * 60),
                    'you see ' + 
                    this.settlement.civilians[index].name + 
                    ', ' + this.settlement.civilians[index].age + 
                    ' years old, with ' + this.settlement.civilians[index].wealth +
                    ' pieces of gold in their pocket.')
                    .setInteractive()
                    .on('pointerdown', this.interactCivilian, this);
                    
            });
        } else {
            // if nobody lives in this settlement:
            this.add.text(40, 80, 'Nobody lives here.');
        }

        this.add.sprite(game.config.width - 200, game.config.height - 125, 'returnshipbutton')
            .setInteractive()
            .on('pointerdown', this.returnToShip, this);

        
    }

    interactCivilian() {
        console.log('civilian clicked');
    }

    returnToShip() {
        this.scene.switch('planetscene');
        this.scene.stop('settlementmenu');
    }

}