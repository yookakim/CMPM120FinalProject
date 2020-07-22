'use strict';

// create Planet game object, then assign values to properties
class PlanetFactory {
    constructor (number) {
        // properties to manage planet randomization
        // randomization properties change dynamically as game goes on

        this.planetArray = [];
        this.generateNumber = number;

        // make sure at least one of the planets are travellable
        this.travellablePlanetMade = false;

        // honestly we could put this sort of stuff in one big data file?
        // consider doing weighted randomizations later
        this.planetNameList = ['Earth', 'Moocury', 'LittleBig', 'Tatooine', 'RFX-240', 'Goopiter', 'Slimeworld'];
        this.settlementNameList = ['Los Angeles', 'Bikini Bottom', 'UCSC', 'Whale Island', 'Village McVillageface'];
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
            var currentPlanet = this.planetArray[i];
            currentPlanet.name = this.generatePlanetName();
            currentPlanet.planetDistance = this.generateDistance();            
            currentPlanet.travelTime =  Phaser.Math.Snap.Ceil(
                (currentPlanet.planetDistance / (ship.engine.engineOutput)), 1);
            if (currentPlanet.planetDistance < ship.maxTravelDistance) {
                this.travellablePlanetMade = true;
            }

            currentPlanet.ecosystem = this.generateEcosystem(currentPlanet);
            // generate settlement based on properties of current planet
            currentPlanet.inhabitants = this.generateSettlements(currentPlanet);
        }

        while (!this.travellablePlanetMade) {
            console.log('no travellable planets created; recreating in random index...');
            var randomIndex = Phaser.Math.Between(0, this.planetArray.length - 1);
            this.planetArray[randomIndex] = null;
            this.planetArray[randomIndex] = new Planet();
            var replacementPlanet = this.planetArray[randomIndex];
            replacementPlanet.name = this.generatePlanetName();
            replacementPlanet.planetDistance = this.generateDistance();            
            replacementPlanet.travelTime =  Phaser.Math.Snap.Ceil(
                (replacementPlanet.planetDistance / (ship.engine.engineOutput)), 1);
            if (replacementPlanet.planetDistance < ship.maxTravelDistance) {
                console.log('travellable planet found, inserted at index ' + randomIndex);
                this.travellablePlanetMade = true;
            }
            replacementPlanet.ecosystem = this.generateEcosystem(replacementPlanet);
            replacementPlanet.inhabitants = this.generateSettlements(replacementPlanet);
        }

        this.travellablePlanetMade = false;

        return this.planetArray;
    }

    generatePlanetName() {
        // return a random string out of an array of random names?
        return this.planetNameList[Phaser.Math.Between(0, this.planetNameList.length - 1)];
    }

    generateDistance() {
        // for now returns something between these hard-coded numbers 
        // for generating distance, 
        return Phaser.Math.Between(300, 1200);
    }

    generateEcosystem(planet) {
        // will the planet be Temperate, Icy, Dry, or Humid
        var tempEcosystem = new Ecosystem(planet);
        return tempEcosystem;
    }

    generateSettlements(planet) {
        var tempSettlement = new Settlement(
            this.settlementNameList[Phaser.Math.Between(0, this.settlementNameList.length - 1)],
            planet
        );
        // random population, but we could later add things that affect population size
        // if it's a ghost town, it could have 0 living ppl
        // depending on planet attributes, there could be more people livign there, less, different kinds of people, etc
        // but doing all of that would be pretty complicated
        

        return tempSettlement;
    }
}