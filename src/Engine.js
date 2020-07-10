class Engine {
    constructor(game) {
        this.game = game;

        // set engine power (speed) when constructed
        this._engineOutput = this.game.registry.get('INITIAL_ENGINE_OUTPUT');
        // engineEfficiency = the number of distance units travelled per one unit of fuel
        this._engineEfficiency = this.game.registry.get('INITIAL_ENGINE_EFFICIENCY');
        // this._warpRange = this._engineOutput * 

    }

    get engineOutput() {
        // and then get it with a getter and the registry.get method
        return this._engineOutput;
    }
    get engineEfficiency() {
        // and then get it with a getter and the registry.get method
        return this._engineEfficiency;
    }
}