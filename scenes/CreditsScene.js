class CreditsScene extends Phaser.Scene {
    constructor(){
        super('creditsscene');
    }

    create() {
        this.add.image(0, 0, 'endbackground').setOrigin(0, 0);
        this.add.text(100, 100, 'Credits', SUBHEADER_TEXT_STYLE);
        this.add.text(140, 180, 'Yooha Kim: Concept, Programming, 2D assets, story, SFX design', DEFAULT_TEXT_STYLE);
        this.add.text(140, 210, 'Oliver Berggren: 3D assets/backgrounds, title art, music', DEFAULT_TEXT_STYLE);
        this.add.text(140, 240, 'Jonathan Palafox: Lore, Dialogue, 2D assets', DEFAULT_TEXT_STYLE);
    
        this.returnButton = new ButtonTemplate(this, game.config.width / 2, 500, 'return');
        
        this.returnButton.on('pointerdown', () => {
            this.scene.start('endgamescene');
        }, this)
    }

    returnToEndScreen() {
        this.scene.start('endgamescene');
        this.scene.stop('creditsscene');
    }
}