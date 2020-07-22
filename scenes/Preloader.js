class Preloader extends Phaser.Scene {
    constructor () {
        super('preloader');
    }

    preload() {

        this.load.image('titlezone', './assets/UI/title_zone.png');
        this.load.image('titlestartbutton', './assets/UI/buttons/title_start_button.png');
        
        // backgrounds
        this.load.image('settlementbackground', './assets/settlement_background.png');
        this.load.image('inventoryscenebackground', './assets/spaceship_inventory_background.png');

        // buttons/UI
        this.load.image('shiptinkerbutton', './assets/UI/buttons/ship_tinker_button.png');
        this.load.image('settlementbutton', './assets/UI/buttons/visit_settlement_button.png');
        this.load.image('nextplanetbutton', './assets/UI/buttons/next_planet_button.png');
        this.load.image('returnshipbutton', './assets/UI/buttons/returnship_button.png');
        this.load.image('talkbutton', './assets/UI/buttons/settlement_talk_button.png');
        this.load.image('meetbutton', './assets/UI/buttons/settlement_meet_button.png');
        this.load.image('tradebutton', './assets/UI/buttons/civilian_trade_button.png');
        this.load.image('return', './assets/UI/buttons/return_to_settlement_button.png');
        this.load.image('cancelbutton', './assets/UI/buttons/cancel_button.png');
        this.load.image('confirmtradebutton', './assets/UI/buttons/confirm_trade_button.png');
        
        // planet selection
        this.load.image('planetbutton', './assets/temp_planet.png');
        this.load.image('selectdestinationbanner', './assets/UI/select_destination_banner.png');
        this.load.image('inventorybutton', './assets/UI/buttons/inventory_button.png');
        this.load.image('statszone', './assets/UI/planetselection_stats_zone.png');
        this.load.image('fuelbutton', './assets/UI/buttons/fuel_button.png');
        
        // planet scene
        this.load.image('planet', './assets/planetscene_bigplanet.png');
        this.load.image('planetstats', './assets/UI/planetmenu_stats_placeholder.png');
        
        // settlement/civilian scenes

        // inventory systems
        this.load.image('inventorytile', './assets/UI/inventorytile.png');
        this.load.image('returnbutton', './assets/UI/buttons/returnship_button.png');
        
        this.load.json('items', './data/Items.json');

        // items
        this.load.image('highlightborder', './assets/items/highlightborder.png');
        this.load.image('rock', './assets/items/rockicon.png');
        this.load.image('xorenergydrink', './assets/items/xorenergydrinkicon.png');
        this.load.image('piratebadge', './assets/items/piratebadgeicon.png');
        this.load.image('upgradekit', './assets/items/upgradekiticon.png');
        this.load.image('goldbag', './assets/items/goldbagicon.png');
        this.load.image('childtoy', './assets/items/childtoyicon.png');
        this.load.image('book', './assets/items/bookicon.png');
        this.load.image('fedcursingdoll', './assets/items/fedcursingdollicon.png');
        

        // audio
        this.load.audio('launchsound', './assets/SFX/launch_sound.wav');
        this.load.audio('doorknock', './assets/SFX/door_knock.wav');
    }

    create() {
        
        // load the json file from global cache into our global variable for the data object
        ITEMLIST = this.cache.json.get('items');
        this.scene.start('titlescreen');
    }
}