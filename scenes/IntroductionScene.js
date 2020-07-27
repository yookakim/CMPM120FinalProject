/* 
    Intermediary scene between title screen and start that acts as
    an exposition of the world/game/mechanics to player before game start

    Yooha Kim
*/

'use strict';

class IntroductionScene extends Phaser.Scene {
    constructor() {
        super('introductionscene');
    }

    create() {
        this.loadUI();
    }

    loadUI() {
        this.add.image(0, 0, 'introbackground').setOrigin(0, 0);
        this.add.text(50, 50, 'The year unknown, known history lost in the depths of time...', SUBHEADER_TEXT_STYLE);

        this.titlemusicintro = this.sound.add('titlemusicintro', DEFAULT_SFX_CONFIG);
        this.titlemusic = this.sound.add('titlemusic', {
            volume: .7,
            loop: true
        });
        this.titlemusicintro.on('complete', this.startMusicLoop, this);
        this.titlemusicintro.play();


        var text = [
            'You and your fellow Pyrates of Sol, who you imagined unbreakable and undefeatable,',
            'have scattered far and wide across the galaxies after the latest Federation onslaught.',
            'Left alone, you manage to escape the clutches of death in your humble barge, leaving your',
            'past further and further behind with each bitter warp.\n\n',
            'With the Federation finally off your tail, you find momentary solace in the bleak',
            'silence, but soon realize its short-lived nature as the vastness of space slowly seeps through',
            'mind and soul. Only now do you truly realize you are alone, and perhaps alone forever, your friends',
            'and allies more gone than dead.\n\n',
        ]
        this.add.text(50, 120, text, INTRO_TEXT_STYLE);

        this.startButton = new ButtonTemplate(this, game.config.width / 2, (3 * game.config.height) / 4, 'introstartbutton');

        this.startButton.on('pointerdown', this.loadPlanetSelection, this);
    }

    startMusicLoop() {
        this.titlemusic.play();
    }

    loadPlanetSelection() {
        this.scene.start('planetselection');
    }
}