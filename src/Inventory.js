// inventory system which holds item objects

'use strict';

class Inventory {
    constructor() {
        /* 
            Properties an inventory might need:
                
                the array of inventory items
                max capacity
                number of items

                functions:
                adding items
                removing items
                checking for certain item combinations
                    (how often? probably every time we make a change, like add or delete)
                    this would be done in PlayerInventory, because not all inventory
                    systems need this functionality

        */
       
        // array of item objects
        this.contents = [];
        
        // todo change from hard code later
        this.maxSize = 7;

        // populate inventory with null objects
        for (var i = 0; i < this.maxSize; i++) {
            this.contents[i] = null;
        }

        // new instance of phaser event system
        this.inventoryEvents = new Phaser.Events.EventEmitter();
        
    }
    inventoryAdd(item) {

        // finds first open slot, then adds the item into it
        for (var i = 0; i < this.maxSize; i++) {

            if (this.contents[i] === null) {
                this.contents.splice(i, 1, item);
                this.inventoryEvents.emit('inventory-add', this);
                return;
            }
        }
        console.log('inventory full');
    }

    inventoryRemove(index) {

        // remove the item at the given index
        if (this.contents[index] != null) {
            this.contents.splice(index, 1, null);
        }
        this.inventoryEvents.emit('inventory-remove', this);
    }
}