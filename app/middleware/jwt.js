const jwt = require('jsonwebtoken');
const { NoCheckList } = require('../constant');
// const searchSql = require('./utils/searchSql');
/* jwt密钥 */
const secret = 'console';

/* token验证 异常处理 */
module.exports = () => async (ctx, next) => {
  console.log(ctx.request);
  const token = ctx.header.authorization;
  if (!NoCheckList.includes(ctx.request.url)) {
    try {
      const user = await jwt.verify(token, secret);
      if (user) {
      // const userInfo = await searchSql(`SELECT * FROM user WHERE id="${user.id}"`);
      // 解析完应该放到state中
      // ctx.state.userInfo = userInfo[0];
        ctx.state.userInfo = '789';
        console.log(ctx.state);
        await next();
      }
    } catch (error) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: error.message,
      };
    }
  } else {
    await next();
  }
};
// /* 获取token */
// const getToken = (payload = {}) => {
//   return jwt.sign(payload, secret, { expiresIn: '24h' });
// };

