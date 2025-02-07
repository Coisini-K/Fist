import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)), // 别名配置，@ 指向 src 目录
        },
    },


    build: {
        outDir: 'dist',
        assetsDir: 'assets', // 确保静态资源放在 assets 目录中
        // rollupOptions: {
        //     output: {
        //         manualChunks(id) {
        //             if (id.includes('node_modules')) {
        //                 return 'vendor'; // 将 node_modules 中的模块打包到 vendor chunk 中
        //             }
        //         },
        //     },
        // },
        // chunkSizeWarningLimit: 1000, // 调整 chunk 大小警告限制，单位是 KB
    },


     base: '/', // 根据实际情况调整
  plugins: [vue()],

});
