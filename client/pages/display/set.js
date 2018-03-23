// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  sliderchange:function(e){
    wx.setStorageSync("pt", e.detail.value);
    console.log("字号:"+wx.getStorageSync("pt"))
  },
  input_display: function (e) {
    if (e.detail.value.length < 50){
      var that = this;
      this.setData({
        display: e.detail.value,
      })
      wx.getStorage({
        key: 'display',
        success: function (res) {
          that.setData({
            character: e.detail.value.length,
          })
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '不支持输入超过50个字',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  display: function () {
    var display = this.data.display;
    console.log("设置的display值" + display)
    try {
      wx.setStorageSync('display', display)
    } catch (e) {
      console.log("设置diaplay值错误")
    }
    wx.showToast('成功', 'success', 2000)
    wx.navigateTo({
      url: 'article'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync("pt", "48");
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
    wx.getStorage({
      key: 'display',
      success: function (res) {
        console.log("display的值为" + res.data)
        that.setData({
          display: res.data,
          character: res.data.length,
        })
      }
    })
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