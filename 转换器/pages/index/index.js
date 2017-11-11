//index.js
//获取应用实例
// "tabBar": {
  //   "list": [
  //     {
  //       "selectedIconPath": "/icon/community_a.png",
  //       "iconPath": "/icon/community.png",
  //       "pagePath": "pages/guyin/guyin",
  //       "text": "古印"
  //     },
  //     {
  //       "selectedIconPath": "/icon/translate_a.png",
  //       "iconPath": "/icon/translate.png",
  //       "pagePath": "pages/index/index",
  //       "text": "转换"
  //     },
  //     {
  //       "selectedIconPath": "/icon/self_a.png",
  //       "iconPath": "/icon/self.png",
  //       "pagePath": "pages/self/self",
  //       "text": "个人"
  //     }
  //   ]
  // }
const app = getApp()
var config = require("../../config.js");
Page({
  data: {
    img_url: config.service.stampUrl +"./source/白舟篆古印/964e47dab026f322e7fae445abe863bc.jpg",
    data_ch: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.source)
    if(options.source != null){
      this.setData({
        img_url:options.source,
        data_ch:options.target,
      })
    }
    wx.request({
      url: config.service.stampUrl,
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          fonts: res.data,
          fontID:0
        })
      }
    })
  },

  translate: function () {
    this.setData({
      tip:"",
      warn:""
    })
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var str = this.data.data_ch;
    var flag = true;
    if (str == "") flag = false;
    if (str.length >3){
      wx.hideLoading();
      that.setData({
        warn: "亲！您输入的字符太长，可能会影响体验。"
      })
    }
    for (var i = 0; i < str.length; i++) 　　　　
    {
      if (str.charCodeAt(i) < 255) 
        　flag=false;
    }
    if(flag){
      wx.request({
        url: config.service.stampUrl,
        method: "GET",
        data: {
          char: this.data.data_ch,
          fontID: this.data.fontID
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.hideLoading();
          console.log("succssed");
          console.log(res.data)
          that.setData({
            img_url: config.service.stampUrl+res.data
          })
        }
      })
    }else{
      wx.hideLoading();
      that.setData({
        img_url: "https://xcx.thinkmoon.cn/stamp/source/error.png",
        tip:"啊哦！亲，别输入不合法的字符哦！"
      })
    }
    
  },
  inputch: function (e) {
    this.setData({
      data_ch: e.detail.value
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    var inUrl = '/pages/index/index?source=' + this.data.img_url + "&target=" + this.data.data_ch;
    console.log(inUrl);
    return {
      title: '篆书转换器',
      path: inUrl,
      imageUrl:this.data.img_url,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  bindFontChange: function (e) {
    console.log('picker Fonts 发生选择改变，携带值为', e.detail.value);

    this.setData({
      fontID: e.detail.value
    })
  },
})
