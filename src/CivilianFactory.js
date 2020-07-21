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

    let civilian = new Civilian(
        randomizeName(),
        randomizeAge(),
        randomizeWealth()
    );

    componentsSetup();

    return civilian;

    /* ************ */

    function componentsSetup(key) {

        // if civilian is under 13, make child
        if (civilian.age < 13) {
            addComponent('child');
        }

        // give civilian random job
        randomizeType(civilian);
    }

    function addComponent(key) {
        let component = new GameComponents[key]();
        civilian.components[key] = component;
    }

    function randomizeName() {
        return civilianNames[Phaser.Math.Between(0, civilianNames.length - 1)];
    }
    
    function randomizeAge() {
        return Phaser.Math.Between(3, 80);
    }
    
    function randomizeWealth() {
        return Phaser.Math.Between(0, 100);
    }
    
    // do the component adding here
    function randomizeType(civilian) {
        var random = Phaser.Math.Between(0, 100);
        if (random < 75) {
            addComponent("merchant");
            civilian.components.merchant.randomizeWares(civilian);
            // return "merchant";
        } else if (random >= 75) {
            addComponent("civilian");
        }
    }
}

