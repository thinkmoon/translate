//app.js
var config = require("config.js");
App({
  log: function (operation, data) {
    console.log("保存文件:\n");
    console.log(data);
  },
  set_data: function () { wx.setClipboardData({ data: '9fDcCE92TH' })},
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: config.service.baseUrl + "index.php?c=Login&m=index", data: { code: res.code },
          complete: function (res) {
            console.log(res);
            try { wx.setStorageSync('ID', res.data) } catch (e) { }
            wx.getUserInfo({
              success: function (res) {
                var userInfo = res.userInfo;
                try { wx.setStorageSync('nickName', userInfo.nickName) } catch (e) { }
              },
              fail: function () {
                wx.showToast({
                  title: '失败',
                })
              }
            })
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
