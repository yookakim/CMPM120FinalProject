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

        // cache all the item data from the JSON file we loaded in the preloader
        let itemList = this.cache.json.get('items');

        // initialize new instance of our item making factory
        this.itemFactory = new ItemFactory();
        
        // launch the container scene for the inventory
        this.scene.launch('inventoryui', this.inventory);
        console.log(this.inventory);
        this.add.text(30, 30, 'inventoryscene', DEFAULT_TEXT_STYLE);

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

        this.scene.run('planetselection');
        this.scene.run('planetselectionui');
        this.scene.stop('inventoryui');
        this.scene.stop('inventoryscene');
    }
}