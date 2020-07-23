'use strict';

class InventoryItemSprite extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, item, inventory, index) {
        super(scene, x, y, item.name);

        this.scene = scene;
        this.item = item;
        this.inventory = inventory;
        this.index = index;

        // properties for controlling tooltip
        this.pointer = scene.input.activePointer;
        this.tooltipTimer = 0;
        this.hovered = false;
        this.tooltipExists = false;
        this.tooltip;

        this.setScale(8, 8);
        scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown', this.itemClick);

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

    // method to run for when this sprite representing the item gets clicked
    itemClick() {

        // these if statements feel a little dirty but i will use them lol

        console.log('clicked');
        if (!this.scene.scene.isActive('tradescene')) {
            // if not clicked in trade scene:
        }


        // set special use cases for certain items (for example, can only use energy drink when on planet)
        // this is pretty hacky lmao, im figuring out a better way to do stuff like this for other projects lol
        if (this.item.components.hasOwnProperty('dayTimeIncrease')) {
            if (game.scene.isActive('settlementmenu') ||
                game.scene.isActive('ecosystemmenu')) {
                this.item.onUse(this.inventory, this.index);
                return;
            }
            return;
        }
        this.item.onUse(this.inventory, this.index);
    }
}