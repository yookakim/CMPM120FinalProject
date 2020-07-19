class InventoryUI extends Phaser.Scene {
    constructor() {
        super('inventoryui');
        this.inventoryPositionX = 100;
        this.inventoryPositionY = 600;
        this.inventorySquareSize = 64;
    }

    preload() {        

    }

    create() {        
        this.inventory = this.scene.settings.data;
        this.cellContainer = [];

        // initial draw of empty tile cells/containers
        this.drawCells();

        // initial refresh (draw) of inventory
        this.refreshItems();

        // add listeners for redrawing on items added or removed
        this.inventory.inventoryEvents.on('inventory-add', this.refreshItems, this);
        this.inventory.inventoryEvents.on('inventory-remove', this.refreshItems, this);
    }

    update() {
        // this.refreshItems();
    }

    refreshItems() {
        // console.log('inventory add event');
        for (var i = 0; i < this.inventory.maxSize; i++) {
            if (this.inventory.contents[i]) {
                this.cellContainer[i].occupant = this.inventory.contents[i];
                this.cellContainer[i].occupied = true;
                
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
                    this.cellContainer[i].occupied = false;

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
            this.cellContainer[i] = new InventoryCell(this, this.inventoryPositionX + (i * this.inventorySquareSize), this.inventoryPositionY, 'inventorytile');
        }
    }
}