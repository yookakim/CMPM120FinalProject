'use strict';

// here is the components namespace for holding the static methods

this.Components = {
    consumable: function (consumes) {
        this.name = 'consumable';
        this.consumes = consumes;
        this.callback = function(inventory, index) {
            if (this.consumes > 1) {
                this.consumes--;
                console.log('consumed once');
                return false;
            } else if (this.consumes === 1) {
                this.consumes--;
                inventory.inventoryRemove(index);
                console.log(inventory);
                return true;
            }
        }
    },

    engineUpgrade: function (strength) {

        this.name = 'engineUpgrade';
        this.onUse = function(engine) {
            console.log('upgraded engine');
            engine.engineOutput += strength
        };
    }
    
}



