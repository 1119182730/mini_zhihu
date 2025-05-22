import { defineConfig } from "vite";
import type { UserConfig, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { loadEnv } from "vite";

// https://vite.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const { VITE_PORT, VITE_SOURCEMAP } = env;
  console.log(env);
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@views": path.resolve(__dirname, "./src/views"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@styles": path.resolve(__dirname, "./src/styles"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@store": path.resolve(__dirname, "./src/store"),
        "@api": path.resolve(__dirname, "./src/api"),
      },
    },
    server: {
      port: VITE_PORT,
      open: true,
      proxy: {
        "/api": {
          target: `http://localhost:3000`,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
          ws: false,
          changeOrigin: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: false,
        },
      },
    },
    build: {
      target: "esnext",
      outDir: "dist",
      sourcemap: VITE_SOURCEMAP,
    },
  };
};
