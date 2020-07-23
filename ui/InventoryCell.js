/* 
    Class to hold empty inventory/trade menu tile for holding item sprites

    Yooha Kim
*/
'use strict';


class InventoryCell extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, key, inventory) {
        
        super(scene, x, y, key);
        this.isOccupied = false;
        this.inventory = inventory;

        // actual item data cell is holding
        this.occupant;

        // the sprite that represents the item
        this.representative;
        
        this.setScale(8, 8);
        scene.add.existing(this);
    }
}