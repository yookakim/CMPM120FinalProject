/* 
    Separate UI scene overlayed on PlanetSelection to separate
    visuals from the scene logic

    Yooha Kim
*/

'use strict';

class PlanetSelectionUI extends Phaser.Scene {
    constructor() {
        super('planetselectionui');
        this.planetsData;
        this.ship = ship;
    }
    
    preload() {
        this.cameras.main.setBackgroundColor(' ');

    }

    create() {

        

        // get the array of planets from the data we passed in 
        this.planetsData = this.scene.settings.data.planets;
        this.planetSelectionScene = this.scene.settings.data.containerScene;

        this.add.image(0, 0, 'planetselectionbackground').setOrigin(0, 0);
        this.add.sprite(game.config.width / 2, game.config.height / 8, 'selectdestinationbanner');
        this.add.sprite(game.config.width / 5, 9 * game.config.height / 16, 'statszone');
            
        this.inventoryButton = new ButtonTemplate(this, game.config.width / 5, game.config.height / 2, 'inventorybutton')
            .on('pointerdown', this.planetSelectionScene.loadInventoryMenu, this.planetSelectionScene);
    
        


        this.add.text(game.config.width / 9.4, 2.2 * game.config.height / 8, 'Day ' + (this.ship.totalDaysTravelled + 1) + ': ' + this.ship.currentPlanet.name, DEFAULT_TEXT_STYLE);
        this.add.text(game.config.width / 9.4, 2.4 * game.config.height / 8, 'Engine Power: ' + this.ship.engine.engineOutput, DEFAULT_TEXT_STYLE);
        this.add.text(game.config.width / 9.4, 2.6 * game.config.height / 8, 'Engine Efficiency: ' + this.ship.engine.engineEfficiency, DEFAULT_TEXT_STYLE);
        this.add.text(game.config.width / 9.4, 2.8 * game.config.height / 8, 'Max Travel Distance: ' + this.ship.maxTravelDistance, DEFAULT_TEXT_STYLE);
        this.sanityText = this.add.text(game.config.width / 9.4, 3.0 * game.config.height / 8, 'Sanity: ' + this.ship.sanity, DEFAULT_TEXT_STYLE);

        if (this.ship.sanity < 30) {
            this.sanityText.setText('Sanity: ' + this.ship.sanity + ' (Disheveled)');
        } else if (this.ship.sanity >= 30 && this.ship.sanity < 70) {
            this.sanityText.setText('Sanity: ' + this.ship.sanity + ' (Normal)');
        } else if (this.ship.sanity >= 70) {
            this.sanityText.setText('Sanity: ' + this.ship.sanity + ' (Illuminated)');
        } 

        this.add.text(370, 2 * game.config.height / 8, 'You may only warp to a planet if your engine is', DEFAULT_TEXT_STYLE);
        this.add.text(370, 2.2 * game.config.height / 8, 'powerful or efficient enough.', DEFAULT_TEXT_STYLE);
        this.add.text(370, 2.8 * game.config.height / 8, 'travel time: distance / engine power', DEFAULT_TEXT_STYLE);
        this.add.text(370, 3 * game.config.height / 8, 'max travel distance: engine power * engine efficiency', DEFAULT_TEXT_STYLE);
        this.add.text(370, 3.2 * game.config.height / 8, '(TODO: we probably put this information in a help/info scene, or use some tooltips/labels)', DEFAULT_TEXT_STYLE);
        this.add.text(370, 3.6 * game.config.height / 8, 'Three tiers to sanity: 0-29, 30 - 69, 70 - 99; each tier brings different interactions with\n planet inhabitants', DEFAULT_TEXT_STYLE);
        this.add.text(370, 4.2 * game.config.height / 8, '(also put this in separate help/tips scene, probably big button under the Inventory button)', DEFAULT_TEXT_STYLE);

        /*
            i made a separate class for a button object, so that we can apply graphical
            changes to the button depending on the attributes of the planet
            (we pass in the planet the button is representing as the planet objects we made in create())
        */
        this.planetButton = new PlanetButtonObject(this, 430, 550, 'planetbutton', 0, this.planetsData[0]);
        this.planetButton2 = new PlanetButtonObject(this, 590, 550, 'planetbutton', 0, this.planetsData[1]);
        this.planetButton2 = new PlanetButtonObject(this, 750, 550, 'planetbutton', 0, this.planetsData[2]);
        this.planetButton2 = new PlanetButtonObject(this, 910, 550, 'planetbutton', 0, this.planetsData[3]);
    }

    update() {

    }
}