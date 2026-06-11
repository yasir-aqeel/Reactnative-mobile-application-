const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    experimentalImportSupport: false,
    inlineRequires: true,
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg', 'cjs'],
  },
  watchFolders: [path.resolve(__dirname, 'node_modules')],
};

module.exports = mergeConfig(defaultConfig, config);
