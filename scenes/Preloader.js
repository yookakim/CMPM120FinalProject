class Preloader extends Phaser.Scene {
    constructor () {
        super('preloader');
    }

    preload() {
        this.load.image('titlezone', './assets/UI/title_zone.png');
        this.load.image('titlestartbutton', './assets/UI/buttons/title_start_button.png');


        // planet selection
        this.load.image('planetbutton', './assets/temp_planet.png');
        this.load.image('selectdestinationbanner', './assets/UI/select_destination_banner.png');
        this.load.image('inventorybutton', './assets/UI/buttons/inventory_button.png');
        this.load.image('statszone', './assets/UI/planetselection_stats_zone.png');
        this.load.image('fuelbutton', './assets/UI/buttons/fuel_button.png');
        this.load.audio('launchsound', './assets/SFX/launch_sound.wav');

        // inventory systems
        this.load.image('inventorytile', './assets/UI/inventorytile.png');
        this.load.image('returnbutton', './assets/UI/buttons/returnship_button.png');
        this.load.json('items', './data/Items.json');

        // items
        this.load.image('rock', './assets/items/rockicon.png');
    }
    create() {
        this.scene.start('titlescreen');
    }
}