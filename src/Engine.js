'use strict';

class Engine {
    constructor() {


        // set engine power (speed) when constructed
        this._engineOutput = game.registry.get('INITIAL_ENGINE_OUTPUT');

        // engineEfficiency = the number of distance units travelled per one unit of fuel
        this._engineEfficiency = game.registry.get('INITIAL_ENGINE_EFFICIENCY');

    }

    get engineOutput() {
        // and then get it with a getter and the registry.get method
        return this._engineOutput;
    }
    set engineOutput(value) {
        this._engineOutput = value;
    }
    get engineEfficiency() {
        // and then get it with a getter and the registry.get method
        return this._engineEfficiency;
    }
    set engineEfficiency(value) {
        this._engineEfficiency = value;
    }
}