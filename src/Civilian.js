'use strict';

/* 
    Civilian object instantiated at planet generation, holds dialogue
    and respective behavioral components

    Yooha Kim
*/

class Civilian {
    constructor(name, age, wealth, hostPlanet) {
        
        // some basic stats to play around with (as long as we have the base citizen object we can add whatever later)
        // could be possible to use inheritance to create some scripted custom people as well, or other types of civilians
        this.name = name;
        this.age = age;
        this.wealth = wealth;
        this.ship = ship;

        this.hasVisited = false;

        this.hostPlanet = hostPlanet;

        // we attach inventory in civilian factory
        this.inventory;

        this.components = {};


        

        // this.addComponents(civilianType);
    }


    getGreeting() {

        this.CIV = 
                    (this.components.hasOwnProperty('civilian') && 
                    !this.components.hasOwnProperty('merchant') &&
                    !this.components.hasOwnProperty('child') &&
                    !this.components.hasOwnProperty('outcast'));
        this.CIV_CHILD = 
                    (this.components.hasOwnProperty('civilian') && 
                    !this.components.hasOwnProperty('merchant') &&
                    this.components.hasOwnProperty('child') &&
                    !this.components.hasOwnProperty('outcast'));
        this.CIV_MERC_CHILD = 
                    (this.components.hasOwnProperty('civilian') && 
                    this.components.hasOwnProperty('merchant') &&
                    this.components.hasOwnProperty('child') &&
                    !this.components.hasOwnProperty('outcast'));
        this.CIV_MERC = 
                    (this.components.hasOwnProperty('civilian') && 
                    this.components.hasOwnProperty('merchant') &&
                    !this.components.hasOwnProperty('child') &&
                    !this.components.hasOwnProperty('outcast'));

        // outcast types:
        this.OUT = 
                    (!this.components.hasOwnProperty('civilian') && 
                    !this.components.hasOwnProperty('merchant') &&
                    !this.components.hasOwnProperty('child') &&
                    this.components.hasOwnProperty('outcast'));
        this.OUT_CHILD = 
                    (!this.components.hasOwnProperty('civilian') && 
                    !this.components.hasOwnProperty('merchant') &&
                    this.components.hasOwnProperty('child') &&
                    this.components.hasOwnProperty('outcast'));
        this.OUT_MERC_CHILD = 
                    (!this.components.hasOwnProperty('civilian') && 
                    this.components.hasOwnProperty('merchant') &&
                    this.components.hasOwnProperty('child') &&
                    this.components.hasOwnProperty('outcast'));
        this.OUT_MERC = 
                    (!this.components.hasOwnProperty('civilian') && 
                    this.components.hasOwnProperty('merchant') &&
                    !this.components.hasOwnProperty('child') &&
                    this.components.hasOwnProperty('outcast'));    
                        
        var dialogueObject = {
            greetingString: '',
            tooLateString: '',
            titles: ''
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

        // eight conditions

        // civilian types:

        dialogueObject

        if (this.CIV) {
            if (this.hasVisited) {
                dialogueObject.greetingString = 'Hi, nice to see you again!';
            } else {
                dialogueObject.greetingString = 'How are you doing, my name is ' + this.name + '.';
            }
            dialogueObject.tooLateString = 'I\'m afraid it\'s getting a little too late... good night, and good luck!';
            dialogueObject.titles = '- Civilian -';
        }
        // 2
        if (this.CIV_CHILD) {
            if (this.hasVisited) {
                dialogueObject.greetingString = 'You again old man? Hi!';
            } else {
                dialogueObject.greetingString = 'Hi! I want somebody to play with!';
            }
            dialogueObject.tooLateString = 'It\'s bedtime soon. I\'m going home, see you later!';
            dialogueObject.titles = '- Civilian - Child -';
        }
        //3
        if (this.CIV_MERC_CHILD) {            
            if (this.hasVisited && !this.components.merchant.justTraded) {
                dialogueObject.greetingString = 'Hi, welcome back! Weeeelcome back!';
            } else if (this.components.merchant.justTraded) {
                dialogueObject.greetingString = 'Aha, thank you thank you, come again old man!';
                this.components.merchant.justTraded = false;
            } else {
                dialogueObject.greetingString = 'I\'m going to become the richest of the rich, old man! Buy my things!';
            }            
            dialogueObject.tooLateString = 'It\'s getting dark mister, I\'m heading home with my things soon. Good night!';
            dialogueObject.titles = '- Civilian - Merchant - Child -';
        }
        //4
        if (this.CIV_MERC) {
            if (this.hasVisited && !this.components.merchant.justTraded) {
                dialogueObject.greetingString = 'Nice to see you again.';
            } else if (this.components.merchant.justTraded) {
                dialogueObject.greetingString = 'Thank you for your business.';
                this.components.merchant.justTraded = false;
            } else {
                dialogueObject.greetingString = 'Hello, how are you? I\'m ' + this.name + ', take a look at some of my wares!';
            }   
            dialogueObject.tooLateString = 'It\'s getting a little late, and I\'m afraid I must pack my goods for the day.';
            dialogueObject.titles = '- Civilian - Merchant -';
        }
        //5
        if (this.OUT) {
            if (this.hasVisited) {
                dialogueObject.greetingString = 'You again...';
            } else {
                dialogueObject.greetingString = 'What do you want?';
            }
            dialogueObject.tooLateString = 'You wishing a death sentence for yourself, being out this late around somebody like me?';
            dialogueObject.titles = '- Outcast -';
        }
        //6
        if (this.OUT_CHILD) {
            if (this.hasVisited) {
                dialogueObject.greetingString = 'Back again? Clingy grownup.';
            } else {
                dialogueObject.greetingString = 'When I grow up... I\'m not turning out like everybody else.';
            }
            dialogueObject.tooLateString = 'I need sleep. Now shoo, gramps.'
            dialogueObject.titles = '- Child - Outcast -';
        }
        //7
        if (this.OUT_MERC_CHILD) {
            if (this.hasVisited && !this.components.merchant.justTraded) {
                dialogueObject.greetingString = 'Back for some dangerous grownup goodies?';                
            } else if (this.components.merchant.justTraded) {
                dialogueObject.greetingString = 'Come again gramps, come again...';
                this.components.merchant.justTraded = false;
            } else {
                dialogueObject.greetingString = 'I\'m ' + this.name + '. None of the older ones like what I\'m getting myself into... but you\'ll look at what I\'m selling, right?';
            }            
            dialogueObject.tooLateString = 'A kid like me with no place to go home needs the time to find shelter... oh, you\'re not coming back tomorrow, old man?';
            dialogueObject.titles = '- Child - Merchant - Outcast -';
        }
        //8
        if (this.OUT_MERC) {
            if (this.hasVisited && !this.components.merchant.justTraded) {
                dialogueObject.greetingString = 'Heh... knew an old sucker like you would be back again.';
            } else if (this.components.merchant.justTraded) {
                dialogueObject.greetingString = 'Thanks... keep yourself safe out there, brother.';
                this.components.merchant.justTraded = false;
            } else {    
                dialogueObject.greetingString = 'The name\'s ' + this.name + '...take a look at my stuff... you won\'t regret it.';
            }
            dialogueObject.tooLateString = 'It\'s too late for me to be out here selling this kind of stuff.';
            dialogueObject.titles = '- Merchant - Outcast -';
        }
         
        else if (this.ship.hoursLeftInDay < 1) {
            dialogueObject.greetingString = ' Don\'t you think it\'s getting a little too late to talk? I\'m tired.';   

        }

        return dialogueObject;
    }

    addComponents(type) {
    
        // let value = this.itemObject.components[componentList[i]]["value"];
        let component = new GameComponents[type]();
        this.components[type] = component;
    }
}