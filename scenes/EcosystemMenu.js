class EcosystemMenu extends Phaser.Scene {
    constructor() {
        super('ecosystemmenu');
        this.ship = ship;
        this.hoursLeftText;
        this.timeNeedsUpdate = false;
        EventManager.on('hoursleftincreased', () => {
            this.timeNeedsUpdate = true;
        }, this);        
    }

    // I reuse a buttload of UI code from SettlementMenu, next time around find
    // a way to create better persistent UI
    create() {
        this.hostPlanet = this.scene.settings.data;
        this.ecosystem = this.hostPlanet.ecosystem;
        this.planetStatsPanel = this.add.sprite(game.config.width - 300, 50, 'planetstats')
            .setOrigin(0, 0);
        this.loadUI();
    }

    update() {
        if (this.timeNeedsUpdate) {
            this.hoursLeftText.setText('Time left: ' + this.ship.hoursLeftInDay);
            this.timeNeedsUpdate = false;
        }
    }

    loadUI() {

        this.add.text(80, 40, "You decide to explore the local ecosystem of...", DEFAULT_TEXT_STYLE);
        this.add.text(80, 80, this.hostPlanet.name, HEADER_TEXT_STYLE);

        this.hoursLeftText = this.add.text(game.config.width - 280, 140, 'Time left: ' + this.ship.hoursLeftInDay, DEFAULT_TEXT_STYLE);

        var inventoryUIDataObject = {
            inventory: this.ship.inventory,
            positionX: game.config.width - 450,
            positionY: (7 * game.config.height) / 10
        };
        
        // launch the container scene for the inventory
        this.scene.launch('inventoryui', inventoryUIDataObject);
        this.scene.bringToTop('inventoryui');

        this.add.sprite(game.config.width - 200, game.config.height - 125, 'returnshipbutton')
            .setInteractive()
            .on('pointerdown', this.returnToShip, this);
    }

    returnToShip() {
        this.scene.switch('planetscene');
        this.scene.stop('inventoryui');
        this.scene.stop('ecosystemmenu');
    }
}