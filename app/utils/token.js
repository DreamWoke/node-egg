const jwt = require('jsonwebtoken');
module.exports = {
  getToken: payload => {
    return jwt.sign(payload, 'box', { expiresIn: '24h' });
  },
};
