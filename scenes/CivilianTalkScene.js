/* 
    Interaction scene between civilian and player
*/

'use strict';

class CivilianTalkScene extends Phaser.Scene {
    constructor() {
        super('civiliantalkscene');
        this.civilian;
        this.playerInventory = ship.inventory;

        // reference to global ship object
        this.ship = ship;
    }

    preload() {
        this.load.image('settlementbackground', './assets/settlement_background.png');
        this.load.image('return', './assets/UI/buttons/return_to_settlement_button.png');
    }

    create() {
        
        this.add.image(0, 0, 'settlementbackground').setOrigin(0, 0);
        this.civilian = this.scene.settings.data;
        

        this.add.text(10, 10, 'You initiate a conversation with ' + this.civilian.name, DEFAULT_TEXT_STYLE);

        this.loadUI();
    }

    loadUI() {
        this.add.sprite(game.config.width - 200, game.config.height - 125, 'return')
            .setInteractive()
            .on('pointerdown', this.returnToSettlement, this);

        if (!this.civilian.hasVisited) {
            this.add.text(10, 50, 'Hi, my name is ' + this.civilian.name + '.', DEFAULT_TEXT_STYLE);
            this.civilian.hasVisited = true;
        } else {
            this.add.text(10, 50, 'Nice to see you again!', DEFAULT_TEXT_STYLE);
            
        }

        this.add.text(10, 80, 'Right now I only say the same things as literally everybody else in the universe!', DEFAULT_TEXT_STYLE)
        this.add.text(10, 110, 'What I say is still hard-coded and it\'s uncomfortable!', DEFAULT_TEXT_STYLE);
        this.add.text(10, 140, 'I have ' + this.civilian.wealth + ' gold pieces in my wallet! Just felt like letting you know.', DEFAULT_TEXT_STYLE);
        this.scene.launch('inventoryui');
        this.scene.bringToTop('inventoryui');
    }

    returnToSettlement() {
        this.scene.switch('settlementmenu');
        this.scene.stop('civiliantalkscene');
        this.scene.stop('inventoryui');
    }
}