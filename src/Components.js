/* 
    functions to attach to objects such as civilians,
    ecosystems, items, etc. at runtime

    A huge chunk of the functionality is found here
    inside these components. Reusability from this style
    of adding functionality made it easy to conceptualize
    and implement new items, biomes, etc.

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
            ship.changeSanity(sanityAmount);
            EventManager.emit('sanitychanged', ship.sanity);
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

    npcAttributeShow: function() {
        
        this.name = 'npcAttributeShow';

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

    passiveDiggingClaws: function() {
        
        this.name = 'passiveDiggingClaws';
        
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

        this.randomizeWares = function(civilian) {

            civilian.inventory = new CivilianInventory(9, civilian);
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

                var diggingclaws = itemFactory.generateItem('centauriteclaws', ITEMLIST);                
                civilian.inventory.inventoryAdd(diggingclaws);

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

                var book = itemFactory.generateItem('book', ITEMLIST);                
                civilian.inventory.inventoryAdd(book);
            
                // visible with low sanity only
                var federationgoggles = itemFactory.generateItem('federationinfogoggles', ITEMLIST);
                civilian.inventory.inventoryAdd(federationgoggles);

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

        this.generateResource = function(hasDigging) {
            if (hasDigging) {
                if (Phaser.Math.Between(1, 100) <= 25) {
                    return this.factory.generateItem('goldenfigure', ITEMLIST);
                } else {
                    return this.factory.generateItem('tomfruit', ITEMLIST);
                }
            }
            // if no claws, just return base item
            return this.factory.generateItem('tomfruit', ITEMLIST);
        }

    },

    temperateitem: function() {
        
    },
    
    icy: function() {

        this.name = 'icy';

        this.factory = new ItemFactory();

        this.generateResource = function(hasDigging) {
            if (hasDigging) {
                if (Phaser.Math.Between(1, 100) <= 25) {
                    return this.factory.generateItem('frostcutlass', ITEMLIST);
                } else {
                    return this.factory.generateItem('furs', ITEMLIST);
                }
            }
            // if no claws, just return base item
            return this.factory.generateItem('furs', ITEMLIST);
        }
    },

    icyitem: function() {
        
    },
    
    desert: function() {

        this.name = 'desert';

        this.factory = new ItemFactory();

        this.generateResource = function(hasDigging) {
            if (hasDigging) {
                if (Phaser.Math.Between(1, 100) <= 25) {
                    return this.factory.generateItem('duocornfossil', ITEMLIST);
                } else {
                    return this.factory.generateItem('rawgems', ITEMLIST);
                }
            }
            // if no claws, just return base item
            return this.factory.generateItem('rawgems', ITEMLIST);
        }
    },

    desertitem: function() {
        
    },

    humid: function() {

        this.name = 'humid';

        this.factory = new ItemFactory();

        this.generateResource = function(hasDigging) {
            if (hasDigging) {
                if (Phaser.Math.Between(1, 100) <= 25) {
                    return this.factory.generateItem('panaceneplant', ITEMLIST);
                } else {
                    return this.factory.generateItem('coal', ITEMLIST);
                }
            }
            // if no claws, just return base item
            return this.factory.generateItem('coal', ITEMLIST);
        }
    },

    humiditem: function() {
        
    }
}



