/* 
    Interaction scene between civilian and player

    Yooha Kim
*/

'use strict';

class CivilianTalkScene extends Phaser.Scene {
    constructor() {
        super('civiliantalkscene');
        this.civilian;
        this.playerInventory = ship.inventory;

        // reference to global ship object
        this.ship = ship;
        this.tooLate = false;
    }

    preload() {
        
    }

    create() {
        
        this.add.image(0, 0, 'settlementbackground').setOrigin(0, 0);
        this.civilian = this.scene.settings.data;
        this.textObject = this.civilian.getText();

        
        if (this.ship.hoursLeftInDay < 1) {
            this.tooLate = true;
        }
        this.loadUI();
        


    }

    loadUI() {

        //display time left in day
        


        this.add.text(game.config.width - 280, 140, 'Time left: ' + this.ship.hoursLeftInDay, DEFAULT_TEXT_STYLE);
        
        this.returnButton = this.add.sprite(game.config.width - 200, game.config.height - 125, 'return')
            .setInteractive()
            .on('pointerdown', this.returnToSettlement, this);

        // var civilianTitle;

        // civilianTitle = this.civilian.name + ': - ';

        // if (this.civilian.components.hasOwnProperty('civilian')) {
        //     civilianTitle += 'Civilian - ';
        // }

        // if (this.civilian.components.hasOwnProperty('merchant')) {
        //     civilianTitle += 'Merchant - ';

        //     if (!this.tooLate) {
        //         this.tradeButton = new ButtonTemplate(this, 300, 300, 'tradebutton');
        //         this.tradeButton.on('pointerdown', this.openTradeMenu, this);
        //     }
        // }

        // if (this.civilian.components.hasOwnProperty('child')) {
        //     civilianTitle += 'Child -';
        // }
        

        this.add.text(80, 80, this.textObject.title, HEADER_TEXT_STYLE);
        
        this.scene.bringToTop('inventoryui');

        this.loadDialogue();
    }

    loadDialogue() {

        this.add.text(80, 140, this.textObject.greetingString, DEFAULT_TEXT_STYLE);
    
        this.civilian.hasVisited = true;
    }

    openTradeMenu() {
        /* 
            what happens when a trade is initiated with merchant?
            
            start separate trading scene

            display own inventory
            display merchant wares as items/item sprites
            display own treasury

            display four cells in the middle, two on our side, two on theirs
                when item is clicked on our side, insert item into this cell and 
                update total worth of our offer, and receive a counteroffer in return

            merchant makes initial trade offer?
                make simple AI that says "yes" or "no" to
                trades depending on internal item worth calculations
                give asking price variable that must be less or match 
                the player offer for trade to finalize





        */
       
        // launch trade scene with the civilian we pass in here
        this.scene.stop('civiliantalkscene');
        this.scene.start('tradescene', this.civilian);
    }

    returnToSettlement() {
        this.scene.switch('settlementmenu');
        this.scene.stop('civiliantalkscene');
        this.scene.stop('inventoryui');
    }
}