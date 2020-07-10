class Ship {
    // we create an instance of this object in main.js
    // store ship behavior here

    constructor(game) {
        // pass in the instance of the main game
        this.game = game;

        // create a new Engine component and attach
        this.engine = new Engine(game);


        this.currentPlanet = this.game.registry.get('INITIAL_PLANET_OBJECT');
        this.maxFuelAmount = this.game.registry.get('INITIAL_SHIP_MAX_FUEL');
        this.totalDaysTravelled = 0;
        this.lastTravelTime = 0;
        
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

        // my temporary travel time calculation: (planet distance / (engine's output + (engine's effiency * 3)))
        // the Ceil method rounds up so that we dont have decimal number days
        this.lastTravelTime = Phaser.Math.Snap.Ceil((planet.planetDistance / (this.engine.engineOutput + (this.engine.engineEfficiency * 3))), 1);
        this.totalDaysTravelled = this.totalDaysTravelled + this.lastTravelTime;
    }
}