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

        EventManager.on('hoursleftincreased', this.checkTooLate, this);
    }

    preload() {
        
    }

    create() {
        
        this.add.image(0, 0, 'settlementbackground2').setOrigin(0, 0);
        this.civilian = this.scene.settings.data;
        
        this.tooLate = false;

        this.checkTooLate();

        this.dialogueObject = this.civilian.getGreeting();

        this.loadUI();

    }

    checkTooLate() {
        if (this.ship.hoursLeftInDay < 1) {
            // too late to talk
            this.tooLate = true;
        } else if (this.ship.hoursLeftInDay > 0) {
            this.tooLate = false;
        }
    }

    loadUI() {

        //display time left in day
        


        this.add.text(game.config.width - 280, 100, 'Hours left in day: ' + this.ship.hoursLeftInDay, DEFAULT_TEXT_STYLE);
        
        this.returnButton = this.add.sprite(game.config.width - 200, game.config.height - 125, 'return')
            .setInteractive()
            .on('pointerdown', this.returnToSettlement, this);

        this.add.text(80, 50, this.civilian.name, HEADER_TEXT_STYLE);

        this.add.text(80, 120, this.dialogueObject.titles, SUBHEADER_TEXT_STYLE);
        
        this.scene.bringToTop('inventoryui');
        if (this.tooLate) {
            // too late to talk
            this.loadTooLateDialogue();
        } else {
            this.loadDialogue();
            
        }
    }

    loadTooLateDialogue() {
        this.add.text(80, 180, this.dialogueObject.tooLateString, DEFAULT_TEXT_STYLE);
        this.civilian.hasVisited = true;
    }

    loadDialogue() {

        if (this.civilian.components.hasOwnProperty('merchant')) {            

            if (!this.tooLate) {
                this.tradeButton = new ButtonTemplate(this, 300, 300, 'tradebutton');
                this.tradeButton.on('pointerdown', this.openTradeMenu, this);
            }
        }

        if (this.ship.sanity < 30) {
            this.add.text(80, 180, this.dialogueObject.lowGreetingString, DEFAULT_TEXT_STYLE);
            
            if (this.civilian.npcType === "CIV") {
                // decrease sanity because you were yelled at by a civilian
                this.add.text(80, 320, 'Your sanity has gone down by 4.', DEFAULT_TEXT_STYLE);
                this.ship.changeSanity(-4);
            }
            if (this.civilian.npcType === "CIV_CHILD") {
                // increase sanity because a child gave u innocent hope
                this.add.text(80, 320, 'Your sanity has increased by 4.', DEFAULT_TEXT_STYLE);
                this.ship.changeSanity(4);
            }

        } else if (this.ship.sanity >= 30 && this.ship.sanity < 70) {
            this.add.text(80, 180, this.dialogueObject.normalGreetingString, DEFAULT_TEXT_STYLE);

        } else if (this.ship.sanity >= 70) {
            this.add.text(80, 180, this.dialogueObject.highGreetingString, DEFAULT_TEXT_STYLE);
        }
        

        this.civilian.hasVisited = true;
    }

    openTradeMenu() {
        // launch trade scene with the civilian we pass in here
        this.scene.stop('civiliantalkscene');
        this.scene.start('tradescene', this.civilian);
    }

    returnToSettlement() {
        if (!this.tooLate) {
            this.ship.spendTime(1);
        }
        this.scene.switch('settlementmenu');
        this.scene.stop('civiliantalkscene');
        this.scene.stop('inventoryui');
    }
}