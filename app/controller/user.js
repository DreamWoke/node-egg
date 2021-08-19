

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    console.log('login');
    ctx.body = {
      code: 0,
      message: 'success',
    };
  }
  async index() {
    const { ctx } = this;
    console.log('index');
    ctx.body = 'lll';
  }
}

module.exports = UserController;
