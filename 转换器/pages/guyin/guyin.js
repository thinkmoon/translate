// pages/guyin/guyin.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img_url: "/asset/guyin.jpg"
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
  
  },

  inputch: function (e) {
    this.setData({
      data_ch: e.detail.value
    })
    console.log(this.data.data_ch+"写入成功");
  },
  translate: function () {
    var that = this;
    var str = this.data.data_ch;
    if(str = '') return;
    var flag = true;
console.log(str);
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) < 255)
        flag = false;
    }
    if (flag) {
      wx.request({
        url: "http://localhost/stamp",
        method: "GET",
        data: {
          char: this.data.data_ch,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log("request succssed");
          var url = "http://localhost/stamp/" + res.data;
          that.setData({
            img_url: url
          })
          console.log(url)
        }
      })
    } else {
      that.setData({
        img_url: "/asset/guyin.jpg",
        tip: "啊哦！亲，别输入不合法的字符哦！"
      })
    }
  },
})