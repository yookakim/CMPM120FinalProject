class InventoryCell extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, key) {
        
        super(scene, x, y, key);
        this.isOccupied = false;

        // actual item data cell is holding
        this.occupant;

        // the sprite that represents the item
        this.representative;
        
        this.setScale(8, 8);
        scene.add.existing(this);
    }
}