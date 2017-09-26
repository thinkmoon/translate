//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    img_url: '',
    userInfo: {},
    data_ch:""
  },
  //事件处理函数
  request: function () {
    var that = this;
    console.log(this.data.data_ch)
    wx.request({
      url: "https://www.thinkmoon.cn/translate/translate.php",
      method:"POST",
      data:{
          textch:this.data.data_ch,
      },
      header: {
      'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
         console.log("succssed");
        console.log(res.data)
        that.setData({
          img_url: res.data
        })
      }
    })
  },
  inputch:function(e){
    this.setData({
      data_ch:e.detail.value
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
