class Planet {

    constructor(planetName) {


        this.name = planetName;
        // the distance of the planet is hard coded for now (in main.js)

        /*         
            depending on the mechanic we choose to implement (depending on scope)
            we might be able to choose to do some kind of real positioning system
            where the planets are actually a tangible distance away from the ship 

            or, when we instantiate new Planets to travel to before we get to choose in PlanetSelection,
            we choose a random distance and pass it through the constructor
        */

        this._planetDistance = game.registry.get('PLACEHOLDER_PLANET_DISTANCE');
        
        /* 
            Since a Planet object could be home to a number of other things, 
            like a town, inhabitants, resources, materials, etc.
            their behaviors would probably be defined separately in classes and then
            become properties of this Planet object

            this.inhabitants;
            this.atmosphere;
            this.resources;

            etc.
        */
        this.planetMass;

        // new settlement object
        this.inhabitants;
        this.atmosphere;
    }

    get planetDistance() {
        // return this instance's planetDistance property
        return this._planetDistance;
    }

    // delete this later, nothing outside this class has no business changing the distance
    // here for testing and debugging before random generation
    set planetDistance(distance) {
        this._planetDistance = distance;
    }
}