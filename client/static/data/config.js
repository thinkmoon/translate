/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://320632942.thinkmoon.cn/weapp';

var stamp_host = 'https://mp.thinkmoon.cn';

var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,
    //基础地址
    baseUrl: `${host}/`,

    // 登录地址，用于建立会话
    loginUrl: `${host}/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/upload`,
  },
  stamp:{
    stamp_host,
    img_host:`http://mp.thinkmoon.cn`
  }
};

module.exports = config;