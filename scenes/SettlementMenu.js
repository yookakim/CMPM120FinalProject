'use strict';

class SettlementMenu extends Phaser.Scene {
    constructor() {
        super('settlementmenu');
        this.ship = ship;
        this.hoursLeftText;
        this.timeNeedsUpdate = false;

        /* 
            before, I had the txt update immediately on the event call
            which sometimes broke because it would attempt to update the 
            text before the update/text refresh and the text texture would 
            be null when attempted to change on event call, so I set a boolean
            to signal a text change was needed and the text change would happen
            in the update() method instead
        */
        EventManager.on('hoursleftincreased', () => {
            this.timeNeedsUpdate = true;
        }, this);   
    }
    
    preload() {
        
    }

    update() {
        if (this.timeNeedsUpdate) {
            this.hoursLeftText.setText('Time left: ' + this.ship.hoursLeftInDay);
            this.timeNeedsUpdate = false;
        }
    }

    create() {

        /* 
        
        */
        this.add.image(0, 0, 'settlementbackground').setOrigin(0, 0);
        this.hostPlanet = this.scene.settings.data;
        this.settlement = this.hostPlanet.inhabitants;

        this.planetStatsPanel = this.add.sprite(game.config.width - 300, 50, 'planetstats')
            .setOrigin(0, 0);

        // this.inventoryButton = new ButtonTemplate(this, game.config.width - 300, (5 * game.config.height) / 10, 'inventorybutton');
        // this.inventoryButton.setOrigin(0, 0);

        var inventoryUIDataObject = {
            inventory: this.ship.inventory,
            positionX: game.config.width - 450,
            positionY: (7 * game.config.height) / 10
        };
        
        // launch the container scene for the inventory
        this.scene.launch('inventoryui', inventoryUIDataObject);
        this.scene.bringToTop('inventoryui');

        this.add.text(80, 40, "You grab your things and enter the settlement...", DEFAULT_TEXT_STYLE);
        this.add.text(80, 80, this.settlement.settlementName, HEADER_TEXT_STYLE);
        

        // again, later on, we can have a ubiquitous scene that handles UI for us
        // (maybe make child objects of a base Scene.UIScene class?)

        this.loadUI();
    }

    updateTimeText(hoursLeft) {
        if (this.hoursLeftText != null) {
            console.log(this.hoursLeftText);
            this.hoursLeftText.setText('Time left: ' + hoursLeft);
        }        
    }

    loadUI() {

        // display time left in day
        this.hoursLeftText = this.add.text(game.config.width - 280, 140, 'Time left: ' + this.ship.hoursLeftInDay, DEFAULT_TEXT_STYLE);

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
                    this.civilianButton = new TalkButtonObject(this, 155, 180 + (index * 110 + 60), 'talkbutton', 0, this.settlement.civilians[index]);
                } else if (!element.hasVisited) {
                    this.civilianButton = new TalkButtonObject(this, 155, 180 + (index * 110 + 60), 'meetbutton', 0, this.settlement.civilians[index]);
                }
                this.add.text(80, 180 + (index * 110),
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
        this.scene.stop('inventoryui');
        // plays door-knocking sound only if first time visiting
        if (!civilian.hasVisited) {
            this.sound.play('doorknock', DEFAULT_SFX_CONFIG);
            
        }
    }

    returnToShip() {
        this.scene.switch('planetscene');
        this.scene.stop('inventoryui');
        this.scene.stop('settlementmenu');
    }
}