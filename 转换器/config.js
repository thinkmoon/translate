var host = 'xcx.thinkmoon.cn';

var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,
    // 登录地址，用于建立会话
    stampUrl: `https://${host}/stamp/`,
  }
};

module.exports = config;