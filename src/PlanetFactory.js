'use strict';

// create Planet game object, then assign values to properties
class PlanetFactory {
    constructor (number) {
        // properties to manage planet randomization
        // randomization properties change dynamically as game goes on
        this.ship = ship;

        this.planetArray = [];
        this.generateNumber = number;


        // honestly we could put this sort of stuff in one big data file?
        // consider doing weighted randomizations later
        this.nameList = ['Earth', 'Moocury', 'LittleBig', 'Tatooine', 'RFX-240', 'Goopiter', 'Slimeworld'];
    }

    generatePlanets() {
        
        /* 
            planet stuff is hard coded for easy testing for now, but
            ideally in the future we would be given to us a bunch of random planets
            with random settlements and things and sizes and atmosphers to choose from
         */

        // this.planetArray = [
        //     new Planet('earth'),
        //     new Planet('moocury'),
        // ]

        // this.planetArray.forEach((element, index) => {

        // });

        // for every generateNumber:
        for (var i = 0; i < this.generateNumber; i++) {
            this.planetArray[i] = new Planet();
            this.planetArray[i].name = this.generatePlanetName();
            this.planetArray[i].planetDistance = this.generateDistance();
            // this.planetArray[i].inhabitants = this.generateSettlements();
        }

        /* 
        we hard code here with array indices, but the goal is to
        iterate through the array to create random planets 
        */

        // this.planetArray[0].planetDistance = 360
        // this.planetArray[1].planetDistance = 1050;
        
        // this.planetArray[0].inhabitants = new Settlement('united states of america');
        // this.planetArray[1].inhabitants = new Settlement('cowland');

        // this.planetArray[1].inhabitants.civilians = [
        //     new Civilian('hardcodedbob', 21, 100),
        //     new Civilian('hardcodedtom', 10, 4),
        //     new Civilian('elderjim', 104, 50),
        // ];
        return this.planetArray;
    }

    generatePlanetName() {
        // return a random string out of an array of random names?
        return this.nameList[Phaser.Math.Between(0, this.nameList.length - 1)];
    }

    generateDistance() {
        // for now returns something between these hard-coded numbers 
        return Phaser.Math.Between(400, 1100);
    }

    // generateSettlements() {
    //     var tempSettlement = new Settlement();
    //     // random population, but we could later add things that affect population size
    //     // if it's a ghost town, it could have 0 living ppl
    //     // depending on planet attributes, there could be more people livign there, less, different kinds of people, etc
    //     // but doing all of that would be pretty complicated
        
    //     // somewhere from 0 to 3 ppl for now lmao
    //     var population = Phaser.Math.Between(0, 3);
    //     if (population != 0) {
    //         // if not abandoned, generate however many people
    //         for (var i = 0; i < population - 1; i++) {
    //             tempSettlement.civilians[i] = 
    //         }
    //     } else {
    //         // nobody living here, abandoned
    //         tempSettlement.abandoned = true;
    //     }
    //     return tempSettlement;
    // }


}