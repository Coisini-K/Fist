import { defineConfig } from "vite";
import path from "path";
import fs from "fs";
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
    {
      name: "copy-manifest",
      apply: "build",
      closeBundle() {
        const manifestPath = path.resolve(__dirname, "dist/manifest.json");
        if (fs.existsSync(manifestPath)) {
          const manifestContent = fs.readFileSync(manifestPath, "utf-8");
          const outputPath = path.resolve(__dirname, "dist", "manifest.json");
          fs.writeFileSync(outputPath, manifestContent);
          console.log("Manifest.json copied to output directory.");
        } else {
          console.error("Manifest.json not found in dist directory.");
        }
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
      "@": fileURLToPath(new URL("./src", import.meta.url)), // 别名配置，@ 指向 src 目录
    },
  },
  base: "./", // 设置 base 为相对路径
  build: {
    outDir: "dist", // 输出目录
    assetsDir: "assets", // 确保静态资源放在 assets 目录中
    manifest: true,
    emptyOutDir: true,
    // sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        login: path.resolve(__dirname, "login.html"),
        loginJs: path.resolve(__dirname, "src/components/login.js"),
        registered: path.resolve(__dirname, "registered.html"),
        registeredJs: path.resolve(__dirname, "src/components/registered.js"),
        Detail: path.resolve(__dirname, "Detail.html"),
        DetailJs: path.resolve(__dirname, "src/components/Detail.js"),
      },
      output: {
        chunkFileNames: "assets/[name]-[hash].js", // 确保使用 [hash] 来保证唯一性
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
