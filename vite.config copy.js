import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    {
      name: "custom-index-html-transform",
      transformIndexHtml(html) {
        // 替换所有的 <link rel="modulepreload" 为 <script type="module"
        html = html.replace(
          /<link rel="modulepreload" crossorigin href="([^"]+)">/g,
          (match, p1) => {
            if (p1.endsWith(".js")) {
              return `<script type="module" crossorigin src="${p1}"></script>`;
            }
            return match;
          }
        );

        // 确保所有的 <link rel="stylesheet" 包含 type="text/css"
        html = html.replace(
          /<link rel="stylesheet"/g,
          '<link rel="stylesheet" type="text/css"'
        );
        return html;
      },
    },
  ],
  server: {
    force: true, // 强制刷新所有模块
    // port: 3000, // 可以指定端口，默认是3000
    open: true, // 自动打开浏览器
  },
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, 'src'), // 别名配置，@ 指向 src 目录
      "@": fileURLToPath(new URL("./src", import.meta.url)), // 别名配置，@ 指向 src 目录
      // '@constant': fileURLToPath(new URL('./src/constant', import.meta.url)), // 别名配置，@ 指向 src 目录
      // '@constant': path.resolve(__dirname, '../../constant'), // 具体别名指向 constant 目录
    },
  },
  base: "./", // 设置 base 为相对路径
  build: {
    outDir: "dist", // 输出目录
    assetsDir: "assets", // 确保静态资源放在 assets 目录中
    manifest: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        // Detail: path.resolve(__dirname, './Detail.html'),

        login: path.resolve(__dirname, "login.html"),
        loginJs: path.resolve(__dirname, "src/components/login.js"),
        registered: path.resolve(__dirname, "registered.html"),
        registeredJs: path.resolve(__dirname, "src/components/registered.js"),
        Detail: path.resolve(__dirname, "Detail.html"),
        DetailJs: path.resolve(__dirname, "src/components/Detail.js"),
      },
      output: {
        // entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: "assets/[name]-[hash].js",

        assetFileNames: ({ name }) => {
          if (name.endsWith(".css")) return `assets/[name]-[hash].css`;
          return `assets/[name]-[hash].[ext]`;
        },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // 将第三方库打包到 vendor.js 中
          }
        },
      },
    },
  },
});
