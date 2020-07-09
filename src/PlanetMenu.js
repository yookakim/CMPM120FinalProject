// scene class for the planet view after selecting destination.

'use strict';
class PlanetMenu extends Phaser.Scene {
    constructor() {
        super('planetmenu');
        this.ship;
    }

    create() {
        // ui like text and buttons will probably be managed by a separate Scene overlayed on top later
        this.add.text(10, 10, 'planet view: what actions to take on this planet?');
        this.ship = new Ship
        this.nextPlanetButton = this.add.text(10, 400, 'click me to choose next planet')
            .setInteractive()
            .on('pointerdown', this.loadPlanetSelection, this);
    }

    loadPlanetSelection() {
        this.scene.start('planetselection');
    }
}