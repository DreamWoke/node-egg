

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  console.log(router);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/getUserInfo', controller.user.getUserInfo);
  router.post('/api/user/reviseUserInfo', controller.user.reviseUserInfo);
};

