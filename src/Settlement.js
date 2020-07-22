/*
what's in a settlement?
    civilians/people
        talk to you
        give news
        give items
        keep you less lonely
    traders/merchants
        buy your stuff
        sell you stuff
        trade with your stuff
    ship upgraders/mechanics
        work on ship for money
        

what to randomize:
    number of interactable people
    what they sell/trade


How will we display this information in SettlementMenu scene?


*/


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

        // somewhere from 1 to 4 ppl for now lmao
        this.population = Phaser.Math.Between(1, 4);

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