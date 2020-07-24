/* 
    Ecosystem object class which holds the respective
    biome component

    Yooha Kim
*/

'use strict';

class Ecosystem {
    constructor(planet) {
        // generate Temperate, Icy, Desert, Humid planets in 40, 20, 20, 20 percent chance respectively

        this.planet = planet;
        this.inventory = new Inventory(5, this);
        this.ecosystemType = {};

        // for debug purposes only temperate planets spawn if this value set to 40
        

        this.randomizeType();


        // this.generateItems();
    }

    addComponent(key) {
        let component = new GameComponents[key]();
        this.ecosystemType[key] = component;
    }

    randomizeType() {

        var randomInt = Phaser.Math.Between(1, 100);
        
        if (randomInt < 41) {
            // generate Temperate
            this.addComponent('temperate');
            return;
        } if (40 < randomInt && randomInt < 61) {
            // generate Icy
            this.addComponent('icy');
            return;
        } if (60 < randomInt && randomInt < 81) {
            // generate Desert
            this.addComponent('desert');
            return;
        } if (80 < randomInt) {
            // generate Humid
            this.addComponent('humid');
            return;
        }
    }

    generateItem() {
        // pop the farmable resources into this ecosystem based on the type of biome

        if (this.ecosystemType.hasOwnProperty('temperate')) {
            // generate temperate planet items
            console.log('generating temperate resources');            
            return this.ecosystemType.temperate.generateResource();

        } if (this.ecosystemType.hasOwnProperty('icy')) {
            console.log('generating icy resources');
            return this.ecosystemType.icy.generateResource();

        } if (this.ecosystemType.hasOwnProperty('desert')) {
            console.log('generating desert resources');
            return this.ecosystemType.desert.generateResource();

        } if (this.ecosystemType.hasOwnProperty('humid')){
            console.log('generating humid resources');
            return this.ecosystemType.humid.generateResource();

        }
    }
}