module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@assets': './assets',
            '@components': './app/components',
          },
        },
      ],
      // Remova 'react-native-worklets/plugin' se estiver usando Reanimated!
      'react-native-reanimated/plugin', // sempre por último!
    ],
  };
};
