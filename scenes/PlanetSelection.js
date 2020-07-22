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

        // just travelled, so reset the hours left in the day
        this.ship.resetTime();

        // calculating the current max travel distance possible:
        // for now, let's just make the ship travel 8 units of distance per one unit of fuel
        // to keep things simple
        
        this.maxTravelDistance = this.ship.maxTravelDistance;

        // grab the array of planets we created in the planet factory
        this.planetGroup = this.planetFactory.generatePlanets();

        // this.ship.inventory.inventoryAdd();



        // in the future, planet generation, planet data loading, loading UI for respective planets, will all 
        // happen in one clean function here hopefully
        
        // launch the UI scene containing all the interactables and panels
        this.scene.launch('planetselectionui', {
            planets: this.planetGroup,
            containerScene: this,
        });
        // this.scene.wake('planetselectionui');
        this.inputSetup();        
    }

    update() {
        
        
  
    }

    giveFreeFuel() {
        this.ship.fuelAmount += 50;
        this.maxTravelDistance = this.ship.maxTravelDistance; 
        this.fuelAmountText.text = 'Ship fuel amount: ' + this.ship.fuelAmount + ', max fuel: ' + this.ship.maxFuelAmount;
    }

    loadInventoryMenu() {
        this.scene.stop('planetselectionui');
        this.scene.sleep('planetselection');

        this.scene.start('inventoryscene');
    }

    loadPlanetMenu(planet) {
        
        // the callback function for the 'pointerdown' listener on the planet button
        // later on, the UI would know the info about the planet, and display it accordingly
        this.sound.play('launchsound', DEFAULT_SFX_CONFIG);
        // start next scene (we can add the intermediary scene between this one and planetscene later)
        ship.travel(planet);
        
        if (this.ship.totalDaysTravelled >= game.registry.get('GAME_PLAYTHROUGH_TOTAL_DAYS') - 1) {
            // load end game scene, and "settle in" on new planet
            this.scene.start('endgamescene');
        } else {
            this.scene.start('planetscene', planet);
        } 
        
        
        this.scene.stop('planetselectionui');
        this.scene.stop('planetselection');

    }    
    
    inputSetup() {

    }
}