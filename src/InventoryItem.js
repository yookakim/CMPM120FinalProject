// individual item object base class

'use strict';

class InventoryItem {
    constructor() {
        /* 
            what properties will an item need?
                name/key
                type of item (functional, keepsake)
                what happens when the item is used (callback)
        */

        this.name;
        this.components = {};
        // this.type;
    }

    addComponent(component) {
        this.components[component.name] = component;
    }

    onUse(inventory, index) {
        
        if ("consumable" in this.components) {
            this.components.consumable.callback(inventory, index);
        }        
    }
}