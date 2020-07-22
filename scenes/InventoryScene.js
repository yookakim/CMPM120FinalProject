'use strict';

// scene for checking inventory before ship launch 

class InventoryScene extends Phaser.Scene {
    constructor() {
        super('inventoryscene');
        this.inventory = ship.inventory;
        this.ship = ship;
    }

    preload() {

    }

    create() {

        // initialize new instance of our item making factory
        this.itemFactory = new ItemFactory();
        
        this.add.image(0, 0, 'inventoryscenebackground').setOrigin(0, 0);

        // launch the container scene for the inventory
        this.scene.launch('inventoryui', this.inventory);
        console.log(this.inventory);
        this.add.text(30, 30, 'Ship Inventory', HEADER_TEXT_STYLE);
        this.add.text(30, 80, 'Certain items can be used by clicking on them.', DEFAULT_TEXT_STYLE);
        this.add.text(30, 100, 'Hover over each item for a description.', DEFAULT_TEXT_STYLE);

        this.loadUI();

    }

    update() {

    }

    loadUI() {

        this.add.sprite(game.config.width - 200, game.config.height - 125, 'returnbutton')
            .setInteractive()
            .on('pointerdown', this.returnToShip, this);    
    }

    returnToShip() {

        this.scene.wake('planetselection');
        this.scene.start('planetselectionui');
        this.scene.stop('inventoryui');
        this.scene.stop('inventoryscene');
    }
}