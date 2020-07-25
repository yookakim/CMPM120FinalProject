/* 
    global singleton used for keeping player and spaceship data

    Yooha Kim
*/

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
        this.inventory = new Inventory(8, this);
        
        


        // ship stats
        this.currentPlanet = this.game.registry.get('INITIAL_PLANET_OBJECT');

        this.totalDaysTravelled = 0;
        this.lastTravelTime = 0;

        // distance units in this game: light years
        this.totalTravelDistance = 0;

        // player money:
        this.treasury = 0;

        // initally set max time in day to 12 chunks
        this.totalTimeInDay = 12;
        this.hoursLeftInDay;

        this.maxSanity = this.game.registry.get('INITIAL_MAX_SANITY');
        this.sanity = this.maxSanity / 2;
        this.lastSanityChange = 0;

        // default .5, check bonuses every turn and subtract if passive item in inventory
        this.sanityLossFactor = -.5;
        
        // set initial max travel distance
        this._maxTravelDistance = this.engine.engineOutput * this.engine.engineEfficiency;
    }


    get maxTravelDistance() {
        // ship.maxTravelDistance
        // returns the product of fuel left and engine's efficiency
        return this.engine.engineOutput * this.engine.engineEfficiency;
    }

    travel(planet) {
        this.currentPlanet = planet;

        // the Ceil method rounds up so that we dont have decimal number days
        this.lastTravelTime = planet.travelTime;

        var thisTurnSanityLoss = this.sanityLossFactor;

        for (var i = 0; i < this.inventory.contents.length; i++) {
            if (this.inventory.contents[i] != null) {
                if (this.inventory.contents[i].components.hasOwnProperty('passiveSanityIncrease')) {
                    thisTurnSanityLoss = this.sanityLossFactor + this.inventory.contents[i].components.passiveSanityIncrease.amount;
                }
            }
        }
        this.lastSanityChange = thisTurnSanityLoss * this.lastTravelTime;
        this.changeSanity(this.lastSanityChange);

        // +1 because once you arrive on destination you don't leave until the next day
        this.totalDaysTravelled = this.totalDaysTravelled + this.lastTravelTime + 1;
        this.totalTravelDistance = this.totalTravelDistance + planet.planetDistance;
        console.log(this.totalTravelDistance);
    }

    resetTime() {
        this.hoursLeftInDay = this.totalTimeInDay;
    }

    spendTime(value) {
        this.hoursLeftInDay -= value;
    }

    // decrease sanity; might be other factors changing how this works later
    changeSanity(value) {
        // lose one sanity every two days by default
        console.log(this.inventory);



        // sanity change is travel time * sanity loss, turned into a negative number
        

        if (this.sanity + value > 0 && this.sanity + value < 100) {
            this.sanity = this.sanity + value;
        } else if (this.sanity + value > this.maxSanity) {
            this.sanity = 99;
        } else if (this.sanity + value < 0) {
            this.sanity = 0;
        }

    }

    // traverseItemEffects() {
    //     for(var i = 0; i < this.inventory.inventoryArray.length; i++) {
    //         this.inventory.inventoryArray[index].
    //     }
    // }
}