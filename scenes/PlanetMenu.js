// scene class for the planet view after selecting destination.

'use strict';
class PlanetMenu extends Phaser.Scene {
    constructor() {
        super('planetmenu');
        this.ship = ship;

        // initialize planet property so we can add the tempPlanet stored in registry in create()
        this.planet;
    }

    preload() {
        this.load.image('shiptinkerbutton', './assets/ship_tinker_button.png');
        this.load.image('settlementbutton', './assets/visit_settlement_button.png');
        this.load.image('nextplanetbutton', './assets/next_planet_button.png');
    }

    create() {
        this.planet = game.registry.get('tempPlanet');

        // ui like text and buttons will probably be managed by a separate Scene overlayed on top later
        this.loadUI();

    }

    loadUI() {
        // welcome player and get planet name
        this.add.text(10, 10, 'You arrived at \'' + this.planet.name + '\' after ' + this.ship.lastTravelTime + ' days.');
        this.add.text(10, 30, 'what actions do u take on this planet?');

        this.settlementButton = this.add.sprite(game.config.width - 200, game.config.height - 250, 'settlementbutton')
            .setOrigin(0, 0)
            .setInteractive()
            .on('pointerdown', this.loadTradingMenu, this);

        this.nextPlanetButton = this.add.sprite(game.config.width - 200, game.config.height - 125, 'nextplanetbutton')
            .setOrigin(0, 0)
            .setInteractive()
            .on('pointerdown', this.loadPlanetSelection, this);
    }
    
    // placeholder test method for giving free increases to max fuel
    increaseShipMaxFuel() {
        this.ship.maxFuelAmount += 20;
        this.maxFuelText.text = 'current max fuel: ' + this.ship.maxFuelAmount;
    }

    loadPlanetSelection() {
        this.scene.start('planetselection');
    }
    
    
    loadTradingMenu() {
        // go into trading district
        // with 
        this.scene.switch('tradingmenu');
    }
    /* 
    // preemptively setting up scene loading methods
    loadResourcesMenu() {
        this.scene.start('resourcesmenu');
    }
    */
}