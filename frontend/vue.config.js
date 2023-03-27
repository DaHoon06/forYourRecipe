const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "No.1 Recipe";
      return args;
    });
  },
  configureWebpack: {
    devtool: "source-map",
  },
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3666",
        changeOrigin: true,
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/assets/css/color.scss"; 
        @import "@/assets/css/font.scss";
        `,
      },
    },
  },
});
