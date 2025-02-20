import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    plugins: [
        {
            name: 'custom-index-html-transform',
            transformIndexHtml(html) {
                // 替换所有的 /assets/ 为 ./assets/
                // html = html.replace(/\/assets\//g, './assets/');
                
                // 替换所有的 <link rel="modulepreload" 为 <script type="module"
                html = html.replace(/<link rel="modulepreload" crossorigin href="([^"]+)">/g, (match, p1) => {
                    if (p1.endsWith('.js')) {
                        return `<script type="module" crossorigin src="${p1}"></script>`;
                    }
                    return match;
                });

                // 确保所有的 <link rel="stylesheet" 包含 type="text/css"
                html = html.replace(/<link rel="stylesheet"/g, '<link rel="stylesheet" type="text/css"');

                return html;
            },
        },
    ],
    server: {
        force: true, // 强制刷新所有模块
    },
    resolve: {
        alias: {
            // '@': path.resolve(__dirname, 'src'), // 别名配置，@ 指向 src 目录
            '@': fileURLToPath(new URL('./src', import.meta.url)), // 别名配置，@ 指向 src 目录
            // '@constant': fileURLToPath(new URL('./src/constant', import.meta.url)), // 别名配置，@ 指向 src 目录
            // '@constant': path.resolve(__dirname, '../../constant'), // 具体别名指向 constant 目录
        },
    },
    base: './', // 设置 base 为相对路径
    build: {
        outDir: 'dist', // 输出目录
        assetsDir: 'assets', // 确保静态资源放在 assets 目录中
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                // router: path.resolve(__dirname, 'src/router/router.js'),
                // categories: path.resolve(__dirname, 'src/constant/Categories.js'),
                // recommends: path.resolve(__dirname, 'src/constant/Recommends.js'),
                // reception: path.resolve(__dirname, 'src/stores/reception.js'),
                // date: path.resolve(__dirname, 'src/utils/date.js'),
                // detailStyle: path.resolve(__dirname, 'src/style/Detail.css'),
                // indexStyle: path.resolve(__dirname, 'src/style/index.css'),
                // loginStyle: path.resolve(__dirname, 'src/style/login.css'),
                // registeredStyle: path.resolve(__dirname, 'src/style/registered.css'),
                // detailComponent: path.resolve(__dirname, 'src/components/Detail.js'),
                // HomeComponent: path.resolve(__dirname, 'src/components/Home/Home.js'),
                // indexComponent: path.resolve(__dirname, 'src/components/index.js'),
                // loginComponent: path.resolve(__dirname, 'src/components/login.js'),
                // registeredComponent: path.resolve(__dirname, 'src/components/registered.js'),
                // registryComponent: path.resolve(__dirname, 'src/components/registry.js'),
            },
            output: {
                // entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',

                assetFileNames: ({ name }) => {
                    if (name.endsWith('.css')) return `assets/[name]-[hash].css`;
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