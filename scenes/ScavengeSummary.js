/* 
    Summary scene after scavenging planet showing the
    resources gained

    Yooha Kim
*/

'use strict';

class ScavengeSummary extends Phaser.Scene {
    constructor() {
        super('scavengesummary');

        this.ship = ship;
    }

    create() {
        this.ecosystem = this.scene.settings.data;
        this.enoughSpace = false;

        // do the scavenging logic before UI loads
        this.scavengedItem = this.scavengeItem();

        this.loadUI();

    }

    loadUI() {

        this.add.sprite(0, 0, 'planetscenebackground').setOrigin(0, 0).setTint(TINT_GRAY);

        if (this.ecosystem.ecosystemType.hasOwnProperty('temperate')) {
            this.add.image(0, 0, 'ecosystem_temperate').setOrigin(0, 0).setTint(TINT_GRAY);
        } else if (this.ecosystem.ecosystemType.hasOwnProperty('icy')) {
            this.add.image(0, 0, 'ecosystem_icy').setOrigin(0, 0).setTint(TINT_GRAY);
        } else if (this.ecosystem.ecosystemType.hasOwnProperty('desert')) {
            this.add.image(0, 0, 'ecosystem_desert').setOrigin(0, 0).setTint(TINT_GRAY);
        } else if (this.ecosystem.ecosystemType.hasOwnProperty('humid')) {
            this.add.image(0, 0, 'ecosystem_humid').setOrigin(0, 0).setTint(TINT_GRAY);
        }

        this.planetStatsPanel = this.add.sprite(game.config.width - 300, 50, 'planetstats')
            .setOrigin(0, 0);

        this.hoursLeftText = this.add.text(game.config.width - 280, 140, 'Time left: ' + this.ship.hoursLeftInDay, DEFAULT_TEXT_STYLE);

        if (this.enoughSpace && this.scavengedItem) {
            this.scavengedItemCell = new InventoryCell(this, 300, 400, 'inventorytile', this.ecosystem.inventory);

            this.scavengedItemCell.occupant = this.scavengedItem;
            this.scavengedItemCell.representative = new InventoryItemSprite(
                this,
                this.scavengedItemCell.x,
                this.scavengedItemCell.y,
                this.scavengedItem,
                this.ecosystem.inventory,
                0
            );
    
            this.scavengedItemCell.representative.clickable = false;

            this.add.text(50, 50, 'You explore ' + this.ecosystem.planet.name + '\'s ecosystem and find:', SUBHEADER_TEXT_STYLE);
        } else {
            this.add.text(50, 50, 'You don\'t have enough space left in your inventory to go collect resources.', DEFAULT_TEXT_STYLE);
        }



        this.add.sprite(game.config.width - 200, game.config.height - 125, 'return')
            .setInteractive()
            .on('pointerdown', this.returnToShip, this);
    }

    scavengeItem() {
        // console.log(this.ship.inventory.numberOpenSpaces())
        if (this.ship.inventory.numberOpenSpaces < 1) {
            this.enoughSpace = false;
        } else if (this.ship.inventory.numberOpenSpaces() > 0) {
            var item = this.ecosystem.generateItem();
            this.enoughSpace = true;
            this.ship.inventory.inventoryAdd(item);
            this.ship.spendTime(2);
            return item;
        }
    }

    returnToShip() {
        this.scene.start('ecosystemmenu');
        this.scene.stop('scavengesummary');     
    }
}