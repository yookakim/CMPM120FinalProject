/* 
    Scene which runs on game end and displays summary, statistics, achievements,
    and ending flavor text

    Yooha Kim
*/

'use strict';

class EndGameScene extends Phaser.Scene {
    constructor() {
        super('endgamescene');
    }

    create() {
        this.add.image(0, 0, 'endbackground').setOrigin(0, 0);
        this.add.text(100, 100, 'After a long journey throughout the cosmos, you decide to settle down.', SUBHEADER_TEXT_STYLE);

        this.add.text(100, 200, 'You move into the settlement on ' + ship.currentPlanet.name + ', and start a life anew.', DEFAULT_TEXT_STYLE);

        this.add.text(100, 300, 'You travelled a total of ' + ship.totalTravelDistance + ' light years,', DEFAULT_TEXT_STYLE);
        this.add.text(100, 320, 'traded away a total value of ' + ship.totalValueSold + ',', DEFAULT_TEXT_STYLE);
        this.add.text(100, 340, 'and scavenged a total of ' + ship.totalItemsScavenged + ' items.', DEFAULT_TEXT_STYLE);
    
        this.restartButton = new ButtonTemplate(this, game.config.width / 2, 500, 'restartbutton');
        this.restartButton.on('pointerdown', () => {
            ship.resetGame();
            this.scene.start('titlescreen');
        }, window);

        this.creditsButton = new ButtonTemplate(this, game.config.width / 2, 500, 'creditsbutton');
        
        this.creditsButton.on('pointerdown', () => {
            this.scene.start('creditsscene');
        }, this)
    }
}