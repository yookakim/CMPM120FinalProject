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
        this.load.image('nextplanetbutton', './assets/next_planet_button.png');
    }

    create() {
        this.planet = this.registry.get('tempPlanet');

        // ui like text and buttons will probably be managed by a separate Scene overlayed on top later
        this.loadUI();

    }

    loadUI() {
        // welcome player and get planet name
        this.add.text(10, 10, 'You arrived at \'' + this.planet.name + '\' after ' + this.ship.lastTravelTime + ' days.');
        this.add.text(10, 30, 'what actions do u take on this planet?');

        this.tinkerShipButton = this.add.sprite(300, 200, 'shiptinkerbutton')
            .setInteractive()
            .on('pointerdown', this.increaseShipMaxFuel, this);

        this.maxFuelText = this.add.text(300, 295, 'current max fuel: ' + this.ship.maxFuelAmount);

        this.nextPlanetButton = this.add.sprite(550, 400, 'nextplanetbutton')
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
    
    /* 
    // preemptively setting up scene loading methods

    loadTradingMenu() {
        // go into trading district
        // with 
        this.scene.start('tradingmenu');
    }
    loadResourcesMenu() {
        this.scene.start('resourcesmenu');
    }
    */
}