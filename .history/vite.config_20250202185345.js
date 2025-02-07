// npx serve dist

import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import path from 'path';


export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // '@': fileURLToPath(new URL('./src', import.meta.url)), // 别名配置，@ 指向 src 目录
            '@': path.resolve(__dirname, 'src'), // 别名配置，@ 指向 src 目录
        },
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets', // 确保静态资源放在 assets 目录中
        base: './', // 使用相对路径
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                home: path.resolve(__dirname, 'public/view/Home.html'),
                mine: path.resolve(__dirname, 'public/view/Mine.html'),
                detail: path.resolve(__dirname, 'public/view/Detail.html'),
                mine: path.resolve(__dirname, 'public/view/Serve.html'),
                mine: path.resolve(__dirname, 'public/view/Mine.html'),
            },
            output: {
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor'; // 将第三方库打包到 vendor.js 中
                    }
                },
            },
        },
    },
});
