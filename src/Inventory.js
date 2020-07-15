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
        this.inventoryArray = [];
        console.log('parent inventory constructor');
        
    }
    inventoryAdd() {
        console.log('item added');
    }

    inventoryRemove() {

    }
}