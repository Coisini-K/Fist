import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import path from 'path';

export default defineConfig({
    plugins: [
        react(),
        {
            name: 'custom-index-html-transform',
            transformIndexHtml(html) {
                // 替换所有的 /assets/ 为 ./assets/
                return html.replace(/\/assets\//g, './assets/');
            },
        },
    ],
    server: {
        force: true, // 强制刷新所有模块
    },
    resolve: {
        alias: {
            // '@': path.resolve(__dirname, 'src'), // 别名配置，@ 指向 src 目录
        },
    },
    base: '/', // 设置 base 为相对路径
    build: {
        outDir: 'dist', // 输出目录
        assetsDir: 'assets', // 确保静态资源放在 assets 目录中
        rollupOptions: {
            input: 'index.html', // 入口文件在项目根目录
            output: {
                entryFileNames: (chunkInfo) => {
                    return `assets/${chunkInfo.name}-[hash].js`;
                },
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.endsWith('.css')) {
                        return `assets/[name]-[hash].css`;
                    }
                    return `assets/[name]-[hash].[ext]`;
                },
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor'; // 将第三方库打包到 vendor.js 中
                    }
                },
            },
        },
    },
});
