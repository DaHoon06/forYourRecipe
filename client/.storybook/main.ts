import type { StorybookConfig } from '@storybook/react-webpack5'
import * as path from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        {
          loader: 'sass-loader',
          options: {
            additionalData: `
						 @import "../src/styles/colors.scss";
             @import "../src/styles/global.scss";
						`,
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    })
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, '../src/components/'),
      '@pages': path.resolve(__dirname, '../src/pages/'),
      '@interfaces': path.resolve(__dirname, '../src/interfaces/'),
      '@type': path.resolve(__dirname, '../src/types/'),
      '@styles': path.resolve(__dirname, '../src/styles/'),
    }
    return config
  },
}
export default config
