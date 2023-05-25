const path = require('path/posix')
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
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@libs': path.resolve(__dirname, 'src/libs'),
    },
  },
  jest: {
    configure: {
      // preset: 'ts-jest',
      // moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json'],
      // transform: {
      //   '^.+\\.(js|jsx)?$': 'babel-jest',
      // },
      // testEnvironment: 'node',
      // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
      //   prefix: '<rootDir>/',
      // }),
      moduleNameMapper: {
        '^\\@components/(.*)$': '<rootDir>/src/components/$1',
        '^\\@pages/(.*)$': '<rootDir>/src/pages/$1',
        '^\\@libs/(.*)$': '<rootDir>/src/libs/$1',
      },
      // transformIgnorePatterns: ['<rootDir>/node_modules/'],
    },
  },
}
