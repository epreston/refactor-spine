# Refactor PlayCanvas Spine (Archive)

Completed: https://github.com/playcanvas/playcanvas-spine/pull/80

Refactor: https://github.com/playcanvas/playcanvas-spine  
Issue: https://github.com/playcanvas/playcanvas-spine/issues/79  
Spine: https://github.com/EsotericSoftware/spine-runtimes

[![CI][ci-badge]][ci-url]

## Summary

Current implementation modifies the global "pc" variable to store its data. In the more modern and performant builds of pc engine, this does not work.

The current implementation of spine needs to store data and make features available to every app instance that the global "pc" instance might create. It needs to persist it even when those app instances, scenes, or root nodes are destroyed. At the time, a clever and graceful solution was to tuck things neatly into the "pc" variable to make sure its available no matter what happens.

While the chances for conflict are low, modern language features have been introduced to solve conflicts between vendor libraries. Unfortunately, the current approach is what a conflicting vendor library would do. If the spine plugin implementation took a different approach to meet those goals, this issue goes away.

It seems a small refactor is required.

This issue was first raised on the engine project here:
https://github.com/playcanvas/engine/issues/5399

## Notes

From 4.0, the latest patch version is on NPM. for 3.6 and 3.8, its available as branches in the repo.
To automate updates, npm versions are aliased to make multiple versions of the same package available to this project. See package.json (spine40, spine41).

For older versions, EsotericSoftware provide iife builds and instructions to modify them for use as ESM exports. Not ideal for an engine integration or plugin (its more targeted at inclusion in html headers). For the rewrite, its better to generate esm from the typescript source for each version with:

```
esbuild --bundle spine-ts/core/index.ts --target=es6 --sourcemap --outfile=spine.x.x.js --format=es
```

The next steps for the code are generating ESM bundles for 3.6 and 3.8 from the typescript source because vendor only publishes processed typescript to npm from 4.0. At that point, we need to remove the "context" (it needs to be top level undefined), introduce Babel to support language correct es5 and es6 targets (if translation is required), and flip the module setting accordingly.

## Setup

Download [Node.js](https://nodejs.org/en/download/).

Run the following commands:

```bash
# install dependencies
npm install

# start a local server in development mode
npm run dev
```

## Commands

| Action | Command          | Description                           |
| ------ | ---------------- | ------------------------------------- |
| dev    | `npm run dev`    | Start live coding development server  |
| build  | `npm run build`  | Create a production build into "dist" |
| lint   | `npm run lint`   | Run static code analysis              |
| format | `npm run format` | Format code in PlayCanvas style       |
| start  | `npm run start`  | Start server and open in browser      |

## Tools

| Tool         | Reference                   |
| ------------ | --------------------------- |
| PlayCanvas   | https://playcanvas.com      |
| Spine        | http://esotericsoftware.com |
| Node.js      | https://nodejs.org          |
| Vite         | https://vitejs.dev          |
| ESLint       | https://eslint.org          |
| Prettier     | https://prettier.io         |
| EditorConfig | https://editorconfig.org    |

## Ecosystem

| Tool          | Reference                                              |
| ------------- | ------------------------------------------------------ |
| Engine        | https://github.com/playcanvas/engine                   |
| Editor        | https://github.com/playcanvas/editor                   |
| Model Viewer  | https://github.com/playcanvas/model-viewer             |
| UI Library    | https://github.com/playcanvas/pcui                     |
| ESLint Config | https://github.com/playcanvas/playcanvas-eslint-config |

## References

| Website            | Reference                                        |
| ------------------ | ------------------------------------------------ |
| PlayCanvas API     | https://developer.playcanvas.com                 |
| Spine Runtimes API | http://esotericsoftware.com/spine-runtimes-guide |
| Can I Use          | https://caniuse.com                              |
| Browserslist       | https://browsersl.ist                            |
| WebGL2             | https://www.khronos.org/webgl/                   |
| glTF               | https://www.khronos.org/gltf/                    |
| Fundamentals       | https://webgl2fundamentals.org                   |

## License

This template is released under the MIT [License](LICENSE).

[ci-badge]: https://github.com/epreston/refactor-spine/actions/workflows/ci.yml/badge.svg
[ci-url]: https://github.com/epreston/refactor-spine/actions
