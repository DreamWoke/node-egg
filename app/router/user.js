

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  console.log(router);
  router.get('/login', controller.user.login);
};

