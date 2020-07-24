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
        this.add.text(100, 100, 'cool end game scene with even cooler story and stuff \nunder construction woooo', SUBHEADER_TEXT_STYLE);

        this.add.text(100, 200, 'you decide to settle in on this planet.', DEFAULT_TEXT_STYLE);

        this.add.text(100, 300, 'You travelled a total of ' + ship.totalTravelDistance + ' light years.');
    }
}