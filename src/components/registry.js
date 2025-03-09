// src/utils/registry.js

//切换页面 加载对应和卸载相应js和css
class Registry {
    constructor() {
        this.initFunctions = {};
        this.destroyFunctions = {};
    }

    InitFunction(route, initFunction) {
        this.initFunctions[route] = initFunction;
    }

    DestroyFunction(route, destroyFunction) {
        this.destroyFunctions[route] = destroyFunction;
    }

    async initPage(route) {
        const initFunction = this.initFunctions[route];
        if (initFunction) {
            await initFunction();
        }
    }

    async destroyPage(route) {
        const destroyFunction = this.destroyFunctions[route];
        if (destroyFunction) {
            await destroyFunction();
        }
    }
}

const registry = new Registry();
export default registry;
