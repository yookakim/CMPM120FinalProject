'use strict';


this.CivilianFactory = function(planet) {
    let civilianNames = ['Jack', 'Beck', 'Carl', 'Ashley', 'Sarah', 'Phil', 'June', 'Karen', 
        'Steve' , 'Julia' , 'David' , 'Amy' , 'Thomas' , 'Suzy' , 'Aidan' , 'Sophia' , 'Wai-Chun' ,
        'Obama', 'DiCaprio' , 'Prince' , 'Tolkien' , 'MJ' , 'Madeon' , 'Ice Cube' , 'Mozart',
        'Naruto', 'Levi' , 'Oreki' , 'Chitanda' , 'Goku' , 'Asuna' , 'Kazuma' , 'Killua' , 'Riko' , 'Reg' ,
        'Morty', 'Grey', 'Skywalker' , 'Han Solo' , 'ikuratunesonsoundcloud' , 'Squidward' ,
        'Kar-wayza' , 'Mor-Karken' , 'Quay-Gonne' , 'Wew-matzo', 'Rar-Eggsdee' , 'Pon-Pippo'
    ];
    
    let civilianGreetings = {
        normal: [
            'Hi, nice to meet you!'
        ]
    }

    // reference to host planet to read data from
    let hostPlanet = planet;

    let newcivilian = new Civilian(
        randomizeName(),
        randomizeAge(),
        randomizeWealth(),
        hostPlanet
    );

    componentsSetup(newcivilian);

    if (newcivilian.components.hasOwnProperty('merchant')) {
        newcivilian.components.merchant.randomizeWares(newcivilian);
    }

    return newcivilian;

    /* ************ */

    function componentsSetup(civilian) {

        // if civilian is 15 years or under, make child
        if (civilian.age < 16) {
            addComponent('child', civilian);
        }

        // give civilian random job
        randomizeType(civilian);
    }

    function addComponent(key, civilian) {
        let component = new GameComponents[key]();
        civilian.components[key] = component;
    }
    
    // do the component adding here
    function randomizeType(civilian) {

        // percentage of time NPC is a civilian (otherwise, is an outcast)
        var civilianChance = 50;
        
        // percentage of time the NPC is a trader:
        var merchantChance = 70;

        if (Phaser.Math.Between(0,100) < civilianChance) {
            addComponent("civilian", civilian);
        } else {
            // if not normal civilian, is an outcast
            addComponent("outcast", civilian)
        }
        if (Phaser.Math.Between(0, 100) < merchantChance) {
            addComponent("merchant", civilian);
            
        }
    }

    function randomizeName() {
        return civilianNames[Phaser.Math.Between(0, civilianNames.length - 1)];
    }
    
    function randomizeAge() {
        return Phaser.Math.Between(3, 70);
    }
    
    function randomizeWealth() {
        return Phaser.Math.Between(0, 100);
    }
}

