const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/vue3",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", {
        loader: 'sass-loader',
        options: {
          additionalData: `
						@import "@/assets/css/index.scss";
						@import "@/assets/css/font.scss";
						@import "@/assets/css/color.scss";
					`
        }
      }],
      include: path.resolve(__dirname, "../"),
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
    };
    return config;
  },
};
