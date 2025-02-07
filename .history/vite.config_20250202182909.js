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


import { defineConfig } from 'vite';
import { resolve } from 'path';
import viteStaticCopy from 'vite-plugin-static-copy';

export default defineConfig({
    base: './', // 使用相对路径
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                home: resolve(__dirname, 'public/view/home.html'),
                serve: resolve(__dirname, 'public/view/serve.html'),
                // 添加其他页面
            },
            output: {
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]'
            }
        },
        outDir: 'dist',
        assetsDir: 'assets'
    },
    plugins: [
        viteStaticCopy({
            targets: [
                { src: 'public/**/*', dest: '' },
                { src: 'src/style/**/*', dest: 'assets/style' },
                { src: 'src/components/**/*', dest: 'assets/components' }
            ]
        })
    ]
});
