/* eslint valid-jsdoc: "off" */


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1629184510779_7921';

  // add your middleware config here
  config.middleware = [ 'jwt' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: '121.4.83.203',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'qyj3312938',
      // database
      database: 'box-community',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  return {
    ...config,
    ...userConfig,
  };
};
