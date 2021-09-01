const COS = require('cos-nodejs-sdk-v5');

const cosUtil = {
  cos: new COS({
    SecretId: 'AKIDD9HApFpLqRpyfXf2eLo2ZApFUUUPsxts', // 密钥id
    SecretKey: 'tY04HJk1OVGEvWC6k7IQVKsyNclscHfn', // 密钥key
  }),
  Bucket: 'console-upload-1300990907', // 存储桶名称
  Region: 'ap-shanghai', // 存储桶区域
  Prefix: '/', // 路径前缀

  putObject(param) {
    return new Promise((resolve, reject) => {
      this.cos.putObject(
        {
          Bucket: this.Bucket /* 必须 */,
          Region: this.Region /* 必须 */,
          Key: param.key /* 必须 */,
          Body: param.buffer /* 必须 */,
        },
        function(err, data) {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        }
      );
    });
  },
};

module.exports = cosUtil;
