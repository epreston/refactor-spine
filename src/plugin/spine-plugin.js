import { Application } from 'playcanvas';

import { SpineComponentSystem } from '../component/SpineComponentSystem.js';

function registerComponentSystem(app) {
    // @ts-ignore
    if (Application.registerPlugin) {
        const register = (app) => {
            // eslint-disable-next-line no-new
            new SpineComponentSystem(app);
        };

        // @ts-ignore
        Application.registerPlugin('spine', register);
    } else {
        const system = new SpineComponentSystem(app);
        app.systems.add(system);
    }
}

const plugin = {
    registerComponentSystem
};

export { plugin };
