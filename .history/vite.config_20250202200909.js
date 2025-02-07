import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // 别名配置，@ 指向 src 目录
        },
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets', // 确保静态资源放在 assets 目录中
        base: './', // 使用相对路径
        rollupOptions: {
            input: path.resolve(__dirname, 'index.html'), // 只有一个入口文件
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
