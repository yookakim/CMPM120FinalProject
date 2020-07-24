'use strict';

/* 
    Scene accesible from planet selection which displays the
    player inventory

    Yooha Kim
*/

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

        var inventoryUIDataObject = {
            inventory: this.inventory,
            positionX: 100,
            positionY: 500
        };
        
        // launch the container scene for the inventory
        this.scene.launch('inventoryui', inventoryUIDataObject);


        console.log(this.inventory);
        this.add.text(68, 50, 'Ship Inventory', HEADER_TEXT_STYLE);
        this.add.text(68, 120, 'Certain items can be used by clicking on them.', DEFAULT_TEXT_STYLE);
        this.add.text(68, 1, 'Hover over each item for a description.', DEFAULT_TEXT_STYLE);

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