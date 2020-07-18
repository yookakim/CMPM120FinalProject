'use strict';

class Civilian {
    constructor(name, age, wealth) {
        
        // some basic stats to play around with (as long as we have the base citizen object we can add whatever later)
        // could be possible to use inheritance to create some scripted custom people as well, or other types of civilians
        this.name = name;
        this.age = age;
        this.wealth = wealth;
        this.hasVisited = false;

        
    }

    // prototype player interaction method
    /* 
    hopefully later we can add smoething that isn't just giving free money
    */

    // let's do a simple thing where talking to a civilian gives you free money
    // treasury is stored globally as ship.treasury (is it even ok to store it globally like thsi? idk)

    giveMoney() {

        // again, it feels sketchy directly changing a global variable like this but idk what else to do lmao
        if (this.wealth > 0) {
            ship.treasury++;
            this.wealth--;
        } else {
            console.log('i dont have enough money to give you.');
        }
    }
}