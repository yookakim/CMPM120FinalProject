class TitleScreen extends Phaser.Scene {
    constructor() {
        super('titlescreen');
    }
    preload() {

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