import { defineConfig } from "vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const inputs = {
    template: path.resolve(__dirname, "assets/pug/pages/template/index.html"),
    "starter-kit": path.resolve(
      __dirname,
      "assets/pug/pages/starter-kit/index.html"
    ),
  };

  return {
    root: ".",
    build: {
      emptyOutDir: false,
      sourcemap: false,
      rollupOptions: {
        input: {
          [mode]: inputs[mode],
        },
        output: {
          entryFileNames: (chunk) => {
            if (chunk.name === "template") return "template/index.html";
            if (chunk.name === "starter-kit") return "starter-kit/index.html";
            return "[name].html";
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith(".css")) {
              return "assets/css/style.css";
            }
            return "assets/[name].[ext]";
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "assets/scss/style.scss";`,
        },
      },
    },
    server: {
      open: "/template/index.html",
      port: 3000,
      strictPort: true,
    },
  };
});
