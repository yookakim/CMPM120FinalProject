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

    function componentsSetup(key) {

        // if civilian is under 13, make child
        if (civilian.age < 13) {
            addComponent('child');
        }

        // give civilian random job
        addComponent(randomizeType());
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
    
    function randomizeType() {
        var random = Phaser.Math.Between(0, 100);
        if (random < 25) {
            return "merchant";
        } else if (random >= 25) {
            return "civilian";
        }
    }
}

