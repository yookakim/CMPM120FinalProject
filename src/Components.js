'use strict';

// here is the components namespace for holding various methods/mechanics

this.GameComponents = {
    
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

    flatSanityIncrease: function (sanityAmount) {
        this.name = 'flatSanityIncrease';
        this.onUse = function(ship) {
            ship.sanity += sanityAmount
        }
    },
    

    // civilian components
    civilian: function() {
        this.name = 'civilian';
    },

    merchant: function () {
        
        this.name = 'merchant';
        
        this.randomizeWares = function(civilian) {

            civilian.inventory = new CivilianInventory(7, civilian);
            // array of inventory items to spawn for this merchant

            // randomize later, but add a rock for debug purposes

            var itemFactory = new ItemFactory();
            var rock = itemFactory.generateItem('rock', ITEMLIST);
            var childtoy = itemFactory.generateItem('childtoy', ITEMLIST);
            var book = itemFactory.generateItem('book', ITEMLIST);
            

            civilian.inventory.inventoryAdd(rock);
            civilian.inventory.inventoryAdd(childtoy);
            civilian.inventory.inventoryAdd(book);

            var items = [];
            // return items
        };
    },

    child: function() {

        this.name = 'child';
        this.greetings = [
            'You seem weird... but also really cool! ',
            'Hi old man! ',
            'My mom said not talk to strangers, but you seem like a friend. ',
            'CAAANDDDYYY!!! '
        ];
    }
}



