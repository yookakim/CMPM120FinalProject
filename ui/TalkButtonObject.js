/* 
    Button class that loads talk scene on click

    Yooha Kim
*/

class TalkButtonObject extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, civilian) {
        super(scene, x, y, texture, frame);        

        this.scene = scene;
        this.x = x;
        this.y = y;

        this.civilian = civilian;

        this.setInteractive();
        scene.add.existing(this);

        this.on('pointerdown', this.onClick, this);

    }

    onClick() {
        // start talk scene with civilian
        this.scene.loadCivilianTalkScene(this.civilian);
    }
}