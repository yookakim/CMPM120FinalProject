'use strict';

class CivilianInventory extends Inventory {
    constructor(size, owner){
        super(size, owner);
    }

    inventoryAdd(item) {

        // finds first open slot, then adds the item into it
        for (var i = 0; i < this.maxSize; i++) {

            if (this.contents[i] === null) {
                this.contents.splice(i, 1, item);
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
    }
}