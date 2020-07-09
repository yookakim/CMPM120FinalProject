'use strict';
class PlanetSelection extends Phaser.Scene {
    
    constructor() {
        super('planetselection');
        this.ship = ship;

        
    }

    preload() {
        this.load.image('planetbutton', './assets/temp_planet.png');
    }

    create() {
        
        // here we manually create Planet objects for testing reasons
        this.planet = new Planet();
        this.planet2 = new Planet();
        // and then manually set the values 
        this.planet.planetDistance = 800;
        this.planet2.planetDistance = 1200;
        
        // later we might automatically generate them somehow
        // probably using a factory class of some kind

        this.loadUI();
        this.inputSetup();
        
    }

    update() {
        // if (keyF.isDown()) {
        //     this.scene.start('planetmenu');
        // }
    }
    

    loadUI() {
        // find some way to remove hard coded UI sprite/text position values later. 
        // if there are variable number of planet options later, it would be hard to code in the coordinates.
        // probably set up a different scene altogether overlayed on top playing together
        this.add.text(10, 10, 'PlanetSelectionScene, click planet for next scene');
        this.add.text(10, 50, 'You may only travel to a planet whose distance is');
        this.add.text(10, 70, 'within your engine output!');
        this.add.text(10, 110, 'Ship engine output: ' + ship.engine.engineOutput);

        /*
            i made a separate class for a button object, so that we can apply graphical
            changes to the button depending on the attributes of the planet
            (we pass in the planet the button is representing as the planet objects we made in create())
        */



        this.planetButton = new PlanetButtonObject(this, 95, 215, 'planetbutton', 0, this.planet);


        // hard code in the second planet for now:
        this.planetButton2 = new PlanetButtonObject(this, 265, 215, 'planetbutton', 0, this.planet2);


        // for now, we 
    }

    loadPlanetMenu() {
        // the callback function for the 'pointerdown' listener on the planet button
        // later on, the UI would know the info about the planet, and display it accordingly
        // Clicking on it would then pass the planet info
        this.scene.start('planetmenu');
    }



    inputSetup() {

    }
}