/* 
    scene class for the planet view after selecting destination.
*/
'use strict';
class PlanetScene extends Phaser.Scene {
    constructor() {
        super('planetscene');
        this.ship = ship;
        this.hoursLeftText;
        // initialize planet property so we can add the tempPlanet stored in registry in create()
        this.planet;
        // EventManager.on('hoursleftincreased', (hoursLeft) => {
        //     if (this.hoursLeftText) {
        //         this.hoursLeftText.setText('Time left: ' + hoursLeft);
        //     }
        // })
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
    }

    loadUI() {
        // welcome player and get planet name 
        this.add.text(10, 10, 'You arrived at \'' + this.planet.name + '\' after ' + this.ship.lastTravelTime + ' lonely days in warp.', DEFAULT_TEXT_STYLE);
        this.add.text(10, 30, 'what actions do u take on this planet?', DEFAULT_TEXT_STYLE);

        this.add.sprite(360, 310, 'planet');

        this.planetStatsPanel = this.add.sprite(game.config.width - 300, 50, 'planetstats')
            .setOrigin(0, 0);

        this.hoursLeftText = this.add.text(game.config.width - 280, 140, 'Time left: ' + this.ship.hoursLeftInDay, DEFAULT_TEXT_STYLE);

        // this.settlementButton = this.add.sprite(game.config.width - 200, game.config.height - 250, 'settlementbutton')
        //     .setOrigin(0, 0)
        //     .setInteractive()
        //     .on('pointerdown', this.loadTradingMenu, this);

        
        this.settlementButton = new ButtonTemplate(this, game.config.width / 9, game.config.height / 3, 'settlementbutton')
            .on('pointerdown', this.loadSettlement, this);

        if (this.ship.hoursLeftInDay < 3) {
            this.settlementButton.clickable = false;
        }

        this.nextPlanetButton = new ButtonTemplate(this, game.config.width - 200, game.config.height - 125, 'nextplanetbutton')
            .on('pointerdown', this.loadPlanetSelection, this);
    }

    loadPlanetSelection() {
        this.scene.start('planetselection');
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
    }
    /* 
    // preemptively setting up scene loading methods
    loadResourcesMenu() {
        this.scene.start('resourcesmenu');
    }
    */
}