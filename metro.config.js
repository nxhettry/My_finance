const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = async () => {
  const defaultConfig = mergeConfig(getDefaultConfig(__dirname), config);

  return {
    ...defaultConfig,
    maxWorkers: 2,
  };
};
