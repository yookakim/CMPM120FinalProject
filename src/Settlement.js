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
        this.settlementName = name;

        // array of civilians
        this.civilians;
        this.traders;
    }

    // let's do a simple thing where talking to a civilian gives you free money
    // treasury is stored globally as ship.treasury (is it even ok to store it globally like thsi? idk)

    
}