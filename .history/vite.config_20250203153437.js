import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePluginAliases } from 'vite-plugin-aliases';
import { loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [
            react(),
            vitePluginAliases({
                entries: [
                    { find: '@', replacement: './src' }, // 别名配置，@ 指向 src 目录
                ],
            }),
        ],
        server: {
            force: true, // 强制刷新所有模块
        },
        resolve: {
            alias: [
                { find: '@', replacement: './src' }, // 备份别名配置
            ],
        },
        build: {
            outDir: 'dist', // 输出目录
            assetsDir: 'assets', // 确保静态资源放在 assets 目录中
            base: env.VITE_BASE_PATH || './', // 使用相对路径或环境变量中的路径
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
    };
});
