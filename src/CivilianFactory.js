/* 
    Factory function to generate and return a new civilian

    Yooha Kim
*/

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

        // this.CIV = 
                    // (this.components.hasOwnProperty('civilian') && 
                    // !this.components.hasOwnProperty('merchant') &&
                    // !this.components.hasOwnProperty('child') &&
                    // !this.components.hasOwnProperty('outcast'));
        // this.CIV_CHILD = 
        //             (this.components.hasOwnProperty('civilian') && 
        //             !this.components.hasOwnProperty('merchant') &&
        //             this.components.hasOwnProperty('child') &&
        //             !this.components.hasOwnProperty('outcast'));
        // this.CIV_MERC_CHILD = 
        //             (this.components.hasOwnProperty('civilian') && 
        //             this.components.hasOwnProperty('merchant') &&
        //             this.components.hasOwnProperty('child') &&
        //             !this.components.hasOwnProperty('outcast'));
        // this.CIV_MERC = 
        //             (this.components.hasOwnProperty('civilian') && 
        //             this.components.hasOwnProperty('merchant') &&
        //             !this.components.hasOwnProperty('child') &&
        //             !this.components.hasOwnProperty('outcast'));

        // // outcast types:
        // this.OUT = 
        //             (!this.components.hasOwnProperty('civilian') && 
        //             !this.components.hasOwnProperty('merchant') &&
        //             !this.components.hasOwnProperty('child') &&
        //             this.components.hasOwnProperty('outcast'));
        // this.OUT_CHILD = 
        //             (!this.components.hasOwnProperty('civilian') && 
        //             !this.components.hasOwnProperty('merchant') &&
        //             this.components.hasOwnProperty('child') &&
        //             this.components.hasOwnProperty('outcast'));
        // this.OUT_MERC_CHILD = 
        //             (!this.components.hasOwnProperty('civilian') && 
        //             this.components.hasOwnProperty('merchant') &&
        //             this.components.hasOwnProperty('child') &&
        //             this.components.hasOwnProperty('outcast'));
        // this.OUT_MERC = 
        //             (!this.components.hasOwnProperty('civilian') && 
        //             this.components.hasOwnProperty('merchant') &&
        //             !this.components.hasOwnProperty('child') &&
        //             this.components.hasOwnProperty('outcast'));   
    }
}

