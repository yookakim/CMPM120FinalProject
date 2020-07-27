/* 
    Sprite class for displaying items in trade menu

    Yooha Kim
*/

'use strict';

/* 
    ideally, this class would have extended from the InventoryItemSprite
    to receive the tooltip functionalities without repeating code, but i 
    just copy pasted the code into this class in the interest of time cuz
    i couldn't figure it out lmao

    it's just a couple lines... pls
*/

class TradeItemSprite extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, item, inventory, index, isPlayerItem) {
        super(scene, x, y, item.name);

        this.scene = scene;
        this.item = item;
        this.inventory = inventory;
        this.ship = ship;

        // store the index position that the item is in the inventory
        this.index = index;
        this.isPlayerItem = isPlayerItem;
        this.isSelectedForTrade = false;

        // setup the sprite that shows the item is selected 
        this.highlightBorder = new Phaser.GameObjects.Sprite(this.scene, x, y, 'highlightborder');
        this.highlightBorder.setAlpha(0);
        this.highlightBorder.setScale(8, 8);
        this.scene.add.existing(this.highlightBorder);

        this.setScale(8, 8);
        this.scene.add.existing(this);
        this.setInteractive();
        this.checkExclusiveItem();
        this.on('pointerdown', this.itemClick);

        // properties for controlling tooltip
        this.pointer = scene.input.activePointer;
        this.tooltipTimer = 0;
        this.hovered = false;
        this.tooltipExists = false;
        this.tooltip;

        this.on('pointerover', function() {
            // if hovered over, the pointer is on top
            this.hovered = true;
        });
        this.on('pointerout', function() {
            // if pointer leaves, hovered is false
            this.hovered = false;
        });
        this.scene.input.on('pointermove', () => {
            // reset the tooltip timer every time pointer moves
            this.tooltipTimer = 0;
            if (this.tooltipExists) {
                console.log('destroyed tooltip');
                // if there is a tooltip existing and pointer moves, destroy the tooltip
                this.tooltipExists = false;
                this.tooltip.destroy(this.tooltip);
            }            
        })
    }

    preUpdate(time, delta) {
        if (this.isSelectedForTrade) {
            this.highlightBorder.setAlpha(1);
        } else if (!this.isSelectedForTrade) {
            this.highlightBorder.setAlpha(0);
        }
        if (super.preUpdate) {
            super.preUpdate(time, delta);
        }

        if (!this.tooltipExists && this.tooltipTimer > 100 && this.hovered) {
            this.tooltipExists = true;
            var tooltipText = '';
            tooltipText += this.item.displayname + '\n\n';
            tooltipText += this.item.description;
            this.tooltip = new Phaser.GameObjects.Text(this.scene, this.pointer.x, this.pointer.y, tooltipText, DEFAULT_TOOLTIP_STYLE);
            this.tooltip.setOrigin(0, 1);
            this.scene.add.existing(this.tooltip);
        }
        this.tooltipTimer += delta;
    }

    checkExclusiveItem() {
        if (this.item.name === 'federationinfogoggles' && ship.sanity > 30 && this.isPlayerItem === false) {
            this.setVisible(false);
        }
    }

    itemClick() {
        if(this.isPlayerItem) {
            EventManager.emit('playeritemclick', this);
        }else if(!this.isPlayerItem) {
            EventManager.emit('merchantitemclick', this);
        }

    }
}
