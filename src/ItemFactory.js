'use strict';

// instantiates a new item based on the key given


class ItemFactory {
    constructor() {
        
        this.itemObject;

    }

    generateItem(key, itemList) {

        // Get the object with the item's data with the item name (key)
        this.itemObject = itemList[key];

        // initialize new item object
        var item = new InventoryItem();

        // set item's name to the key
        item.name = key;

        // iterate through the data object's component list to see 
        // which components the item needs
        var componentList = Object.keys(this.itemObject.components);
        
        // for each component found in data, add new instance of component to 
        // the item's component object
        for (let i = 0; i < componentList.length; i++) {

            let value = this.itemObject.components[componentList[i]]["value"];
            let component = new Components[componentList[i]](value);
            item.addComponent(component);

        }

        // return the new item with dynamically attached components
        return item;
    }
}