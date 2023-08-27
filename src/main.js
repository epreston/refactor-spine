// vite will process, minify, and manage css
import './base.css';

import * as pc from 'playcanvas';

// the spine plugin
import { plugin } from './plugin/spine-plugin.js';

const assets = {
    skeleton: new pc.Asset('skeleton', 'json', {
        url: './assets/4.1/raptor-pro.json'
    }),
    atlas: new pc.Asset('atlas', 'text', {
        url: './assets/4.1/raptor.atlas'
    }),
    texture: new pc.Asset('raptor.png', 'texture', {
        url: './assets/4.1/raptor.png'
    })
};

// create a canvas element at the app location
const canvas = document.createElement('canvas');
const location = document.querySelector('#app');
location.appendChild(canvas);

// create a PlayCanvas application
const app = new pc.Application(canvas, {
    mouse: new pc.Mouse(canvas),
    keyboard: new pc.Keyboard(window)
});

// install the plugin
plugin.registerComponentSystem(app);

// fill the available space at full resolution
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);

// ensure canvas is resized when window changes size
window.addEventListener('resize', () => app.resizeCanvas());

// load assets
const assetListLoader = new pc.AssetListLoader(
    Object.values(assets),
    app.assets
);

// ready to render
assetListLoader.load(() => {
    app.start();

    // create camera entity
    const camera = new pc.Entity('camera');
    camera.addComponent('camera', {
        clearColor: new pc.Color(0.5, 0.6, 0.9)
    });
    camera.translateLocal(0, 7, 20);
    app.root.addChild(camera);

    addSpineAnimations();
    addSafetyBox();
});

function addSpineAnimations() {
    const createSpineInstance = (position, scale, timeScale) => {
        const spineEntity = new pc.Entity();
        spineEntity.addComponent('spine', {
            atlasAsset: assets.atlas.id,
            skeletonAsset: assets.skeleton.id,
            textureAssets: [assets.texture.id]
        });
        spineEntity.setLocalPosition(position);
        spineEntity.setLocalScale(scale);
        app.root.addChild(spineEntity);

        // play spine animation
        // @ts-ignore
        spineEntity.spine.state.setAnimation(0, 'walk', true);

        // @ts-ignore
        spineEntity.spine.state.timeScale = timeScale;
    };

    // create spine entity 2
    createSpineInstance(
        new pc.Vec3(2, 10, 0),
        new pc.Vec3(-0.5, 0.5, 0.5),
        0.5
    );

    // create spine entity 1
    createSpineInstance(new pc.Vec3(-1, 0, 0), new pc.Vec3(1, 1, 1), 1);
}

function addSafetyBox() {
    // create safety box entity (for scale)
    const box = new pc.Entity('cube');
    box.addComponent('model', {
        type: 'box'
    });
    app.root.addChild(box);

    // create directional light entity
    const light = new pc.Entity('light');
    light.addComponent('light');
    light.setEulerAngles(45, 0, 0);
    app.root.addChild(light);

    // rotate the box according to the delta time since the last frame
    app.on('update', (dt) => {
        box.rotate(10 * dt, 20 * dt, 30 * dt);
    });
}
