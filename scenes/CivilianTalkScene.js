/* 
    Interaction scene between civilian and player
*/

'use strict';

class CivilianTalkScene extends Phaser.Scene {
    constructor() {
        super('civiliantalkscene');
        this.civilian;
    }

    preload() {
        this.load.image('return', './assets/UI/buttons/return_to_settlement_button.png');
    }

    create() {
        this.civilian = this.scene.settings.data;

        this.add.text(10, 10, 'You initiate a conversation with ' + this.civilian.name, DEFAULT_TEXT_STYLE);

        this.loadUI();
    }

    loadUI() {
        this.add.sprite(game.config.width - 200, game.config.height - 125, 'return')
            .setInteractive()
            .on('pointerdown', this.returnToSettlement, this);
    }

    returnToSettlement() {
        this.scene.switch('settlementmenu');
        this.scene.stop('civiliantalkscene');
    }
}