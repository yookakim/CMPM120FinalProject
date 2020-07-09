class Engine {
    constructor() {
        // the starting strength of our engine; should not be touched at runtime.
        this.initialEngineOutput = game.registry.get('INITIAL_ENGINE_OUTPUT');


        // when constructed, set a data entry in the registry for its properties
        this._engineOutput = game.registry.set('engineOutput', this.initialEngineOutput);
    }

    get engineOutput() {
        // and then get it with a getter and the registry.get method
        return game.registry.get('engineOutput');
    }
}