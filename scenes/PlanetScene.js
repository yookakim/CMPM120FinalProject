/* 
    scene class for the planet view after selecting destination.
*/
'use strict';
class PlanetScene extends Phaser.Scene {
    constructor() {
        super('planetscene');
        this.ship = ship;
        this.hoursLeftText;
        this.timeNeedsUpdate = false;
        // initialize planet property so we can add the tempPlanet stored in registry in create()
        this.planet;
        EventManager.on('hoursleftincreased', () => {
            this.timeNeedsUpdate = true;
        }, this);  
    }

    preload() {


    }

    create() {
        // this.planet = game.registry.get('tempPlanet');
        console.log(ship);
        this.planet = this.scene.settings.data;
        
        // ui like text and buttons will probably be managed by a separate Scene overlayed on top later
        this.loadUI();
        
    }

    update() {
        this.settlementButton.checkClickable();
        this.ecosystemButton.checkClickable();
        if (this.ship.hoursLeftInDay < 3 && this.settlementButton.clickable) {
            this.settlementButton.clickable = false;
        }
        if (this.ship.hoursLeftInDay < 3 && this.ecosystemButton.clickable) {
            this.ecosystemButton.clickable = false;
        }
        if (this.ship.hoursLeftInDay >= 3 && !this.settlementButton.clickable) {
            this.settlementButton.clickable = true;
        }
        if (this.ship.hoursLeftInDay >= 3 && !this.ecosystemButton.clickable) {
            this.ecosystemButton.clickable = true;
        }
        if (this.timeNeedsUpdate) {
            this.hoursLeftText.setText('Time left: ' + this.ship.hoursLeftInDay);
            this.timeNeedsUpdate = false;
        }
    }

    loadUI() {

        this.add.sprite(0, 0, 'planetscenebackground').setOrigin(0, 0);

        // welcome player and get planet name 
        this.add.text(50, 50, 'After ' + this.ship.lastTravelTime + ' lonely days in warp, you arrive at...', DEFAULT_TEXT_STYLE);
        this.add.text(50, 70, this.planet.name , HEADER_TEXT_STYLE);
        this.add.text(50, 120, 'What actions will you take on this planet?', DEFAULT_TEXT_STYLE);

        var inventoryUIDataObject = {
            inventory: this.ship.inventory,
            positionX: game.config.width - 450,
            positionY: (7 * game.config.height) / 10
        };
        
        // launch the container scene for the inventory
        this.scene.launch('inventoryui', inventoryUIDataObject);
        this.scene.bringToTop('inventoryui');

        if (this.planet.ecosystem.ecosystemType.hasOwnProperty('temperate')) {
            this.add.sprite(360, 400, 'temperateplanet');
        } else if (this.planet.ecosystem.ecosystemType.hasOwnProperty('icy')) {
            this.add.sprite(360, 400, 'icyplanet');
        } else if (this.planet.ecosystem.ecosystemType.hasOwnProperty('desert')) {
            this.add.sprite(360, 400, 'desertplanet');
        } else if (this.planet.ecosystem.ecosystemType.hasOwnProperty('humid')) {
            this.add.sprite(360, 400, 'humidplanet');
        }

        

        this.planetStatsPanel = this.add.sprite(game.config.width - 300, 50, 'planetstats')
            .setOrigin(0, 0);

        this.hoursLeftText = this.add.text(game.config.width - 280, 140, 'Time left: ' + this.ship.hoursLeftInDay, DEFAULT_TEXT_STYLE);

        // this.settlementButton = this.add.sprite(game.config.width - 200, game.config.height - 250, 'settlementbutton')
        //     .setOrigin(0, 0)
        //     .setInteractive()
        //     .on('pointerdown', this.loadTradingMenu, this);

        
        this.settlementButton = new ButtonTemplate(this, game.config.width / 9, 4 * game.config.height / 9, 'settlementbutton')
            .on('pointerdown', this.loadSettlement, this);

        this.ecosystemButton = new ButtonTemplate(this,  7 * game.config.width / 12, game.config.height / 2, 'ecosystembutton')
            .on('pointerdown', this.loadEcosystem, this);



        this.nextPlanetButton = new ButtonTemplate(this, game.config.width - 200, game.config.height - 125, 'nextplanetbutton')
            .on('pointerdown', this.loadPlanetSelection, this);
    }

    loadPlanetSelection() {
        this.scene.start('planetselection');
        this.scene.stop('inventoryui');
    }
    
    
    loadSettlement() {
        // go into trading district
        if (this.planet.inhabitants && this.ship.hoursLeftInDay >= 3) {
            this.ship.spendTime(3);
            this.scene.start('settlementmenu', this.planet);
        } else if (this.ship.hoursLeftInDay < 3) {
            // show this in UI later
            console.log('not enough time left for travel to this location');
        } else if (!this.planet.inhabitants) {
            console.log('no settlement to travel to');
        }
        this.scene.stop('inventoryui');
    }
    loadEcosystem() {
        // go into trading district
        if (this.planet.ecosystem && this.ship.hoursLeftInDay >= 3) {
            
            this.scene.start('ecosystemmenu', this.planet);
        } else if (this.ship.hoursLeftInDay < 3) {
            // show this in UI later
            console.log('not enough time left for travel to this location');
        } else if (!this.planet.inhabitants) {
            console.log('no ecosystem to travel to');
        }
        this.ship.spendTime(3);
        this.scene.stop('inventoryui');
    }
    /* 
    // preemptively setting up scene loading methods
    loadResourcesMenu() {
        this.scene.start('resourcesmenu');
    }
    */
}