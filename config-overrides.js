module.exports = function override(config) {
  // do stuff with the webpack config...
  config.module.rules[1].oneOf.splice(
    config.module.rules[1].oneOf.length - 1,
    0,
    {
      test: /\.example$/,
      use: ['raw-loader'],
    },
  );
  return config;
};
