/* 
    Title Screen

    Yooha Kim
*/

'use strict';

class TitleScreen extends Phaser.Scene {
    constructor() {
        super('titlescreen');
        this.ship = ship;
    }
    preload() {

    }

    create() {
        this.sound.stopAll();

        this.add.sprite(game.config.width / 2, game.config.height / 3, 'titlezone')
            .setScale(.6, .6);

        this.startButton = new ButtonTemplate(this, game.config.width / 2, (3 * game.config.height) / 4, 'titlestartbutton');

        this.startButton.on('pointerdown', this.loadIntroduction, this);

        // initialize the ship inventory with starter items
        
        this.itemFactory = new ItemFactory();

        // initialize inventory with free stuff
        this.ship.inventory.inventoryAdd(this.itemFactory.generateItem('upgradekit', ITEMLIST));
        this.ship.inventory.inventoryAdd(this.itemFactory.generateItem('piratebadge', ITEMLIST));
        this.ship.inventory.inventoryAdd(this.itemFactory.generateItem('xorenergydrink', ITEMLIST));
        
    }

    loadIntroduction() {
        this.scene.start('introductionscene');
    }
}