const Controller = require('egg').Controller;

class UploadController extends Controller {
  async upload() {
    const cosResult = await this.ctx.service.upload.getCosUploadResult();
    this.ctx.status = 200;
    this.ctx.body = {
      code: 0,
      data: {
        url: `https://${cosResult.Location}`,
      },
      message: '成功',
    };
  }
}

module.exports = UploadController;
