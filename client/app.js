//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
const Towxml = require('/vendor/towxml/main');     //引入towxml库
App({
  doRequest: function (request_url, request_data,show=true) {
    var options = {
      url: request_url,
      login: true,
      data: request_data,
      success: function (res) {
        if(show){
          wx.showModal({
            title: res.data.title,
            content: res.data.content,
          })
        } 
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    }
    qcloud.request(options)
  },
  login: function () {
    if (this.data.logged) return

    util.showBusy('正在登录')
    var that = this

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功')
          that.setData({
            userInfo: result,
            logged: true
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功')
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },
  new_app : function(){
    if (new Date() < new Date("2018.3.15")){
      wx.setStorageSync("new", true)
    }
  },
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
        wx.setStorageSync("like_num", "0");
        this.new_app();
    },
    towxml: new Towxml()
})