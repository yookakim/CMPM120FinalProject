/* 
    scene class for the planet view after selecting destination.
*/
'use strict';
class PlanetScene extends Phaser.Scene {
    constructor() {
        super('planetscene');
        this.ship = ship;

        // initialize planet property so we can add the tempPlanet stored in registry in create()
        this.planet;
    }

    preload() {
        this.load.image('planet', './assets/planetscene_bigplanet.png');
        this.load.image('planetstats', './assets/UI/planetmenu_stats_placeholder.png');
        this.load.image('shiptinkerbutton', './assets/UI/buttons/ship_tinker_button.png');
        this.load.image('settlementbutton', './assets/UI/buttons/visit_settlement_button.png');
        this.load.image('nextplanetbutton', './assets/UI/buttons/next_planet_button.png');
    }

    create() {
        // this.planet = game.registry.get('tempPlanet');
        this.planet = this.scene.settings.data;
        
        // ui like text and buttons will probably be managed by a separate Scene overlayed on top later
        this.loadUI();

    }

    loadUI() {
        // welcome player and get planet name 
        this.add.text(10, 10, 'You arrived at \'' + this.planet.name + '\' after ' + this.ship.lastTravelTime + ' lonely days in warp.', DEFAULT_TEXT_STYLE);
        this.add.text(10, 30, 'what actions do u take on this planet?', DEFAULT_TEXT_STYLE);

        this.add.sprite(360, 310, 'planet');

        this.planetStatsPanel = this.add.sprite(game.config.width - 300, 50, 'planetstats')
            .setOrigin(0, 0);

        // this.settlementButton = this.add.sprite(game.config.width - 200, game.config.height - 250, 'settlementbutton')
        //     .setOrigin(0, 0)
        //     .setInteractive()
        //     .on('pointerdown', this.loadTradingMenu, this);

        
        this.settlementButton = new ButtonTemplate(this, game.config.width / 9, game.config.height / 3, 'settlementbutton')
            .on('pointerdown', this.loadSettlement, this);

        this.nextPlanetButton = new ButtonTemplate(this, game.config.width - 200, game.config.height - 125, 'nextplanetbutton')
            .on('pointerdown', this.loadPlanetSelection, this);
    }

    loadPlanetSelection() {
        this.scene.start('planetselection');
    }
    
    
    loadSettlement() {
        // go into trading district
        if (this.planet.inhabitants) {
            this.scene.start('settlementmenu', this.planet);
        } else {
            // show this in UI later
            console.log('no settlement on this planet!');
        }
    }
    /* 
    // preemptively setting up scene loading methods
    loadResourcesMenu() {
        this.scene.start('resourcesmenu');
    }
    */
}