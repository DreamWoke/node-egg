const Service = require('egg').Service;
const fnv = require('fnv-plus');
const cosUtil = require('../utils/cos');
class UploadService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }
  // upload service
  async getCosUploadResult() {
    const timestamp = new Date().getTime();
    const stream = await this.ctx.getFileStream();
    const type = stream.mimeType.split('/')[1];
    const newFileName = `${fnv.hash(`${stream.filename}${timestamp}`, '64').dec()}.${type}`;
    const cosResult = await cosUtil.putObject({
      key: newFileName,
      buffer: stream,
    });
    console.log(cosResult);
    return cosResult;
  }
}
module.exports = UploadService;
