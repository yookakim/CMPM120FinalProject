class TradingMenu extends Phaser.Scene {
    constructor() {
        super('tradingmenu');
    }
    
    preload() {
        this.load.image('returnshipbutton', './assets/returnship_button.png');
    }

    create() {
        this.add.text(40, 40, 'this is the scene where you barter and exchange');

        // again, later on, we can have a ubiquitous scene that handles UI for us
        // (maybe make child objects of a base Scene.UIScene class?)

        this.loadUI();
    }

    loadUI() {
        this.add.sprite(game.config.width - 200, game.config.height - 125, 'returnshipbutton')
            .setInteractive()
            .on('pointerdown', this.returnToShip, this);
    }

    returnToShip() {
        this.scene.switch('planetmenu');
    }

}