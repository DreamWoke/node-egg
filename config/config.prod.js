/* eslint valid-jsdoc: "off" */


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
                   * built-in config
                   * @type {Egg.EggAppConfig}
                   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1629184510779_7921';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // port
  config.cluster = {
    listen: {
      port: 7002,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
