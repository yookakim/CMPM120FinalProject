'use strict';

class InventoryItemSprite extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, item, inventory, index) {
        super(scene, x, y, item.name);

        this.scene = scene;
        this.item = item;
        this.inventory = inventory;
        this.index = index;
        this.pointer = scene.input.activePointer;
        this.tooltipTimer = 0;
        this.hovered = false;
        this.tooltipExists = false;
        this.tooltip;

        this.setScale(8, 8);
        scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown', this.itemClick);
        // this.on('pointerout', function() {
        //     this.tooltipTimer = 0;
        // });
        this.on('pointerover', function() {
            // this.tooltipTimer = 0;
            // console.log('pointer moved, destroying if tooltip exists');
            // if (this.tooltip) {
            //     console.log('destroyed tooltip');
            //     this.tooltip.destroy(this.tooltip);
            // }
            this.hovered = true;
        });
        this.on('pointerout', function() {
            this.hovered = false;
        });
        this.scene.input.on('pointermove', () => {
            this.tooltipTimer = 0;
            if (this.tooltipExists) {
                console.log('destroyed tooltip');
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
        if (this.scene.scene.isActive('inventoryscene')) {
            // if clicked in inventory menu:
            this.item.onUse(this.inventory, this.index);
        }
    }
}