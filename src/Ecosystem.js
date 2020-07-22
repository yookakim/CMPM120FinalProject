class Ecosystem {
    constructor(planet) {
        // generate Temperate, Icy, Dry, Humid planets in 60, 20, 20, 20 percent chance respectively
        var randomInt = Phaser.Math.Between(1, 100);
        if (randomInt < 41) {
            // generate Temperate
        } else if (40 < randomInt < 61) {
            // generate Icy
        } else if (60 < randomInt < 81) {
            // generate Dry
        } else if (80 < randomInt) {
            // generate Humid
        }
    }
}