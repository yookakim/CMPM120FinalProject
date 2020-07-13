class TitleScreen extends Phaser.Scene {
    constructor() {
        super('titlescreen');
    }
    preload() {
        this.load.image('titlezone', './assets/UI/title_zone.png');
        this.load.image('titlestartbutton', './assets/UI/buttons/title_start_button.png');
    }

    create() {
        this.add.sprite(game.config.width / 2, game.config.height / 3, 'titlezone');

        this.startButton = new ButtonTemplate(this, game.config.width / 2, (3 * game.config.height) / 4, 'titlestartbutton');

        this.startButton.on('pointerdown', this.loadPlanetSelection, this);
        
    }

    loadPlanetSelection() {
        this.scene.start('planetselection');
    }
}