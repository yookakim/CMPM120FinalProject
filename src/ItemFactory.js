/* 
    instantiates a new item based on the key given

    honestly pretty weird how i put this in a new class, I feel like
    this functionality could have just been put in one function

    instead of having to instantiate a new item factory to generate items,
    we could just call an existing function like we do with the Civilian Factory

    Yooha Kim
*/

'use strict';

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

        item.description = this.itemObject.description;
        item.worth = this.itemObject.worth;
        item.displayname = this.itemObject.displayname;
        var componentList = Object.keys(this.itemObject.components);
        
        // for each component found in data, add new instance of component to 
        // the item's component object
        for (let i = 0; i < componentList.length; i++) {

            let value = this.itemObject.components[componentList[i]]["value"];
            let component = new GameComponents[componentList[i]](value);
            item.addComponent(component);

        }

        // return the new item with dynamically attached components
        return item;
    }
}