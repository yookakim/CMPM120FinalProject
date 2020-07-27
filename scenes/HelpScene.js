class HelpScene extends Phaser.Scene {
    constructor() {
        super('helpscene');
    }

    create() {
        this.loadUI();
    }

    loadUI() {

        // Question for later: How much should a game explain to its players,
        // and how much should it leave for the players to figure out for themselves?

        this.add.text(100, 60, 'Travelling to Planet', SUBHEADER_TEXT_STYLE);
        this.planetTravelText = [
            'You may only travel to a planet if the distance is in your range!',
            'The max range of your travel distance is determined by a combination of your engine',
            'efficiency and engine output. Once you arrive, you only have a certain number of hours',
            'to take actions, so be mindful of how much time you have left!',
            'After 150 days, your journey will come to an end.'
        ]
        this.add.text(100, 100, this.planetTravelText, DEFAULT_TEXT_STYLE);

        this.add.text(100, 240, 'Visiting a Settlement', SUBHEADER_TEXT_STYLE);
        this.tradingText = [
            'Once you have travelled to a planet, you can choose to visit its local inhabitants',
            'and interact with them. Different types of civilians will give different kinds of talk',
            'or trade different types of items.',
        ]
        this.add.text(100, 280, this.tradingText, DEFAULT_TEXT_STYLE);

        this.add.text(100, 380, 'Sanity', SUBHEADER_TEXT_STYLE);
        this.sanityText = [
            'Afflicted by your own loneliness and isolation, you will lose a certain amount of',
            'Sanity points for every day you spend in warp-time. Depending on your sanity, you',
            'will experience different reactions from local inhabitants, and certain merchants',
            'may sell different wares depending on your sanity level.',
        ]
        this.add.text(100, 420, this.sanityText, DEFAULT_TEXT_STYLE);

        this.add.text(100, 540, 'Scavenging', SUBHEADER_TEXT_STYLE);
        this.scavengingText = [
            'While visiting a planet, you can also choose to visit the local ecosystem and',
            'collect resources that may help you in your trades with the natives on each planet.',
        ]
        this.add.text(100, 580, this.scavengingText, DEFAULT_TEXT_STYLE);
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