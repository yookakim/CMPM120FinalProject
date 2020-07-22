class EndGameScene extends Phaser.Scene {
    constructor() {
        super('endgamescene');
    }

    create() {
        this.add.text(100, 100, 'you win hooray lol', DEFAULT_TEXT_STYLE);
    }
}