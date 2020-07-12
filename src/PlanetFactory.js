'use strict';

// create Planet game object, then assign values to properties
class PlanetFactory {
    constructor () {
        // properties to manage planet randomization
        // randomization properties change dynamically as game goes on
        this.planetArray;
    }
    generatePlanets() {
        
        /* 
            planet stuff is hard coded for easy testing for now, but
            ideally in the future we would be given to us a bunch of random planets
            with random settlements and things and sizes and atmosphers to choose from
         */

        this.planetArray = [
            new Planet('earth'),
            new Planet('moocury'),
        ]

        /* 
        we hard code here with array indices, but the goal is to
        iterate through the array to create random planets 
        */

        this.planetArray[0].planetDistance = 360
        this.planetArray[1].planetDistance = 1050;
        
        this.planetArray[0].inhabitants = new Settlement('united states of america');
        this.planetArray[1].inhabitants = new Settlement('cowland');

        this.planetArray[1].inhabitants.civilians = [
            new Civilian('hardcodedbob', 21, 100),
            new Civilian('hardcodedtom', 10, 4),
            new Civilian('elderjim', 104, 50),
        ];
        return this.planetArray;
    }
}