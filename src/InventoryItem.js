/* 
    Base class for the inventory item objects which holds
    functionality in its components property and lets itself
    be inserted and removed from inventory objects

    Also holds a lot of conditionals for handling
    item functionalities in different scenes/conditions 

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
        this.displayname;
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

                    case "flatSanityIncrease":
                        if (game.scene.isActive('inventoryscene') ||
                            game.scene.isActive('settlementmenu') ||
                            game.scene.isActive('ecosystemmenu') ||
                            game.scene.isActive('planetscene')) {
                            this.components.flatSanityIncrease.onUse(ship);
                        }
                        break;

                    case "flatEngineEfficiencyIncrease":
                        
                        this.components.flatEngineEfficiencyIncrease.onUse(ship);
                        
                        break;
                        
                    case "dayTimeIncrease":
                        if (game.scene.isActive('settlementmenu') ||
                            game.scene.isActive('ecosystemmenu') ||
                            game.scene.isActive('planetscene')) {
                            console.log('used energy drink');
                            this.components.dayTimeIncrease.onUse(ship);
                        }
                        break;
                    
                    case "giveMoney":
                        this.components.giveMoney.onUse(ship);
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
}