

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  require('./router/user')(app);
  router.post('/api/upload', controller.upload.upload);
};
