'use strict';
class PlanetSelection extends Phaser.Scene {
    
    constructor() {

        super('planetselection');
        this.ship = ship;
        this.maxTravelDistance;
    }

    preload() {

        this.load.image('planetbutton', './assets/temp_planet.png');
        this.load.image('fuelbutton', './assets/fuel_button.png');
    }

    create() {
        
        // calculating the current max travel distance possible:
        // for now, let's just make the ship travel 8 units of distance per one unit of fuel
        // to keep things simple
        

        /* 
            here we manually create the two planets for testing reasons, but
            ideally in the future we would be randomly given to us a bunch of planets
            to choose from and they would all be represented in the UI
         */

        this.maxTravelDistance = this.ship.maxTravelDistance;

        this.planet = new Planet('earth');
        this.planet2 = new Planet('moocury');

        // and then we hard code the values for now 
        this.planet.planetDistance = 360;
        this.planet2.planetDistance = 1050;
        
        // later we might automatically generate them somehow
        // probably using a factory class of some kind

        // i hardcode everything for now!! easy on brain

        // we make planet data objects that we pass into the UI so it knows what to draw (automate later)

        this.planetData = {
            planet: this.planet,
            travelTime: Phaser.Math.Snap.Ceil(
                this.planet.planetDistance / (this.ship.engine.engineOutput + (this.ship.engine.engineEfficiency * 3)), 1),
        };

        this.planetData2 = {
            planet: this.planet2,
            travelTime: Phaser.Math.Snap.Ceil(
                this.planet2.planetDistance / (this.ship.engine.engineOutput + (this.ship.engine.engineEfficiency * 3)), 1),
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
        this.add.text(400, 10, 'Day ' + (this.ship.totalDaysTravelled + 1) + ': ' + this.ship.currentPlanet.name);
        this.add.text(10, 70, 'You may only travel to a planet if your engine is');
        this.add.text(10, 90, 'powerful or efficient enough!');
        this.add.text(10, 130, 'Ship engine efficiency (distance per unit of engine output): ' + this.ship.engine.engineEfficiency);
        

        // temporary button for giving free fuel (for prototype testing)


        /*
            i made a separate class for a button object, so that we can apply graphical
            changes to the button depending on the attributes of the planet
            (we pass in the planet the button is representing as the planet objects we made in create())
        */
        this.planetButton = new PlanetButtonObject(this, 295, 395, 'planetbutton', 0, this.planetData);
        // hard code in the second planet for now:
        this.planetButton2 = new PlanetButtonObject(this, 465, 395, 'planetbutton', 0, this.planetData2);
    }

    loadPlanetMenu(planet) {
        // the callback function for the 'pointerdown' listener on the planet button
        // later on, the UI would know the info about the planet, and display it accordingly
        
        /* 
            set the game to "remember" current state of the planet
         */
        game.registry.set('tempPlanet', planet);

        // start next scene (we can add the intermediary scene between this one and planetmenu later)
        this.scene.start('planetmenu');

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