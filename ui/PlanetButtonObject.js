'use strict';

class PlanetButtonObject extends Phaser.GameObjects.Sprite {
    // create a separate class for a UI sprite that reflects what the planet looks like in the UI
    // based on what kind of planet was passed in (we can set this up later)
    
    constructor(scene, x, y, texture, frame, planet) {
        // call parent constructor 
        super(scene, x, y, texture, frame);

        // pass initial params into properties
        this.scene = scene;
        this.x = x;
        this.y = y;

        // we unload the data from the object passed in, but i wonder if there's a better way to do it idk lol
        this.planet = planet;
        this.travelTime = this.planet.travelTime;

        // later we could make a standardized global textConfig object
        this.textConfig = {
            align: 'center',
            fixedWidth: '150',
            fontSize: '12px',
            fontFamily: 'Tahoma',
            backgroundColor: '#adadad',
            wordWrap: {
                width: 150,
            }
        }

        this.setupChildText();        
        this.setInteractive();

        // make planet not travellable to by default; we check in preUpdate
        this.isTravellable = false;
        this.setTint(TINT_GRAY);

        this.on('pointerdown', this.onClick, this);

        scene.add.existing(this);
    }

    preUpdate(){

        /* 
            every update frame, check to see if we can travel here
            so that our UI sprite can change its look in the scene
            accordingly
        */

        this.checkTravellable();
    }

    checkTravellable() {
        
        // check if we can still travel to this planet
        if (ship.maxTravelDistance >= this.planet.planetDistance && !this.isTravellable) {
            // if button detects travel possible, clear tint
            this.isTravellable = true;
            this.clearTint();
        } else if (ship.maxTravelDistance < this.planet.planetDistance && this.isTravellable) {
            // if travel is not possible, tint gray
            this.isTravellable = false;
            this.setTint(TINT_GRAY);
        }
    }

    onClick() {
        if (this.isTravellable) {
            this.scene.loadPlanetMenu(this.planet);
        } else {
            console.log('you cannot travel here for watever reason');
            console.log(ship.maxTravelDistance);
        }
    }

    setupChildText() {


        this.planetNameText = this.scene.add.text(
            this.x - 75,
            this.y - 90,
            'planet: ' + this.planet.name + '\n',
            this.textConfig
        );

        this.planetInfoText = this.scene.add.text(
            this.x - 75,
            this.y + 80,
            'distance: ' + this.planet.planetDistance + '\n' + 
            'time: ' + this.travelTime + '\n',
            this.textConfig
        );        
    }
}