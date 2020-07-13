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
    constructor(name) {
        // tbh it might be a lot of work making ALL of this including civilians and stuff random gen LOL
        // but idk
        if (!name) {
            this.name = 'nameisnull';
        } else {
            this.settlementName = name;
        }

        this.settlementName = name;
        
        // somewhere from 0 to 3 ppl for now lmao
        this.population = Phaser.Math.Between(0, 3);

        this.abandoned = false;
        // array of civilians
        this.traders;
        
        this.civilianNames = ['Jack', 'Beck', 'Carl', 'Ashley', 'Sarah', 'Phil', 'June', 'Karen', 'Obama',
        'Naruto', 'Morty', 'Grey', 'Skywalker' ];
        
        this.civilians = [];
        this.generateCivilians();
    }



    generateCivilians() {
        
        
        if (this.population != 0) {
            // if not abandoned, generate however many people
            for (var i = 0; i <= this.population - 1; i++) {
                this.civilians[i] = new Civilian(this.randomizeName(), this.randomizeAge(), this.randomizeWealth());
            }
        } else if (this.population === 0) {
            // nobody living here, abandoned
            this.abandoned = true;
        }        
    }

    randomizeName() {
        return this.civilianNames[Phaser.Math.Between(0, this.civilianNames.length - 1)];
    }

    randomizeAge() {
        return Phaser.Math.Between(3, 80);
    }

    randomizeWealth() {
        return Phaser.Math.Between(0, 100);
    }
    
}