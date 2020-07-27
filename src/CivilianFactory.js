/* 
    Factory function to generate and return a new civilian

    Yooha Kim
*/

'use strict';

this.CivilianFactory = function(planet) {

    // list of random names
    let civilianNames = ['Jack', 'Beck', 'Carl', 'Ashley', 'Sarah', 'Phil', 'June', 'Karen', 
        'Julia' , 'Dayvid' , 'Amy' , 'Suzy' , 'Aydan' , 'Sophya' , 'Wai-Chun' ,
        'Jesse', 'Albert' , 'Prince' , 'Tolkien' , 'MJ' , 'Madeon' , 'Ice Cube' , 'Icelobber',
        'Tor-Natto', 'Levi' , 'Oreki' , 'Chitanda' , 'Goku' , 'Asuna' , 'Kazuma' , 'Killua' , 'Riko' , 'Reg' ,
        'Morty', 'Grey', 'Cloudtreader' , 'Lan Holo' , 'Ikura' , 'Rockwalker' , 'Icethrower' , 'Fay' ,
        'Kar-wayza' , 'Mor-Karken' , 'Quay-Gonne' , 'Wew-matzo', 'Rar-Eggsdee' , 'Pon-Pippo' ,
        'Gar-Natzo' , 'Ji' , 'Moe' , 'Thaumus' , 'Suteeve' , 'Pi' , 'Tor' , 'Starseer' , 'Pon-Karkin'
    ];

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

    newcivilian.npcType = setType(newcivilian);

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
        var merchantChance = 50;

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
        return Phaser.Math.Between(3, 55);
    }
    
    function randomizeWealth() {
        return Phaser.Math.Between(0, 100);
    }

    function setType(civilian) {

        if ((civilian.components.hasOwnProperty('civilian') && 
            !civilian.components.hasOwnProperty('merchant') &&
            !civilian.components.hasOwnProperty('child') &&
            !civilian.components.hasOwnProperty('outcast'))) {
            return "CIV";
        }
        if ((civilian.components.hasOwnProperty('civilian') && 
            !civilian.components.hasOwnProperty('merchant') &&
            civilian.components.hasOwnProperty('child') &&
            !civilian.components.hasOwnProperty('outcast'))) {
            return "CIV_CHILD";
        }
        if ((civilian.components.hasOwnProperty('civilian') && 
            civilian.components.hasOwnProperty('merchant') &&
            civilian.components.hasOwnProperty('child') &&
            !civilian.components.hasOwnProperty('outcast'))) {
            return "CIV_CHILD_MERC";
        }
        if ((civilian.components.hasOwnProperty('civilian') && 
            civilian.components.hasOwnProperty('merchant') &&
            !civilian.components.hasOwnProperty('child') &&
            !civilian.components.hasOwnProperty('outcast'))) {
            return "CIV_MERC";
        }
        if ((!civilian.components.hasOwnProperty('civilian') && 
            !civilian.components.hasOwnProperty('merchant') &&
            !civilian.components.hasOwnProperty('child') &&
            civilian.components.hasOwnProperty('outcast'))) {
            return "OUT"
        }
        if ((!civilian.components.hasOwnProperty('civilian') && 
            !civilian.components.hasOwnProperty('merchant') &&
            civilian.components.hasOwnProperty('child') &&
            civilian.components.hasOwnProperty('outcast'))) {
            return "OUT_CHILD"
        }
        if ((!civilian.components.hasOwnProperty('civilian') && 
            civilian.components.hasOwnProperty('merchant') &&
            civilian.components.hasOwnProperty('child') &&
            civilian.components.hasOwnProperty('outcast'))) {
            return "OUT_CHILD_MERC"
        }
        if ((!civilian.components.hasOwnProperty('civilian') && 
            civilian.components.hasOwnProperty('merchant') &&
            !civilian.components.hasOwnProperty('child') &&
            civilian.components.hasOwnProperty('outcast'))) {
            return "OUT_MERC";
        } 
    }
}

