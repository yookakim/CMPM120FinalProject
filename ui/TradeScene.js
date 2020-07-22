/* 
    The Phaser scene that displays the trade menu with merchant

    Yooha Kim
*/
'use strict';

class TradeScene extends Phaser.Scene {
    constructor() {
        super('tradescene');
        this.ship = ship;
        EventManager.on('merchantitemclick', this.requestItem, this);
        EventManager.on('playeritemclick', this.offerItem, this);
    }
    
    create() {
        this.civilian = this.scene.settings.data;
        // this.scene.launch('inventoryui', this.ship.inventory);
        this.add.image(0, 0, 'settlementbackground').setOrigin(0, 0);

        // UI array acts as container to hold items sprites
        this.merchantItemContainer = [];
        this.playerItemContainer = [];
        
        // hold the item data to be exchanged when trade is finalized
        this.merchantOfferItems = [];
        this.playerOfferItems = [];

        // store cumulative value of traded items
        this.merchantOfferValue = 0;
        this.playerOfferValue = 0;

        // display text for total values
        this.receiveValueText;
        this.offerValueText;

        this.loadUI();

    }

    update() {
        if (this.playerOfferValue > this.merchantOfferValue) {
            this.confirmButton.clickable = true;
        } else if (this.merchantOfferValue >= this.playerOfferValue) {
            this.confirmButton.clickable = false;
        }
        this.confirmButton.checkClickable();


    }

    loadUI() {

        this.cancelButton = new ButtonTemplate(this, 150, 600, 'cancelbutton');
        this.cancelButton.on('pointerdown', this.cancelTrade, this);

        this.add.text(800, 220, 'Total value of their offer:', DEFAULT_TEXT_STYLE);
        this.receiveValueText = this.add.text(900, 260, '0', DEFAULT_TEXT_STYLE);
        this.add.text(100, 220, 'Total value of your offer:', DEFAULT_TEXT_STYLE);
        this.offerValueText = this.add.text(200, 260, '0', DEFAULT_TEXT_STYLE);

        // set up merchant inventory and cells

        for (let i = 0; i < this.civilian.inventory.contents.length; i++) {
            this.merchantItemContainer[i] = new InventoryCell(this, 800, 300 + (i * 64), 'inventorytile', this.civilian.inventory);
        }

        for (var i = 0; i < this.merchantItemContainer.length; i++) {
            var currentCell = this.merchantItemContainer[i];
            if (this.civilian.inventory.contents[i] != null) {
                currentCell.occupant = this.civilian.inventory.contents[i];
                currentCell.representative = new TradeItemSprite(
                    this,
                    800,
                    300 + (i * 64),
                    currentCell.occupant,
                    this.civilian.inventory,
                    i,
                    false
                );
            }
        }

        // set up player inventory and cells

        for (let i = 0; i < this.ship.inventory.contents.length; i++) {
            this.playerItemContainer[i] = new InventoryCell(this, 300, 300 + (i * 64), 'inventorytile', this.civilian.inventory);
        }
        for (var i = 0; i < this.playerItemContainer.length; i++) {
            var currentCell = this.playerItemContainer[i];
            if (this.ship.inventory.contents[i] != null) {
                currentCell.occupant = this.ship.inventory.contents[i];
                currentCell.representative = new TradeItemSprite(
                    this,
                    300,
                    300 + (i * 64),
                    currentCell.occupant,
                    this.ship.inventory,
                    i,
                    true
                );
            }
        }
    
        this.confirmButton = new ButtonTemplate(this, 525, 400, 'confirmtradebutton');
        this.confirmButton.clickable = false;
        this.confirmButton.on('pointerdown', this.finalizeTrade, this);
    }



    offerItem(tradeSpriteObject) {
        // when a trade item on the player side is clicked, add to total sell worth

        if (tradeSpriteObject.isSelectedForTrade === false) {
            tradeSpriteObject.isSelectedForTrade = true;
            this.playerOfferValue += tradeSpriteObject.item.worth;
        } else if (tradeSpriteObject.isSelectedForTrade === true) {
            tradeSpriteObject.isSelectedForTrade = false;
            this.playerOfferValue -= tradeSpriteObject.item.worth;
        }   
        
        this.offerValueText.text = this.playerOfferValue;
    }

