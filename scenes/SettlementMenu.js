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
        if (this.settlement.civilians != null) {
            this.settlement.civilians.forEach((element, index) => {
                this.add.text(40, 60 + (index * 20), 'you see ' + this.settlement.civilians[index].name);
            });
        } else {
            this.add.text(40, 60, 'there is nobody here.');
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