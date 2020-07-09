'use strict';
class PlanetButtonObject extends Phaser.GameObjects.Sprite {
    // create a separate class for a UI sprite that reflects what the planet looks like in the UI
    // based on what kind of planet was passed in
    
    constructor(scene, x, y, texture, frame, planet) {
        // call parent constructor 
        super(scene, x, y, texture, frame);
        this.buttonDataTest = new Phaser.Data.DataManager(this);

        this.planet = planet;
        this.scene = scene;

        this.textConfig = {
            align: 'center',
            fixedWidth: '150',
            backgroundColor: '#adadad',
            wordWrap: {
                width: 150,
            }
        }
        this.planetDistanceText = scene.add.text(x - 75, y + 80, 'planet distance: ' + planet.planetDistance, this.textConfig);

        this.setInteractive();

        // make planet not travellable to by default; we check in preUpdate
        this.isTravellable = false;
        this.setTint(TINT_GRAY);

        this.on('pointerdown', this.onClick, this);

        scene.add.existing(this);
    }
    preUpdate(){
        this.checkTravellable();
    }

    checkTravellable() {
        
        if (this.scene.ship.engine.engineOutput > this.planet.planetDistance && !this.isTravellable) {
            // if button detects travel possible, clear tint
            this.isTravellable = true;
            this.clearTint();
        } else if (this.scene.ship.engine.engineOutput < this.planet.planetDistance && this.isTravellable) {
            // if travel is not possible, tint gray
            this.isTravellable = false;
            this.setTint(TINT_GRAY);
        }
    }

    onClick() {
        if (this.isTravellable) {
            this.scene.loadPlanetMenu();
        } else {
            console.log('your engine is not powerful enough to travel to this planet!');
        }
    }
}