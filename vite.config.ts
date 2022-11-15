import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  root: "./src/pages",
  base: "./",
  build: {
    //设置打包出来的静态资源存放目录
    assetsDir: "static",
    rollupOptions: {
      //配置多页应用程序入口文件
      input: ["./src/pages/index.html",
              "./src/pages/enterpriseRegistra.html",
              "./src/pages/login.html",
              "./src/pages/MemberDetails.html",
              "./src/pages/positionDetails.html",
              "./src/pages/positionInfo.html",
              "./src/pages/setEnterpriseInfo.html",
            ],

      //打包到目标目录
      output: { dir: "./dist" },

    }
  },
  server:{
    proxy:{             
      '/api': {
        target: 'http://49.235.119.92:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
});
