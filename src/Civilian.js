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

    getText() {
        
        var textObject = {
            greetingString: '',
            title: ''
        }
        
        
        // if (!this.hasVisited) {
        //     if (this.components.hasOwnProperty('child')) {
        //         greetingString += this.components.child.greetings[Phaser.Math.Between(0, this.components.child.greetings.length - 1)];
        //     }
        //     greetingString += '\nMy name is ' + this.name + '!';
            
          
        // } else if (this.hasVisited) {
        //     greetingString += 'Nice to see you again!';
        // }
        
        // if (this.ship.hoursLeftInDay < 1) {

        //     greetingString += ' Don\'t you think it\'s getting a little too late to talk? I\'m tired.';   

        // } else if (this.ship.hoursLeftInDay > 0) {
            
        //     greetingString += ' I have ' + this.wealth + ' gold pieces in my wallet! Just felt like letting you know.';
        //     this.ship.spendTime(1);
        //     if (this.components.hasOwnProperty('merchant')) {
        //         // if civilian is merchant:
        //         greetingString += '\n \nCare to look at some of my wares?';
        //         if (this.components.hasOwnProperty('child')) {
        //             // if merchant AND child
        //             greetingString += '\nBelieve it or not, I\'m growing up to become the richest merchant all throughout the stars!';
        //         }
        //     }
            

        // }

        /* 
            this.components.hasOwnProperty('civilian')
            this.components.hasOwnProperty('child')
            this.components.hasOwnProperty('merchant')
            this.components.hasOwnProperty('outcast')
        */


        // 1

        // ten conditions

        // civilian types:
        var cond1 = (this.components.hasOwnProperty('civilian') && 
                    !this.components.hasOwnProperty('merchant') &&
                    !this.components.hasOwnProperty('child') &&
                    !this.components.hasOwnProperty('outcast'));
        var cond2 = (this.components.hasOwnProperty('civilian') && 
                    !this.components.hasOwnProperty('merchant') &&
                    this.components.hasOwnProperty('child') &&
                    !this.components.hasOwnProperty('outcast'));
        var cond3 = (this.components.hasOwnProperty('civilian') && 
                    this.components.hasOwnProperty('merchant') &&
                    this.components.hasOwnProperty('child') &&
                    !this.components.hasOwnProperty('outcast'));
        var cond4 = (this.components.hasOwnProperty('civilian') && 
                    this.components.hasOwnProperty('merchant') &&
                    !this.components.hasOwnProperty('child') &&
                    !this.components.hasOwnProperty('outcast'));

        // outcast types:
        var cond5 = (!this.components.hasOwnProperty('civilian') && 
                    !this.components.hasOwnProperty('merchant') &&
                    !this.components.hasOwnProperty('child') &&
                    this.components.hasOwnProperty('outcast'));
        var cond6 = (!this.components.hasOwnProperty('civilian') && 
                    !this.components.hasOwnProperty('merchant') &&
                    this.components.hasOwnProperty('child') &&
                    this.components.hasOwnProperty('outcast'));
        var cond7 = (!this.components.hasOwnProperty('civilian') && 
                    this.components.hasOwnProperty('merchant') &&
                    this.components.hasOwnProperty('child') &&
                    this.components.hasOwnProperty('outcast'));
        var cond8 = (!this.components.hasOwnProperty('civilian') && 
                    this.components.hasOwnProperty('merchant') &&
                    !this.components.hasOwnProperty('child') &&
                    this.components.hasOwnProperty('outcast'));


        if (cond1) {
            //greetingString += '\nMy name is ' + this.name + '!';
            textObject.greetingString = 'How are you doing, my name is ' + this.name + '.';
            textObject.title = '- Civilian -';
        }
        // 2
        if (cond2) {
            textObject.greetingString = 'Hi! I want somebody to play with!';
            textObject.title = '- Civilian - Child -';
        }
        //3
        if (cond3) {
            textObject.greetingString = 'I\'m going to become the richest of the rich! Buy my things!';
            textObject.title = '- Civilian - Merchant - Child -';
        }
        //4
        if (cond4) {
            textObject.greetingString = 'How are you? I\'m ' + this.name + ', take a look at some of my wares!';
            textObject.title = '- Civilian - Merchant -';
        }
        //5
        if (cond5) {
            textObject.greetingString = 'What do you want?';
            textObject.title = '- Outcast -';
        }
        //6
        if (cond6) {
            textObject.greetingString = 'When I grow up... I\'m not turning out like everybody else.';
            textObject.title = '- Child - Outcast -';
        }
        //7
        if (cond7) {
            textObject.greetingString = 'I\'m ' + this.name + '. None of the older ones like what I\'m getting myself into... but you\'ll look at what I\'m selling, right?';
            textObject.title = '- Child - Merchant - Outcast -';
        }
        //8
        if (cond8) {
            textObject.greetingString = 'The name\'s ' + this.name + '...take a look at my stuff... you won\'t regret it.';
            textObject.title = '- Merchant - Outcast -';
        }
         
        else if (this.ship.hoursLeftInDay < 1) {
            textObject.greetingString = ' Don\'t you think it\'s getting a little too late to talk? I\'m tired.';   

        }

        return textObject;
    }

    addComponents(type) {
    
        // let value = this.itemObject.components[componentList[i]]["value"];
        let component = new GameComponents[type]();
        this.components[type] = component;
    }
}