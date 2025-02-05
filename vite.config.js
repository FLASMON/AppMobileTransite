import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [vue()],
    base: '/public-client/', // Base URL des assets

    build: {
        sourcemap: true,
        assetsDir: 'assets', // Met les fichiers dans public-client/assets
        outDir: 'C:/laragon/www/MA_TRANSIT/public-client', // Dossier où seront stockés JS/CSS
        emptyOutDir: true, // Nettoie `public-client` avant chaque build
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'src/main.js'), // Fichier JS d'entrée
            },
            output: {
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
            },
        },
    },

    // server: {
    //     port: 3000,
    //     proxy: {
    //         '/api': {
    //             target: 'http://localhost/ma_transit/',
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace(/^\/api/, ''),
    //         },
    //     },
    // },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
