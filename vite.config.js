//vite.config.js
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni"
import AutoImport from "unplugin-auto-import/vite";
import path from 'path';
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ["vue"], 
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), //配置路径别名
    },
  },
});
