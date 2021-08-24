

const Controller = require('egg').Controller;
const { getToken } = require('../utils/token');
const { errorCodes } = require('../utils/errorCode');

class UserController extends Controller {
  // 登录/注册
  async login() {
    const { name, password } = this.ctx.request.body;
    const result = await this.app.mysql.query(`SELECT id,name,password FROM user WHERE name = "${name}"`);
    const token = getToken({ name, password });
    if (result.length === 0) {
      // 注册
      await this.app.mysql.insert('user', { name, password });
      this.ctx.body = {
        code: 0,
        data: { token },
        message: '注册成功',
      };
    } else {
      // 登录
      if (result[0].password !== password) {
        this.ctx.body = errorCodes;
      } else {
        this.ctx.body = {
          code: 0,
          data: { token },
          message: '登录成功',
        };
      }

    }
  }
  async getUserInfo() {
    this.ctx.body = {
      code: 0,
      data: this.ctx.state.userInfo,
      message: 'success',
    };
  }
}

module.exports = UserController;
