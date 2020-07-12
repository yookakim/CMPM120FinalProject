'use strict';

/* 
    Scene for selecting the destination planet
*/

class PlanetSelection extends Phaser.Scene {
    
    constructor() {

        super('planetselection');
        this.ship = ship;
        this.maxTravelDistance;
        this.planetFactory = new PlanetFactory();
    }

    preload() {

        this.cameras.main.setBackgroundColor(' ');
        this.load.image('planetbutton', './assets/temp_planet.png');
        this.load.image('selectdestinationbanner', './assets/UI/select_destination_banner.png');
        this.load.image('statszone', './assets/UI/planetselection_stats_zone.png');
        this.load.image('fuelbutton', './assets/UI/buttons/fuel_button.png');
    }

    create() {
        // this.scene.launch('sceneui');


        // calculating the current max travel distance possible:
        // for now, let's just make the ship travel 8 units of distance per one unit of fuel
        // to keep things simple
        
        this.maxTravelDistance = this.ship.maxTravelDistance;
        
        // grab the array of planets we created in the planet factory
        this.planetGroup = this.planetFactory.generatePlanets();

        // we make planet data objects that we pass into the UI so it knows what to draw (automate later)

        // honestly if we create a new scene for UI we might be able to pass
        // these in as the data parameter for starting a new scene

        this.planetData = {
            planet: this.planetGroup[0],
            travelTime: Phaser.Math.Snap.Ceil(
                this.planetGroup[0].planetDistance / (this.ship.engine.engineOutput + (this.ship.engine.engineEfficiency * 3)), 1),
        };

        this.planetData2 = {
            planet: this.planetGroup[1],
            travelTime: Phaser.Math.Snap.Ceil(
                this.planetGroup[1].planetDistance / (this.ship.engine.engineOutput + (this.ship.engine.engineEfficiency * 3)), 1),
        };

        // let planetArray = [this.planet, this.planet2];


        // in the future, planet generation, planet data loading, loading UI for respective planets, will all 
        // happen in one clean function here hopefully
        this.loadUI();
        this.inputSetup();        
    }

    update() {

    }
    

    loadUI() {

        /*
            probably should find some way to remove hard coded UI sprite/text position values later. 
            if there are variable number of planets to choose from later, it would be difficult 
            to get coordinates for each button position. 

            iterate along however many planets were generated (unless we are settling on fixed planets per turn)
            inside the array of planets we defined in create()

         */
        this.add.sprite(game.config.width / 2, game.config.height / 8, 'selectdestinationbanner')
        this.add.sprite(game.config.width / 5, 9 * game.config.height / 16, 'statszone')
        this.add.text(400, 2 * game.config.height / 8, 'Day ' + (this.ship.totalDaysTravelled + 1) + ': ' + this.ship.currentPlanet.name);
        this.add.text(395, 2.5 * game.config.height / 8, 'You may only travel to a planet if your engine is');
        this.add.text(395, 3 * game.config.height / 8, 'powerful or efficient enough!');
        this.add.text(395, 3.5 * game.config.height / 8, 'Ship engine efficiency (distance per unit of engine output): ' + this.ship.engine.engineEfficiency);
        

        // temporary button for giving free fuel (for prototype testing)


        /*
            i made a separate class for a button object, so that we can apply graphical
            changes to the button depending on the attributes of the planet
            (we pass in the planet the button is representing as the planet objects we made in create())
        */
        this.planetButton = new PlanetButtonObject(this, 395, 455, 'planetbutton', 0, this.planetData);
        // hard code in the second planet for now:
        this.planetButton2 = new PlanetButtonObject(this, 565, 455, 'planetbutton', 0, this.planetData2);
    }

    loadPlanetMenu(planet) {
        // the callback function for the 'pointerdown' listener on the planet button
        // later on, the UI would know the info about the planet, and display it accordingly

        // start next scene (we can add the intermediary scene between this one and planetscene later)
        this.scene.start('planetscene', planet);

        this.ship.travel(planet);
    }

    giveFreeFuel() {
        this.ship.fuelAmount += 50;
        this.maxTravelDistance = this.ship.maxTravelDistance; 
        this.fuelAmountText.text = 'Ship fuel amount: ' + this.ship.fuelAmount + ', max fuel: ' + this.ship.maxFuelAmount;
    }

    inputSetup() {

    }
}