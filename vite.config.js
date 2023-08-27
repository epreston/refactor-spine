// vite.config.js

import { defineConfig, splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [splitVendorChunkPlugin()],
    // additional asset types
    assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.m4a'],
    build: {
        // minify: false,
        // assetsInlineLimit: 0,
        target: [
            'es2022',
            'edge112',
            'firefox112',
            'chrome112',
            'safari16.4',
            'ios16.4'
        ],
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // creating a chunk to semver deps. Reducing the vendor chunk size
                    if (
                        id.includes('semver') ||
                        id.includes('yallist') ||
                        id.includes('lru-cache')
                    ) {
                        return 'semver';
                    }
                    // creating a chunk to playcanvas deps. Reducing the vendor chunk size
                    if (
                        id.includes('playcanvas') ||
                        id.includes('@playcanvas')
                    ) {
                        return 'playcanvas';
                    }
                    // creating a chunk to spine-core deps. Reducing the vendor chunk size
                    if (
                        id.includes('spine41') ||
                        id.includes('@esotericsoftware/spine-core') ||
                        id.includes('spine-core')
                    ) {
                        return 'spine41';
                    }
                }
            }
        }
    }
});
