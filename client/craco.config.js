const path = require('path')
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  addons: [
    {
      name: 'storybook-preset-craco',
      options: {
        cracoConfigFile: '../craco.config.js',
      },
    },
  ],
  webpack: {
    alias: {
      // '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@libs': path.resolve(__dirname, 'src/libs'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@tests': path.resolve(__dirname, 'src/__test__'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@apis': path.resolve(__dirname, 'src/apis'),
      '@type': path.resolve(__dirname, 'src/types'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  jest: {
    configure: {
      preset: 'ts-jest',
      moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json'],
      transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest',
      },
      testEnvironment: 'node',
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      }),
      transformIgnorePatterns: ['<rootDir>/node_modules/'],
    },
  },
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import "src/styles/colors.scss";
        `,
      },
    },
  },
}
