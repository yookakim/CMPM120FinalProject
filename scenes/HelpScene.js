class HelpScene extends Phaser.Scene {
    constructor() {
        super('helpscene');
    }

    create() {
        this.loadUI();
    }

    loadUI() {

        // this.add.text(200, 2 * game.config.height / 8, 'You may only warp to a planet if your engine is', DEFAULT_TEXT_STYLE);
        // this.add.text(200, 2.2 * game.config.height / 8, 'powerful or efficient enough.', DEFAULT_TEXT_STYLE);
        // this.add.text(200, 2.8 * game.config.height / 8, 'travel time: distance / engine power', DEFAULT_TEXT_STYLE);
        // this.add.text(200, 3 * game.config.height / 8, 'max travel distance: engine power * engine efficiency', DEFAULT_TEXT_STYLE);
        // this.add.text(200, 3.2 * game.config.height / 8, '(TODO: we probably put this information in a help/info scene, or use some tooltips/labels)', DEFAULT_TEXT_STYLE);
        // this.add.text(200, 3.6 * game.config.height / 8, 'Three tiers to sanity: 0-29, 30 - 69, 70 - 99; each tier brings different interactions with\n planet inhabitants', DEFAULT_TEXT_STYLE);
        // this.add.text(200, 4.2 * game.config.height / 8, '(also put this in separate help/tips scene, probably big button under the Inventory button)', DEFAULT_TEXT_STYLE);

        // Question for later: How much should a game explain to its players,
        // and how much should it leave for the players to figure out for themselves?

        this.add.text(100, 60, 'Travelling to Planet', SUBHEADER_TEXT_STYLE);
        this.planetTravelText = [
            'You may only travel to a planet if the distance is in your range!',
            'The max range of your travel distance is determined by a combination of your engine',
            'efficiency and engine output. Once you arrive, you only have a certain number of hours',
            'to take actions, so be mindful of how much time you have left!'
        ]
        this.add.text(100, 100, this.planetTravelText, DEFAULT_TEXT_STYLE);

        this.add.text(100, 220, 'Visiting a Settlement', SUBHEADER_TEXT_STYLE);
        this.tradingText = [
            'Once you have travelled to a planet, you can choose to visit its local inhabitants',
            'and interact with them. Different types of civilians will give different kinds of talk',
            'or trade different types of items.',
        ]
        this.add.text(100, 260, this.tradingText, DEFAULT_TEXT_STYLE);

        this.add.text(100, 360, 'Sanity', SUBHEADER_TEXT_STYLE);
        this.sanityText = [
            'Afflicted by your own loneliness and isolation, you will lose a certain amount of',
            'Sanity points for every day you spend in warp-time. Depending on your sanity, you',
            'will experience different reactions from local inhabitants, and certain merchants',
            'may sell different wares depending on your sanity level.',
        ]
        this.add.text(100, 400, this.sanityText, DEFAULT_TEXT_STYLE);

        this.add.text(100, 520, 'Scavenging', SUBHEADER_TEXT_STYLE);
        this.scavengingText = [
            'While visiting a planet, you can also choose to visit the local ecosystem and',
            'collect resources that may help you in your trades with the natives on each planet.',
        ]
        this.add.text(100, 560, this.scavengingText, DEFAULT_TEXT_STYLE);
        this.add.sprite(game.config.width - 200, game.config.height - 125, 'returnbutton')
            .setInteractive()
            .on('pointerdown', this.returnToShip, this);    
    }
    returnToShip() {
        this.scene.wake('planetselection');
        this.scene.start('planetselectionui');
        this.scene.stop('helpscene');
    }
}