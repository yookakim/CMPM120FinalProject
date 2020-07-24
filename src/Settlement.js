/*
    Class representing the village/settlement objects which
    creates random civilians upon instantiation 

    Yooha Kim
*/

'use strict';

class Settlement {
    constructor(name, planet) {
        // tbh it might be a lot of work making ALL of this including civilians and stuff random gen LOL
        // but idk
        if (!name) {
            this.name = 'nameisnull';
        } else {
            this.settlementName = name;
        }

        this.settlementName = name;
        this.hostPlanet = planet;

        // somewhere from 3 to 5 ppl for now lmao
        this.population = Phaser.Math.Between(3, 5);

        this.abandoned = false;
        // array of civilians
        this.traders;
        
        this.civilians = [];
        this.generateCivilians();
    }



    generateCivilians() {
        
        
        if (this.population != 0) {
            // if not abandoned, generate however many people
            for (var i = 0; i <= this.population - 1; i++) {
                this.civilians[i] = CivilianFactory(this.hostPlanet);
            }
        } else if (this.population === 0) {
            // nobody living here, abandoned
            this.abandoned = true;
        }        
    }
}