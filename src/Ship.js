'use strict';

class Ship {
    // we create an instance of this object in main.js
    // store ship behavior here

    constructor(game) {
        // pass in the instance of the main game
        this.game = game;

        // create a new Engine component and attach
        this.engine = new Engine();

        // storing items
        this.inventory = new Inventory(7, this);
        
        


        // ship stats
        this.currentPlanet = this.game.registry.get('INITIAL_PLANET_OBJECT');
        this.maxFuelAmount = this.game.registry.get('INITIAL_SHIP_MAX_FUEL');

        this.totalDaysTravelled = 0;
        this.lastTravelTime = 0;

        // player money:
        this.treasury = 0;

        // initally set max time in day to 12 chunks
        this.totalTimeInDay = 12;
        this.hoursLeftInDay;

        this.maxSanity = this.game.registry.get('INITIAL_MAX_SANITY');
        this.sanity = this.maxSanity / 2;
        this.sanityLossFactor = 2;
        
        // set initial max travel distanec
        this._maxTravelDistance = this.engine.engineOutput * this.engine.engineEfficiency;
    }


    get maxTravelDistance() {
        // ship.maxTravelDistance
        // returns the product of fuel left and engine's efficiency
        return this.engine.engineOutput * this.engine.engineEfficiency;
    }

    travel(planet) {
        this.currentPlanet = planet;
        // this.traverseItemEffects();
        // my temporary travel time calculation: (planet distance / (engine's output + (engine's effiency * 3)))
        // the Ceil method rounds up so that we dont have decimal number days
        this.lastTravelTime = planet.travelTime;
        this.changeSanity();
        // +1 because once you arrive on destination you don't leave until the next day
        this.totalDaysTravelled = this.totalDaysTravelled + this.lastTravelTime + 1;
    }

    resetTime() {
        this.hoursLeftInDay = this.totalTimeInDay;
    }

    spendTime(value) {
        this.hoursLeftInDay -= value;
    }

    // decrease sanity; might be other factors changing how this works later
    changeSanity() {
        // for now just decrease by .5 for every day in travel
        this.sanity = this.sanity - this.lastTravelTime / this.sanityLossFactor;

    }

    // traverseItemEffects() {
    //     for(var i = 0; i < this.inventory.inventoryArray.length; i++) {
    //         this.inventory.inventoryArray[index].
    //     }
    // }
}