/* 
    Inventory class to manage inventories and add/remove from them

    Yooha Kim
*/
'use strict';

class Inventory {
    constructor(size, owner) {
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

        // reference to the object this inventory is stuck to (could be anything rly)
        this.owner = owner;
        
        this.maxSize = size;

        // populate inventory with null to initialize
        for (var i = 0; i < this.maxSize; i++) {
            this.contents[i] = null;
        }
    }

    numberOpenSpaces() {
        var openSpaces = 0;
        for (let i = 0; i < this.maxSize; i++) {
            if (this.contents[i] === null) {
                openSpaces++;
            }
        }
        return openSpaces;
    }

    inventoryAdd(item) {

        // finds first open slot, then adds the item into it
        for (var i = 0; i < this.maxSize; i++) {

            if (this.contents[i] === null) {
                this.contents.splice(i, 1, item);
                EventManager.emit('inventory-add', this);
                return true;
            }
        }
        console.log('inventory full');
        return false;
    }

    inventoryRemove(index) {

        // remove the item at the given index
        if (this.contents[index] != null) {
            this.contents.splice(index, 1, null);
        }
        EventManager.emit('inventory-remove', this);
    }
}