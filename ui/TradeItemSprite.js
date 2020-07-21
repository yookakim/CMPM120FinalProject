'use strict';

class TradeItemSprite extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, item, inventory, index, isPlayerItem) {
        super(scene, x, y, item.name);

        this.scene = scene;
        this.item = item;
        this.inventory = inventory;

        // store the index position that the item is in the inventory
        this.index = index;
        this.isPlayerItem = isPlayerItem;
        this.isSelectedForTrade = false;

        this.highlightBorder = new Phaser.GameObjects.Sprite(this.scene, x, y, 'highlightborder');
        this.highlightBorder.setAlpha(0);
        this.highlightBorder.setScale(8, 8);
        this.scene.add.existing(this.highlightBorder);

        this.setScale(8, 8);
        this.scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown', this.itemClick);
    }

    preUpdate() {
        if (this.isSelectedForTrade) {
            this.highlightBorder.setAlpha(1);
        } else if (!this.isSelectedForTrade) {
            this.highlightBorder.setAlpha(0);
        }
    }

    itemClick() {
        // player wants to buy this item
            
        

            
        // propogate some event to move this item from here
        // into the bargaining table (middle)?

        // or if no bargaining table, just highlight the item and 
        // put into tentative receiveGoods array
        if(this.isPlayerItem) {
            EventManager.emit('playeritemclick', this);
        }else if(!this.isPlayerItem) {
            EventManager.emit('merchantitemclick', this);
        }

    }
}
