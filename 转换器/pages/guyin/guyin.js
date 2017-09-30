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
  },
  translate: function () {
    var that = this;
    var str = this.data.data_ch;
    if(str = '') return;
    var flag = true;
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) < 255) //如果是汉字，则字符串长度加2
        flag = false;
    }
    if (flag) {
      wx.request({
        url: "https://xcx.thinkmoon.cn/guyin/",
        method: "POST",
        data: {
          char: this.data.data_ch,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log("succssed");
          console.log(res.data)
          that.setData({
            img_url: "https://xcx.thinkmoon.cn/guyin/"+res.data
          })
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