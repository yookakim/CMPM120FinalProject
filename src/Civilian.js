/* 
    Civilian object instantiated at planet generation, holds dialogue
    and respective behavioral components

    tbh I feel like I messed up the dialogue implementation. Cuz why would
    any random civilian object have to hold the string data for every other civilian 
    in the universe? there might be a smarter way to manage this with external
    files or dedicated dialogue objects 

    Yooha Kim
*/

'use strict';

class Civilian {
    constructor(name, age, wealth, hostPlanet) {
        
        // some basic stats to play around with (as long as we have the base citizen object we can add whatever later)
        // could be possible to use inheritance to create some scripted custom people as well, or other types of civilians
        this.name = name;
        this.age = age;
        this.wealth = wealth;
        this.npcType;
        this.ship = ship;

        this.hasVisited = false;

        this.hostPlanet = hostPlanet;

        // we attach inventory in civilian factory
        this.inventory;

        this.components = {};

    }



    getGreeting() {

        // Set greeting string for each level of sanity
        var dialogueObject = {
            lowGreetingString: '',
            normalGreetingString: '',
            highGreetingString: '',
            tooLateString: '',
            titles: ''
        }
        

        if (this.npcType === "CIV") {
            if (this.hasVisited) {
                dialogueObject.lowGreetingString = '...stay away from me... I see nothing of good in you.'
                dialogueObject.normalGreetingString = 'Hi, nice to see you again!';
                dialogueObject.highGreetingString = 'Hello! Happy to see you again!'
            } else {
                dialogueObject.lowGreetingString = 'You... stay away. The malice in your eyes reminds me of those Federation dogs.'
                dialogueObject.normalGreetingString = 'How are you doing, my name is ' + this.name + '.';
                dialogueObject.highGreetingString = ['Hello! Are you a traveller? My name is ' + this.name + '! Seldom do we get such saintly looking travellers!',
                                                     'We could use a strong-looking man like you!'];
            }
            dialogueObject.tooLateString = 'It\'s too late for us to talk.';
            dialogueObject.titles = '- Civilian -';
        }
        // 2
        if (this.npcType === "CIV_CHILD") {
            if (this.hasVisited) {
                dialogueObject.lowGreetingString = 'Hi again!';
                dialogueObject.normalGreetingString = 'Hey mister, nice to see you again! Hi!!';
                dialogueObject.highGreetingString = 'Hey, will you stay in our village? Please? Pretty please?';
            } else {
                dialogueObject.lowGreetingString = ['Wow, what happened to you? You look terrible! Haha!',
                                                    'If you wanna look and feel better, my pops says all spacepeople should exercise more.'];
                dialogueObject.normalGreetingString = 'Hi! Wanna play some throw and catch?';
                dialogueObject.highGreetingString = 'Wow... wow! What do you do to look all shiny like that?';
            }
            dialogueObject.tooLateString = 'It\'s bedtime soon. I\'m going home, see you later!';
            dialogueObject.titles = '- Civilian - Child -';
        }
        //3
        if (this.npcType === "CIV_CHILD_MERC") {            
            if (this.hasVisited && !this.components.merchant.justTraded) {
                dialogueObject.lowGreetingString = 'Hi again! Wanna buy more? It\'ll fix your look for sure.';
                dialogueObject.normalGreetingString = 'Hi, welcome back! Weeeelcome back!';
                dialogueObject.highGreetingString = 'Welcome back sir! Any more goods you would like to purchase, sir?';
            } else if (this.components.merchant.justTraded) {
                dialogueObject.lowGreetingString = 'Thanks for the business!'
                dialogueObject.normalGreetingString = 'Aha, thank you thank you, come again old man!';
                dialogueObject.highGreetingString = 
                this.components.merchant.justTraded = false;
            } else {
                dialogueObject.lowGreetingString = 'You look funny. Gramp-dad says funny people pay lots!!';
                dialogueObject.normalGreetingString = 'I\'m going to become the richest of the rich, old man! Buy my things!';
            }            
            dialogueObject.tooLateString = 'It\'s getting dark mister, I\'m heading home with my things soon.';
            dialogueObject.titles = '- Civilian - Merchant - Child -';
        }
        //4
        if (this.npcType === "CIV_MERC") {
            if (this.hasVisited && !this.components.merchant.justTraded) {
                dialogueObject.lowGreetingString = 'You again?';
                dialogueObject.normalGreetingString = 'Nice to see you again.';
                dialogueObject.highGreetingString = 'Welcome back, welcome back! Any other goods you would be interested in?'
            } else if (this.components.merchant.justTraded) {
                dialogueObject.lowGreetingString = 'You\'ve got your stuff... now leave.';
                dialogueObject.normalGreetingString = 'Thank you for your business.';
                dialogueObject.highGreetingString = 'Thank you very much! Please do come again!';
                this.components.merchant.justTraded = false;
            } else {
                dialogueObject.lowGreetingString = 'Ugh... tell me what you want, quick.'
                dialogueObject.normalGreetingString = 'Hello, how are you? I\'m ' + this.name + ', take a look at some of my wares!';
                dialogueObject.highGreetingString = 'Hello sir! We are offering some special discounts today, would you be interested?'
            }   
            dialogueObject.tooLateString = 'It\'s getting a little late, and I\'m afraid I must pack my goods for the day.';
            dialogueObject.titles = '- Civilian - Merchant -';
        }
        //5
        if (this.npcType === "OUT") {
            if (this.hasVisited) {
                dialogueObject.lowGreetingString = 'Kekeke... greetings again.'
                dialogueObject.normalGreetingString = '...';
                dialogueObject.highGreetingString = 'Back again to show me how much of a goddamn saint you are?';
            } else {
                dialogueObject.lowGreetingString = 'Aha... I see the hate in your eyes... I know, I know... because I am like you, along with the rest of our kind.'
                dialogueObject.normalGreetingString = 'What do you want?';
                dialogueObject.highGreetingString = '...and what would such a gentleman like you be doing here, wasting time on a mongrel such as I?';
            }
            dialogueObject.tooLateString = 'You wishing a death sentence for yourself, being out this late around somebody like me?';
            dialogueObject.titles = '- Outcast -';
        }
        //6
        if (this.npcType === "OUT_CHILD") {
            if (this.hasVisited) {
                dialogueObject.lowGreetingString = 'Did the Feddies hurt you? I can\'t say ' + this.name + ' has dealt with the same... but I think I know how you feel, mister.';
                dialogueObject.normalGreetingString = 'Back again? Clingy grownups...';
                dialogueObject.highGreetingString = '...'
            } else {
                dialogueObject.lowGreetingString = 'Did the Federation hurt you?';
                dialogueObject.normalGreetingString = 'When I grow up... I\'m not turning out like everybody else.';
                dialogueObject.highGreetingString = '...what do you want from me? Go away.';
            }
            dialogueObject.tooLateString = 'I don\'t talk with others after dark.'
            dialogueObject.titles = '- Child - Outcast -';
        }
        //7
        if (this.npcType === "OUT_CHILD_MERC") {
            if (this.hasVisited && !this.components.merchant.justTraded) {
                dialogueObject.lowGreetingString = 'I knew you\'d be back... one of us.';
                dialogueObject.normalGreetingString = 'Hehe... Back for some dangerous grownup goodies?';
                dialogueObject.highGreetingString = 'I don\'t think I have anything to sell to snotty saints like you.';
            } else if (this.components.merchant.justTraded) {
                dialogueObject.lowGreetingString = 'Thank you for your patronage, friend...';
                dialogueObject.normalGreetingString = 'Come again gramps, come again...';
                dialogueObject.highGreetingString = '...'
                this.components.merchant.justTraded = false;
            } else {
                dialogueObject.lowGreetingString = '... I have something special for you. But only for you.';
                dialogueObject.normalGreetingString = 'I\'m ' + this.name + '. None of the older ones like what I\'m getting myself into... but you\'ll look at what I\'m selling, right?';
                dialogueObject.highGreetingString = 'I don\'t think I have anything to sell to snotty saints like you. But I suppose I can show you what I have.';
            }            
            dialogueObject.tooLateString = 'A kid like me with no place to go home needs the time to find shelter... oh, you\'re not coming back tomorrow, old man?';
            dialogueObject.titles = '- Child - Merchant - Outcast -';
        }
        //8
        if (this.npcType === "OUT_MERC") {
            if (this.hasVisited && !this.components.merchant.justTraded) {
                dialogueObject.lowGreetingString = 'Crazies come, crazies go. Hello again friend.';
                dialogueObject.normalGreetingString = 'Suckers like you come back for anything.';
                dialogueObject.highGreetingString = '...'
            } else if (this.components.merchant.justTraded) {
                dialogueObject.normalGreetingString = 'Appreciate the business, friend. Keep yourself safe out there.';
                dialogueObject.normalGreetingString = '...thank you. Goodbye.';
                dialogueObject.highGreetingString = '...';
                this.components.merchant.justTraded = false;
            } else {
                dialogueObject.lowGreetingString = 'Oh? You\'ve got a familiar look in your eyes... \nHo ho... I have got something special for you. I know you\'d use it well, I can just tell...';
                dialogueObject.normalGreetingString = 'The name\'s ' + this.name + '...take a look at my stuff... you won\'t regret it.';
                dialogueObject.highGreetingString = 'Don\'t think somebody like you would enjoy buying from me. Did you get that happy-go-lucky attitude by kissing up to Feddies?';
            }
            dialogueObject.tooLateString = 'It\'s too late for me to be out here selling this kind of stuff.';
            dialogueObject.titles = '- Merchant - Outcast -';
        }
        

        return dialogueObject;
    }

    addComponents(type) {
    
        let component = new GameComponents[type]();
        this.components[type] = component;
    }
}