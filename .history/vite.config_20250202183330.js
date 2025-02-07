// npx serve dist

// import { defineConfig } from 'vite';
// import { fileURLToPath, URL } from 'node:url';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//     plugins: [react()],
//     resolve: {
//         alias: {
//             '@': fileURLToPath(new URL('./src', import.meta.url)), // 别名配置，@ 指向 src 目录
//         },
//     },


//     build: {
//         outDir: 'dist',
//         assetsDir: 'assets', // 确保静态资源放在 assets 目录中
//         base: './',
//         rollupOptions: {
//             input: 'index.html', // 确保入口文件路径正确
//             output: {
//                 entryFileNames: 'assets/[name]-[hash].js',
//                 chunkFileNames: 'assets/[name]-[hash].js',
//                 assetFileNames: 'assets/[name]-[hash].[ext]'
//             }
//         }
//     },

// });
