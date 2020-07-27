/* 
    Preload all the assets before game start for ease of use
    and less cluttered scene code

    Yooha Kim
*/

'use strict';

class Preloader extends Phaser.Scene {
    constructor () {
        super('preloader');
    }

    preload() {

        this.load.image('titlezone', './assets/title_banner.png');
        
        
        // backgrounds
        this.load.image('introbackground', './assets/intro_background.png');
        this.load.image('settlementbackground', './assets/settlement_background.png');
        this.load.image('settlementbackground2', './assets/settlement_background_2.png');
        this.load.image('settlementbackground4', './assets/settlement_background_4.png');
        this.load.image('inventoryscenebackground', './assets/spaceship_inventory_background.png');
        this.load.image('planetselectionbackground', './assets/cockpitview_planetselection_background.png');
        this.load.image('endbackground', './assets/end_planet_background.png');

        // buttons/UI
        this.load.image('titlestartbutton', './assets/UI/buttons/title_start_button.png');
        this.load.image('introstartbutton', './assets/UI/buttons/introduction_start_button.png');
        this.load.image('helpbutton', './assets/UI/buttons/help_button.png');
        this.load.image('shiptinkerbutton', './assets/UI/buttons/ship_tinker_button.png');
        this.load.image('settlementbutton', './assets/UI/buttons/visit_settlement_button.png');
        this.load.image('ecosystembutton', './assets/UI/buttons/visit_ecosystem_button.png');
        this.load.image('nextplanetbutton', './assets/UI/buttons/next_planet_button.png');
        this.load.image('returnshipbutton', './assets/UI/buttons/returnship_button.png');
        this.load.image('talkbutton', './assets/UI/buttons/settlement_talk_button.png');
        this.load.image('meetbutton', './assets/UI/buttons/settlement_meet_button.png');
        this.load.image('scavengebutton', './assets/UI/buttons/ecosystem_scavenge_button.png');
        this.load.image('tradebutton', './assets/UI/buttons/civilian_trade_button.png');
        this.load.image('return', './assets/UI/buttons/return_to_settlement_button.png');
        this.load.image('cancelbutton', './assets/UI/buttons/cancel_button.png');
        this.load.image('confirmtradebutton', './assets/UI/buttons/confirm_trade_button.png');
        this.load.image('restartbutton', './assets/UI/buttons/restart_button.png');
        this.load.image('creditsbutton', './assets/UI/buttons/credits_button.png');
        this.load.image('gogglesinfofield_civilian', './assets/UI/gogglesinfofield_civilian.png');
        this.load.image('gogglesinfofield_outcast', './assets/UI/gogglesinfofield_outcast.png');
        this.load.image('gogglesinfofield_merchant', './assets/UI/gogglesinfofield_merchant.png');
        
        // planet selection
        this.load.image('planetbutton', './assets/temp_planet.png');
        this.load.image('selectdestinationbanner', './assets/UI/select_destination_banner.png');
        this.load.image('inventorybutton', './assets/UI/buttons/inventory_button.png');
        this.load.image('statszone', './assets/UI/planetselection_stats_zone.png');
        this.load.image('fuelbutton', './assets/UI/buttons/fuel_button.png');
        
        // planet scene
        this.load.image('planetscenebackground', './assets/planetscene_background.png');
        this.load.image('temperateplanet', './assets/planetscene_temperateplanet.png');
        this.load.image('icyplanet', './assets/planetscene_icyplanet.png');
        this.load.image('desertplanet', './assets/planetscene_desertplanet.png');
        this.load.image('humidplanet', './assets/planetscene_humidplanet.png');
        this.load.image('planetstats', './assets/UI/planetmenu_stats_placeholder.png');
        this.load.image('threehourslabel', './assets/UI/threehourslabel.png');
        this.load.image('twohourslabel', './assets/UI/twohourslabel.png');
        
        // ecosystem/scavenging scenes
        this.load.image('ecosystem_temperate', './assets/ecosystemmenu_temperate_background.png');
        this.load.image('ecosystem_icy', './assets/ecosystemmenu_icy_background.png');
        this.load.image('ecosystem_desert', './assets/ecosystemmenu_desert_background.png');
        this.load.image('ecosystem_humid', './assets/ecosystemmenu_humid_background.png');

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
        this.load.image('mystiviancharm', './assets/items/mystiviancharmicon.png');
        this.load.image('andrometine', './assets/items/andrometineicon.png');
        this.load.image('centauriteclaws', './assets/items/centauriteclawsicon.png');
        this.load.image('federationinfogoggles', './assets/items/federationinfogogglesicon.png');

        // planet resource items
        this.load.image('tomfruit', './assets/items/tomfruiticon.png');
        this.load.image('furs', './assets/items/fursicon.png');
        this.load.image('rawgems', './assets/items/rawgemsicon.png');
        this.load.image('coal', './assets/items/coalicon.png');
        this.load.image('goldenfigure', './assets/items/goldenfigureicon.png');
        this.load.image('frostcutlass', './assets/items/frostcutlassicon.png');
        this.load.image('panaceneplant', './assets/items/panaceneplanticon.png');
        this.load.image('duocornfossil', './assets/items/duocornfossilicon.png');
        

        // audio
        this.load.audio('launchsound', './assets/SFX/launch_sound.wav');
        this.load.audio('doorknock', './assets/SFX/door_knock.wav');
        this.load.audio('titlemusic', './assets/SFX/titlemusic.wav');
        this.load.audio('titlemusicintro', './assets/SFX/titlemusic_4barintro.wav');
    }

    create() {
        
        // load the json file from global cache into our global variable for the data object
        ITEMLIST = this.cache.json.get('items');
        this.scene.start('titlescreen');
    }
}