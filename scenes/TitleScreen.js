class TitleScreen extends Phaser.Scene {
    constructor() {
        super('titlescreen');
        this.ship = ship;
    }
    preload() {

    }

    create() {
        

        this.add.sprite(game.config.width / 2, game.config.height / 3, 'titlezone');

        this.startButton = new ButtonTemplate(this, game.config.width / 2, (3 * game.config.height) / 4, 'titlestartbutton');

        this.startButton.on('pointerdown', this.loadPlanetSelection, this);

        // initialize the ship inventory with starter items
        
        this.itemFactory = new ItemFactory();

        // initialize inventory with free stuff
        this.ship.inventory.inventoryAdd(this.itemFactory.generateItem('rock', ITEMLIST));
        this.ship.inventory.inventoryAdd(this.itemFactory.generateItem('goldbag', ITEMLIST));
        
    }

    loadPlanetSelection() {
        this.scene.start('planetselection');
    }
}