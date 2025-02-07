import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: './', // 确保此选项设置为 '/'
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)), // 别名配置，@ 指向 src 目录
        },
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets', // 确保静态资源放在 assets 目录中
        rollupOptions: {
            input: 'index.html', // 确保入口文件路径正确
            output: {
                entryFileNames: `assets/[name]-[hash].js`,
                chunkFileNames: `assets/[name]-[hash].js`,
                assetFileNames: `assets/[name]-[hash].[ext]`
            }
        }
    }
});
