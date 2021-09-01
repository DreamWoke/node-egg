const Controller = require('egg').Controller;
const { getToken } = require('../utils/token');
const { errorCodes } = require('../utils/errorCode');
const { isPlainObject } = require('../utils/function');

class UserController extends Controller {
  // 登录/注册
  async login() {
    const { name, password } = this.ctx.request.body;
    const result = await this.app.mysql.query(
      `SELECT id,name,password FROM user WHERE name = "${name}"`
    );
    const token = getToken({ name, password });
    if (result.length === 0) {
      // 注册
      await this.app.mysql.insert('user', {
        name,
        password,
      });
      this.ctx.body = {
        code: 0,
        data: { token },
        message: '注册成功',
      };
    } else {
      // 登录
      if (result[0].password !== password) {
        this.ctx.body = errorCodes.errorIdentity;
      } else {
        this.ctx.body = {
          code: 0,
          data: { token },
          message: '登录成功',
        };
      }
    }
  }
  // 获取用户信息
  async getUserInfo() {
    const userInfo = await this.app.mysql.query(
      `SELECT * FROM userInfo WHERE id = "${this.ctx.state.userInfo.id}"`
    );
    console.log(userInfo);
    if (userInfo.length === 0) {
      await this.app.mysql
        .query(`INSERT INTO userInfo (id, nickName, address, gender, industry)
      VALUES ("${this.ctx.state.userInfo.id}","","",1,"")`);
    }
    this.ctx.body = {
      code: 0,
      data: userInfo[0],
      message: 'success',
    };
  }
  async reviseUserInfo() {
    try {
      if (isPlainObject(this.ctx.request.body)) {
        console.log('is object');
        console.log(Object.entries(this.ctx.request.body));
        const requestEntries = Object.entries(
          this.ctx.request.body
        );
        let sqlStr = '';
        requestEntries.forEach((item, index) => {
          sqlStr += `${item[0]} = "${item[1]}"${
            index !== requestEntries.length - 1 ? ',' : ''
          }`;
        });
        console.log(sqlStr);
        // const sqlUpdate = Object.keys(this.ctx.request.body)
        await this.app.mysql.query(
          `UPDATE userInfo SET ${sqlStr} WHERE id = "${this.ctx.state.userInfo.id}"`
        );
        this.ctx.body = {
          code: 0,
          message: 'success',
        };
      } else {
        throw Error('参数错误');
      }
    } catch (e) {
      this.ctx.status = 500;
      this.ctx.body = {
        code: 1,
        message: e,
      };
    }
  }
}

module.exports = UserController;
