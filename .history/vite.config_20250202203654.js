import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    plugins: [react()],
    
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // 别名配置，@ 指向 src 目录
        },
    },
    build: {
        outDir: 'dist', // 输出目录
        assetsDir: 'assets', // 确保静态资源放在 assets 目录中
        base: './', // 使用相对路径
        rollupOptions: {
            input: path.resolve(__dirname, 'index.html'), // 入口文件在项目根目录
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
