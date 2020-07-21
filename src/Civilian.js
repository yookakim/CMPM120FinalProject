'use strict';

class Civilian {
    constructor(name, age, wealth) {
        
        // some basic stats to play around with (as long as we have the base citizen object we can add whatever later)
        // could be possible to use inheritance to create some scripted custom people as well, or other types of civilians
        this.name = name;
        this.age = age;
        this.wealth = wealth;
        this.ship = ship;

        this.hasVisited = false;

        // we attach inventory in civilian factory
        this.inventory;

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
            greetingString += '\nMy name is ' + this.name + '!';
            
          
        } else if (this.hasVisited) {
            greetingString += 'Nice to see you again!';
        }
        
        if (this.ship.hoursLeftInDay < 1) {

            greetingString += ' Don\'t you think it\'s getting a little too late to talk? I\'m tired.';   

        } else if (this.ship.hoursLeftInDay > 0) {
            
            greetingString += ' I have ' + this.wealth + ' gold pieces in my wallet! Just felt like letting you know.';
            this.ship.spendTime(1);
            if (this.components.hasOwnProperty('merchant')) {
                greetingString += '\n \nCare to look at some of my wares?';
            }

        }
        
         
        return greetingString;
    }

    addComponents(type) {
    
        // let value = this.itemObject.components[componentList[i]]["value"];
        let component = new GameComponents[type]();
        this.components[type] = component;
    }
}