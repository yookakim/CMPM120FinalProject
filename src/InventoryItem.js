/* 
    Base class for generating items and adding their components

    Yooha Kim
*/
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
        this.description;
        this.worth;
        this.components = {};
        // this.type;
    }

    addComponent(component) {

        this.components[component.name] = component;
    }

    onUse(inventory, index) {
        
        if (this.components.hasOwnProperty('consumable')) {
            // if this item is a consumable, iterate through all the 
            // components in item that are called on consume
            for ( var prop in this.components ) {
                switch (prop) {
                    case "engineUpgrade":
                        this.components.engineUpgrade.onUse(ship);
                        break;

                    case "giveMoney":
                        this.components.giveMoney.onUse(ship);
                        break;

                    case "flatSanityIncrease":
                        this.components.flatSanityIncrease.onUse(ship);
                        break;

                    // call this case last so the "consuming" part happens after other item effects
                    case "consumable":
                        this.components.consumable.callback(inventory, index);
                        break;

                    default:
                        console.log('no consumable components in this item');
                }
            }
        }
    }

    onTrade() {
        // sends the item to the trade offer cells
    }
}