    requestItem(tradeSpriteObject) {
        // clicking on the merchant's items "requests" the item and adds to total buy worth
        console.log(tradeSpriteObject.item.name + ' clicked');

        if (tradeSpriteObject.isSelectedForTrade === false) {
            tradeSpriteObject.isSelectedForTrade = true;
            this.merchantOfferValue += tradeSpriteObject.item.worth;
        } else if (tradeSpriteObject.isSelectedForTrade === true) {
            tradeSpriteObject.isSelectedForTrade = false;
            this.merchantOfferValue -= tradeSpriteObject.item.worth;
        }   
        
        this.receiveValueText.text = this.merchantOfferValue;
    }

    finalizeTrade() {

        // happens on confirm trade button click

        // first, push the tentative trade items into respective exchange item arrays
        for (let i = 0; i < this.merchantItemContainer.length; i++) {
            let currentCell = this.merchantItemContainer[i];
            if (currentCell.representative && currentCell.representative.isSelectedForTrade) {
                this.merchantOfferItems.push(currentCell.occupant);
                // this.civilian.inventory.inventoryRemove(currentCell.representative.index)
            }
        }
        for (let i = 0; i < this.playerItemContainer.length; i++) {
            let currentCell = this.playerItemContainer[i];
            if (currentCell.representative && currentCell.representative.isSelectedForTrade) {
                this.playerOfferItems.push(currentCell.occupant);
                // this.ship.inventory.inventoryRemove(currentCell.representative.index);
            }
        }

        // then, calculate space for both inventories
        // if not, then immediately return 

        if (this.merchantOfferItems.length - this.playerOfferItems.length > this.ship.inventory.numberOpenSpaces()) {
            console.log('you cant carry all that');
            // reset the arrays
            this.merchantOfferItems.splice(0, this.merchantOfferItems.length);
            this.playerOfferItems.splice(0, this.playerOfferItems.length);
            return;
        } else if (this.playerOfferItems.length - this.merchantOfferItems.length > this.civilian.inventory.numberOpenSpaces()) {
            console.log('the merchant cant carry all that');
            // reset the arrays
            this.merchantOfferItems.splice(0, this.merchantOfferItems.length);
            this.playerOfferItems.splice(0, this.playerOfferItems.length);
            return;
        }

        // if there is enough space for both parties, then remove the selected items from respective inventories
        for (let i = 0; i < this.merchantItemContainer.length; i++) {
            let currentCell = this.merchantItemContainer[i];
            if (currentCell.representative && currentCell.representative.isSelectedForTrade) {
                this.civilian.inventory.inventoryRemove(currentCell.representative.index)
            }
        }
        for (let i = 0; i < this.playerItemContainer.length; i++) {
            let currentCell = this.playerItemContainer[i];
            if (currentCell.representative && currentCell.representative.isSelectedForTrade) {
                this.ship.inventory.inventoryRemove(currentCell.representative.index);
            }
        }

        // finally, add selected items to each other's inventories
        for (let i = 0; i < this.merchantOfferItems.length; i++) {
            this.ship.inventory.inventoryAdd(this.merchantOfferItems[i]);
        }
        for (let i = 0; i < this.playerOfferItems.length; i++) {
            this.civilian.inventory.inventoryAdd(this.playerOfferItems[i]);
        }

        console.log(this.ship.inventory.contents);
        console.log(this.civilian.inventory.contents);

        this.civilian.components.merchant.justTraded = true;

        console.log(this.civilian);
        this.scene.stop('inventoryui');
        this.scene.stop('tradescene');
        this.scene.start('civiliantalkscene', this.civilian);
    }

    cancelTrade() {
    
        this.civilian.components.merchant.justTraded = true;
        this.scene.stop('inventoryui');
        this.scene.stop('tradescene');
        this.scene.start('civiliantalkscene');
    }
    
}