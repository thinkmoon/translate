// pages/self/self.js
var config = require("../../config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url: "/asset/avatar.jpeg",
    nick_name: "醉月老哥"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: config.service.baseUrl + "index.php?c=Login&m=index",
            data: {
              code: res.code
            },
            complete: function (res) {
              console.log(res);
              try {
                wx.setStorageSync('ID', res.data)
              } catch (e) {
              }
              wx.getUserInfo({
                success: function (res) {
                  var userInfo = res.userInfo;
                  that.setData({
                    img_url: userInfo.avatarUrl,
                    nick_name: userInfo.nickName,
                  })
                },
                fail: function () {
                  wx.showToast({
                    title: '失败',
                  })
                }
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})