// pages/article/guyin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var str = options.display;
    if(str != null){
      try {
        console.log("正则替换前"+str)
        str = str.replace(/tim/g, "\n")
        wx.setStorageSync('display', str)
        console.log("正则替换后" + str)
      } catch (e) {
        console.log("设置diaplay值错误")
      }
    }  
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
    var str = this.data.display;
    str=str.replace(/\n/g, "tim")
    var inUrl = '/pages/article/guyin?display=' + str;
    console.log("待分享的页内链接为"+inUrl);
    return {
      title: '篆书转换器',
      path: inUrl,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})