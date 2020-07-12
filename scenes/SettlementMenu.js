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
        if (this.settlement.civilians != null) {
            // for each civilian in the array:
            this.settlement.civilians.forEach((element, index) => {
                // right now all we do is display the name, but later we can do more complicated things
                // for each civilian there
                this.add.text(40, 60 + (index * 30), 'you see ' + this.settlement.civilians[index].name);
            });
        } else {
            // if nobody lives in this settlement:
            this.add.text(40, 60, 'Nobody lives here.');
        }

        this.add.sprite(game.config.width - 200, game.config.height - 125, 'returnshipbutton')
            .setInteractive()
            .on('pointerdown', this.returnToShip, this);

        
    }

    returnToShip() {
        this.scene.switch('planetscene');
        this.scene.stop('settlementmenu');
    }

}