'use strict';

class Civilian {
    constructor(name, age, wealth) {
        
        // some basic stats to play around with (as long as we have the base citizen object we can add whatever later)
        // could be possible to use inheritance to create some scripted custom people as well, or other types of civilians
        this.name = name;
        this.age = age;
        this.wealth = wealth;

        this.hasVisited = false;

        this.components = {};

        // this.addComponents(civilianType);
    }

    // prototype player interaction method
    /* 
    hopefully later we can add smoething that isn't just giving free money
    */

    sayGreeting() {
        var greetingString = '';
        
        if (!this.hasVisited) {
            if (this.components.hasOwnProperty('child')) {
                greetingString += this.components.child.greetings[Phaser.Math.Between(0, this.components.child.greetings.length - 1)];
            }
            greetingString += 'My name is ' + this.name + '!';
            if (this.components.hasOwnProperty('merchant')) {
                greetingString += ' Care to look at some of my wares?';
            }
            this.hasVisited = true;
        } else {
            greetingString = 'Nice to see you again!';
            
        }
        return greetingString;
    }

    addComponents(type) {
    
        // let value = this.itemObject.components[componentList[i]]["value"];
        let component = new GameComponents[type]();
        this.components[type] = component;
    }
}