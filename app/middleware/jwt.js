const jwt = require('jsonwebtoken');
const { NoCheckList } = require('../constant');
/* jwt密钥 */
const secret = 'box';

/* token验证 异常处理 */
module.exports = () => async (ctx, next) => {
  const token = ctx.header.authorization;
  console.log(ctx.app, token);
  if (!NoCheckList.includes(ctx.request.url)) {
    try {
      const user = await jwt.verify(token, secret);
      if (user) {
        const userInfo = await ctx.app.mysql.query(`SELECT id,name,password FROM user WHERE name = "${user.name}"`);
        // 解析完应该放到state中
        console.log(userInfo);
        ctx.state.userInfo = userInfo[0];
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
