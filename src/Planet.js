/* 
    Base planet class that holds objects such as settlements and data such 
    as planet name and distance

    Yooha Kim
*/

'use strict';

class Planet {

    constructor(planetName) {


        this.name = planetName;

        this._planetDistance = game.registry.get('PLACEHOLDER_PLANET_DISTANCE');
        
        this.travelTime;

        this.inhabitants;

        this.ecosystem;

    }

    get planetDistance() {
        // return this instance's planetDistance property
        return this._planetDistance;
    }

    set planetDistance(distance) {
        this._planetDistance = distance;
    }
}