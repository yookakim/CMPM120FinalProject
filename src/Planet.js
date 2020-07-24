/* 
    Base planet class that holds objects such as settlements and data such 
    as planet name and distance

    Yooha Kim
*/

'use strict';

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
        
        this.travelTime;

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
        // this.planetMass;

        // new settlement object
        /* 
        in the future how would we do this dynamically (for example, if a planet is desolate)
        would we just leave this.inhabitants as null?
        */
        this.inhabitants;

        this.ecosystem;

        //this.atmosphere;
    }

    get planetDistance() {
        // return this instance's planetDistance property
        return this._planetDistance;
    }

    // before I said that nothing else should change the planet's distance,
    // but leave this setter method here to define when constructing planets from the factory
    set planetDistance(distance) {
        this._planetDistance = distance;
    }
}