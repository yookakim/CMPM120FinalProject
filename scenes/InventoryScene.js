'use strict';

// scene for checking inventory before ship launch 

class InventoryScene extends Phaser.Scene {
    constructor() {
        super('inventoryscene');
        this.inventory = ship.inventory;
    }

    preload() {
        this.load.image('returnbutton', './assets/UI/buttons/returnship_button.png');
    }

    create() {
        this.add.text(10, 10, 'inventoryscene', DEFAULT_TEXT_STYLE);
        this.loadUI();
    }

    loadUI() {
        this.add.sprite(game.config.width - 200, game.config.height - 125, 'returnbutton')
            .setInteractive()
            .on('pointerdown', this.returnToShip, this);
    }

    returnToShip() {
        this.scene.wake('planetselection');
        this.scene.wake('planetselectionui');
        this.scene.stop('inventoryscene');
    }
}