// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  input_display: function (e) {
    this.setData({
      display: e.detail.value
    })
  },
  display:function(){
        var display=this.data.display;
        console.log("设置的display值"+display)
        try {
          wx.setStorageSync('display', display)
        } catch (e) {
          console.log("设置diaplay值错误")
        }
        wx.showToast('成功','success',2000)
        wx.navigateTo({
          url: 'article'
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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