class Engine {
    constructor(game) {
        this.game = game;

        // the starting strength of our engine; should not be touched at runtime.
        this.initialEngineOutput = this.game.registry.get('INITIAL_ENGINE_OUTPUT');

        // set engine power (speed) when constructed
        this._engineOutput = this.initialEngineOutput;

        // engineEfficiency = the number of distance units travelled per one unit of fuel
        this.engineEfficiency = this.game.registry.get('INITIAL_ENGINE_EFFICIENCY');

    }

    get engineOutput() {
        // and then get it with a getter and the registry.get method
        return this._engineOutput;
    }
}