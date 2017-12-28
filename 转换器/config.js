var host = 'xcx.thinkmoon.cn';
//var host='localhost/mp';
var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,
    // 登录地址，用于建立会话
    stampUrl: `https://${host}/index.php?c=stamp&m=index`,
    baseUrl: `https://${host}/`,
    resUrl: `https://${host}/public/`
  }
};

module.exports = config;