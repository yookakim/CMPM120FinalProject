'use strict';

/* 
    Menu scene for displaying ecosystem and giving scavenging options

    Yooha Kim
*/

class EcosystemMenu extends Phaser.Scene {
    constructor() {
        super('ecosystemmenu');
        this.ship = ship;
        this.hoursLeftText;
        this.timeNeedsUpdate = false;
        EventManager.on('hoursleftincreased', () => {
            this.timeNeedsUpdate = true;
        }, this);        
        EventManager.on('sanitychanged', () => {
            this.sanityNeedsUpdate = true;
        }, this);  
    }

    // I reuse a buttload of UI code from SettlementMenu, next time around find
    // a way to create better persistent UI
    create() {
        this.hostPlanet = this.scene.settings.data;
        this.ecosystem = this.hostPlanet.ecosystem;

        this.loadUI();
    }

    update() {
        this.scavengeButton.checkClickable();
        if (this.timeNeedsUpdate) {
            this.hoursLeftText.setText('Hours left in day: ' + this.ship.hoursLeftInDay);
            this.timeNeedsUpdate = false;
        }
        if (this.ship.hoursLeftInDay < 2 && this.scavengeButton.clickable) {
            this.scavengeButton.clickable = false;
        }
        if (this.ship.hoursLeftInDay >= 2 && !this.scavengeButton.clickable) {
            this.scavengeButton.clickable = true;
        }
        if (this.sanityNeedsUpdate) {
            this.refreshSanityText();
            this.timeNeedsUpdate = false;
        }
    }

    loadUI() {

        this.add.image(0, 0, 'planetscenebackground').setOrigin(0, 0);

        if (this.ecosystem.ecosystemType.hasOwnProperty('temperate')) {
            this.add.image(0, 0, 'ecosystem_temperate').setOrigin(0, 0);
        } else if (this.ecosystem.ecosystemType.hasOwnProperty('icy')) {
            this.add.image(0, 0, 'ecosystem_icy').setOrigin(0, 0);
        } else if (this.ecosystem.ecosystemType.hasOwnProperty('desert')) {
            this.add.image(0, 0, 'ecosystem_desert').setOrigin(0, 0);
        } else if (this.ecosystem.ecosystemType.hasOwnProperty('humid')) {
            this.add.image(0, 0, 'ecosystem_humid').setOrigin(0, 0);
        }

        this.planetStatsPanel = this.add.sprite(game.config.width - 300, 50, 'planetstats')
        .setOrigin(0, 0);

        this.add.text(50, 50, "You decide to explore the local ecosystem of " + this.hostPlanet.name + '.', DEFAULT_TEXT_STYLE);
        
        this.sanityText = this.add.text(game.config.width - 280, 160, 'Sanity: ' + this.ship.sanity, DEFAULT_TEXT_STYLE);
        this.refreshSanityText();

        this.scavengeButton = new ButtonTemplate(this, 155, 180, 'scavengebutton');
        this.scavengeButton.on('pointerdown', this.loadScavengeSummary, this);

        this.add.image(155, 250, 'twohourslabel');
        
        this.hoursLeftText = this.add.text(game.config.width - 280, 140, 'Hours left in day: ' + this.ship.hoursLeftInDay, DEFAULT_TEXT_STYLE);

        var inventoryUIDataObject = {
            inventory: this.ship.inventory,
            positionX: game.config.width - 570,
            positionY: (7 * game.config.height) / 10
        };
        
        // launch the container scene for the inventory
        this.scene.launch('inventoryui', inventoryUIDataObject);
        this.scene.bringToTop('inventoryui');

        this.add.sprite(game.config.width - 200, game.config.height - 125, 'returnshipbutton')
            .setInteractive()
            .on('pointerdown', this.returnToShip, this);
    }
    
    refreshSanityText() {
        if (this.ship.sanity < 30) {
            this.sanityText.setText('Sanity: ' + this.ship.sanity + ' (Disheveled)', DEFAULT_TEXT_STYLE);
        } else if (this.ship.sanity >= 30 && this.ship.sanity < 70) {
            this.sanityText.setText('Sanity: ' + this.ship.sanity + ' (Normal)', DEFAULT_TEXT_STYLE);
        } else if (this.ship.sanity >= 70) {
            this.sanityText.setText('Sanity: ' + this.ship.sanity + ' (Illuminated)', DEFAULT_TEXT_STYLE);
        }
    }

    loadScavengeSummary() {
        console.log(this.ecosystem);
        this.scene.start('scavengesummary', this.ecosystem);
        this.scene.stop('inventoryui');
    }

    returnToShip() {
        this.scene.switch('planetscene');
        this.scene.stop('inventoryui');
        this.scene.stop('ecosystemmenu');
    }
}