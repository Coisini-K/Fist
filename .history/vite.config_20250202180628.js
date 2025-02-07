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

export default defineConfig({
    // 设置 base 为相对路径，以便于部署
    base: './',

    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                home: resolve(__dirname, 'public/view/home.html'),
                // 添加其他页面
                // otherPage: resolve(__dirname, 'public/view/other-pages.html')
            },
            output: {
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]'
            }
        },
        // 确保公共文件夹中的内容被复制到 dist
        emptyOutDir: true,
        outDir: 'dist',
        assetsDir: 'assets'
    },

    server: {
        open: '/index.html', // 启动服务器时默认打开的页面
    },

    plugins: [
        // 动态导入插件，支持按需加载
        {
            name: 'dynamic-imports',
            enforce: 'pre',
            async transform(code, id) {
                if (id.endsWith('.html')) {
                    // 在这里处理HTML文件中的<script>标签
                    return code.replace(/<script\s+type="module"\s+src="\.\.\/src\/components\/(.*?)\.js"><\/script>/g, (match, componentName) => {
                        const jsFilePath = resolve(__dirname, `src/components/${componentName}.js`);
                        const cssFilePath = resolve(__dirname, `src/style/${componentName}.css`);

                        // 假设我们使用动态导入来加载JS和CSS
                        return `
              <script type="module">
                import('${jsFilePath}').then(module => module.default());
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '${cssFilePath}';
                document.head.appendChild(link);
              </script>
            `;
                    });
                }
                return null;
            }
        }
    ]
});
