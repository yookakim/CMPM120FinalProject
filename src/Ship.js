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

        // start with max fuel
        this._fuelAmount = this.maxFuelAmount;
        
        // set initial max travel distanec
        this._maxTravelDistance = this._fuelAmount * this.engine.engineEfficiency;
    }
    
    get fuelAmount() {
        return this._fuelAmount;
    }
    set fuelAmount(value) {
        if (value <= this.maxFuelAmount) {
            this._fuelAmount = value;
        }
        this._maxTravelDistance = this.fuelAmount * this.engine.engineEfficiency;
    }

    get maxTravelDistance() {
        // ship.maxTravelDistance
        // returns the product of fuel left and engine's efficiency
        return this._fuelAmount * this.engine.engineEfficiency;
    }

    travel(planet) {
        this.currentPlanet = planet;
        this._fuelAmount = this._fuelAmount - (planet.planetDistance / this.engine.engineEfficiency);
        this.lastTravelTime = Phaser.Math.Snap.Ceil((planet.planetDistance / this.engine.engineOutput), 1);
        this.totalDaysTravelled = this.totalDaysTravelled + this.lastTravelTime;
    }
}