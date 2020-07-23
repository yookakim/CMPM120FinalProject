/* 
    functions with data and functionality to attach to objects at runtime

    Yooha Kim
*/
'use strict';

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

    /* ****** Active Item Effects ****** */

    engineUpgrade: function (outputUpgradeAmount) {

        this.name = 'engineUpgrade';
        this.onUse = function(ship) {
            console.log('upgraded engine');
            ship.engine.engineOutput += outputUpgradeAmount;
        };
    },

    flatSanityIncrease: function (sanityAmount) {

        this.name = 'flatSanityIncrease';
        this.onUse = function(ship) {
            ship.sanity += sanityAmount;
        }
    },

    flatEngineEfficiencyIncrease: function(upgradeAmount) {
        
        this.name = 'flatEngineEfficiencyIncrease';
        this.onUse = function(ship) {
            ship.engine.engineEfficiency += upgradeAmount;
        }
    },
    
    dayTimeIncrease: function(timeAmount) {
        
        this.name = 'dayTimeIncrease';
        this.onUse = function(ship) {
            ship.hoursLeftInDay += timeAmount;
            console.log('added ' + timeAmount + ' to hours left');
            EventManager.emit('hoursleftincreased', ship.hoursLeftInDay);
        }
    },

    giveMoney: function (goldAmount) {

        this.name = 'giveMoney';
        this.onUse = function(ship) {
            console.log('added ' + goldAmount + ' to treasury');
            ship.treasury += goldAmount;
        }
    },

    /* ****** Passive Item Effects ****** */

    passiveSanityIncrease: function(sanityPerTurnIncrease) {
        
        this.name = 'passiveSanityIncrease';
        this.amount = sanityPerTurnIncrease;
    },

    // civilian components
    civilian: function() {
        this.name = 'civilian';
    },

    outcast: function() {
        this.name = 'outcast';
    },

    merchant: function () {
        
        this.name = 'merchant';
        
        // for changing dialogue immediately after trade scene
        this.justTraded = false;
        
        /* 
            types of merchants will have different types of items:
            Possible items ordered from most to least likely


            Civilian merchant (most normal?):
                book (flat sanity increase)
            Civilian child merchant
                child toy
            Outcast merchant
                book (flat sanity increase)
                illegal ship parts (ship upgrade)
            Outcast child merchant (most rare)
                child toy
        */

        this.randomizeWares = function(civilian) {

            civilian.inventory = new CivilianInventory(7, civilian);
            // array of inventory items to spawn for this merchant

            var itemFactory = new ItemFactory();

            var CIV_MERC, CIV_CHILD_MERC, OUT_MERC, OUT_CHILD_MERC;

            CIV_MERC = 
                (civilian.components.hasOwnProperty('civilian') && 
                !civilian.components.hasOwnProperty('child') &&
                !civilian.components.hasOwnProperty('outcast'));

            CIV_CHILD_MERC = 
                (civilian.components.hasOwnProperty('civilian') && 
                civilian.components.hasOwnProperty('child') &&
                !civilian.components.hasOwnProperty('outcast'));

            OUT_MERC = 
                (!civilian.components.hasOwnProperty('civilian') && 
                !civilian.components.hasOwnProperty('child') &&
                civilian.components.hasOwnProperty('outcast'));

            OUT_CHILD_MERC = 
                (!civilian.components.hasOwnProperty('civilian') && 
                civilian.components.hasOwnProperty('child') &&
                civilian.components.hasOwnProperty('outcast'));


            if (CIV_MERC) {

                var xorenergydrink = itemFactory.generateItem('xorenergydrink', ITEMLIST);

                civilian.inventory.inventoryAdd(xorenergydrink);

                var book = itemFactory.generateItem('book', ITEMLIST);
                
                civilian.inventory.inventoryAdd(book);

            } else if (CIV_CHILD_MERC) {

                var childtoy = itemFactory.generateItem('childtoy', ITEMLIST);

                civilian.inventory.inventoryAdd(childtoy);

                var book = itemFactory.generateItem('book', ITEMLIST);
                
                civilian.inventory.inventoryAdd(book);

            } else if (OUT_MERC) {

                var xorenergydrink = itemFactory.generateItem('xorenergydrink', ITEMLIST);

                civilian.inventory.inventoryAdd(xorenergydrink);

                var andrometine = itemFactory.generateItem('andrometine', ITEMLIST);

                civilian.inventory.inventoryAdd(andrometine);

            } else if (OUT_CHILD_MERC) {

                var fedcursingdoll = itemFactory.generateItem('fedcursingdoll', ITEMLIST);

                civilian.inventory.inventoryAdd(fedcursingdoll);

                var mystiviancharm = itemFactory.generateItem('mystiviancharm', ITEMLIST);

                civilian.inventory.inventoryAdd(mystiviancharm);

            }

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
    },

    /* ****** Ecosystem/Biomes ****** */

    temperate: function() {

        this.name = 'temperate';

        // random question, i wonder if i can use/utilize factories without making new instances of them.
        this.factory = new ItemFactory();

        this.generateResource = function() {
            // return ONE random resource for this type of biome
            return this.factory.generateItem('tomfruit', ITEMLIST);
        }

    },

    temperateitem: function() {
        
    },
    
    icy: function() {

        this.name = 'icy';

        this.factory = new ItemFactory();

        this.generateResource = function() {
            // return ONE random resource for this type of biome
            return this.factory.generateItem('furs', ITEMLIST);
        }
    },

    icyitem: function() {
        
    },
    
    desert: function() {

        this.name = 'desert';

        this.factory = new ItemFactory();

        this.generateResource = function() {
            // return ONE random resource for this type of biome
            return this.factory.generateItem('rawgems', ITEMLIST);
        }
    },

    desertitem: function() {
        
    },

    humid: function() {

        this.name = 'humid';

        this.factory = new ItemFactory();

        this.generateResource = function() {
            // return ONE random resource for this type of biome
            return this.factory.generateItem('coal', ITEMLIST);
        }
    },

    humiditem: function() {
        
    }
}



