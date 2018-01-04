//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    set_data: function () {
      var options = {
        url: config.service.baseUrl+'stamp',
        success: function (res) {
          if(res.data != ''){
            wx.setClipboardData({ data: res.data });
          }
        }
      }
      wx.request(options);
    },
    doRequest: function (request_url, request_data) {
      var options = {
        url: request_url,
        login: true,
        data: request_data,
        success: function (res) {
          wx.showModal({
            title: res.data.title,
            content: res.data.content,
          })
        },
        fail(error) {
          util.showModel('请求失败', error);
          console.log('request fail', error);
        }
      }
      qcloud.request(options)
    },
    login: function() {
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
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    }
})