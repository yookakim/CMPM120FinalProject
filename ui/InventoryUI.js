/* 
    UI Scene to overlay inventory scene for displaying and using from inventory

    Yooha Kim
*/
'use strict';

class InventoryUI extends Phaser.Scene {
    constructor() {
        super('inventoryui');

    }

    preload() {        

    }

    create() {

        this.inventoryUIData = this.scene.settings.data;

        this.inventory = this.inventoryUIData.inventory;
        this.inventoryPositionX = this.inventoryUIData.positionX;
        this.inventoryPositionY = this.inventoryUIData.positionY;
        
        this.inventorySquareSize = 64;

        this.cellContainer = [];

        // initial draw of empty tile cells/containers
        this.drawCells();

        // initial refresh (draw) of inventory
        this.refreshItems();

        // add listeners for redrawing on items added or removed
        EventManager.on('inventory-add', this.refreshItems, this);
        EventManager.on('inventory-remove', this.refreshItems, this);
    }

    update() {
        
    }

    refreshItems() {
        // console.log('inventory add event');
        for (var i = 0; i < this.inventory.maxSize; i++) {
            if (this.inventory.contents[i]) {
                this.cellContainer[i].occupant = this.inventory.contents[i];
                
                // if the container cell currently has no sprite representing it, make one
                if (!this.cellContainer[i].representative) {
                    this.cellContainer[i].representative = new InventoryItemSprite(
                        this, 
                        this.cellContainer[i].x,
                        this.cellContainer[i].y, 
                        this.inventory.contents[i],
                        this.inventory,
                        i
                    );
                }

            } else {
                if (this.inventory.contents[i] === null) {                    
                    this.cellContainer[i].occupant = null;

                    // if the cell has a representative after refresh where there shouldn't be, destroy
                    // the representative
                    if (this.cellContainer[i].representative) {
                        this.cellContainer[i].representative.destroy();
                    }
                }
            }
        }
    }

    drawCells() {
        for (var i = 0; i < this.inventory.maxSize; i++) {
            this.cellContainer[i] = new InventoryCell(this, this.inventoryPositionX + (i * this.inventorySquareSize), this.inventoryPositionY, 'inventorytile', this.inventory);
        }
    }
}