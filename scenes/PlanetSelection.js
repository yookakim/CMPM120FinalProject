'use strict';

/* 
    Scene for selecting the destination planet
*/

class PlanetSelection extends Phaser.Scene {
    
    constructor() {

        super('planetselection');
        this.ship = ship;
        this.maxTravelDistance;

        // things could alter how many planets get generated later
        this.planetFactory = new PlanetFactory(4);
    }

    preload() {


    }

    create() {
        // this.scene.launch('sceneui');


        // calculating the current max travel distance possible:
        // for now, let's just make the ship travel 8 units of distance per one unit of fuel
        // to keep things simple
        
        this.maxTravelDistance = this.ship.maxTravelDistance;

        // grab the array of planets we created in the planet factory
        this.planetGroup = this.planetFactory.generatePlanets();



        // in the future, planet generation, planet data loading, loading UI for respective planets, will all 
        // happen in one clean function here hopefully
        this.loadUI();
        this.scene.launch('planetselectionui', this.planetGroup);
        // this.scene.wake('planetselectionui');
        this.inputSetup();        
    }

    update() {

    }
    

    loadUI() {
        this.add.text(0, 400, 'planetselectiondebug');

    }



    giveFreeFuel() {
        this.ship.fuelAmount += 50;
        this.maxTravelDistance = this.ship.maxTravelDistance; 
        this.fuelAmountText.text = 'Ship fuel amount: ' + this.ship.fuelAmount + ', max fuel: ' + this.ship.maxFuelAmount;
    }

    inputSetup() {

    }
}