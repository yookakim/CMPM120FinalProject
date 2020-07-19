'use strict';

// here is the components namespace for holding the static methods

this.Components = {
    
    consumable: function (consumes) {

        this.name = 'consumable';
        this.consumes = consumes;
        this.callback = function(inventory, index) {
            if (this.consumes > 1) {
                this.consumes--;
                return false;
            } else if (this.consumes === 1) {
                this.consumes--;
                inventory.inventoryRemove(index);
                return true;
            } else if (this.consumes === -1) {
                // infinite consumes
                return false;
            }
        }
    },

    engineUpgrade: function (strength) {

        this.name = 'engineUpgrade';
        this.onUse = function(ship) {
            console.log('upgraded engine');
            ship.engine.engineOutput += strength
        };
    },

    giveMoney: function (goldAmount) {

        this.name = 'giveMoney';
        this.onUse = function(ship) {
            console.log('added ' + goldAmount + ' to treasury');
            ship.treasury += goldAmount;
        }
    },
    

    // civilian components
    civilian: function() {
        this.name = 'civilian';
    },

    merchant: function () {
        
        this.name = 'merchant';
        
    },

    child: function() {

        this.name = 'child';
        this.greetings = [
            'You look a little weird... but also really cool! ',
            'Hi old man! ',
            'My mom said not talk to strangers, but you seem like a friend. ',
            'CAAANDDDYYY!!!'
        ];
    }
}



