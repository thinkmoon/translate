//index.js
//获取应用实例
const app = getApp()

const host = 'https://xcx.thinkmoon.cn/';

var config = require("../../config.js");
Page({
  data: {
    img_url: config.service.resUrl +"res/default.jpg",
    data_ch: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("index页面进入参数source为"+options.source)
    app.set_data();
    if(options.source != null){
      this.setData({
        img_url:options.source,
        data_ch:options.target,
      })
    }
    wx.getStorage({
      key: 'display',
      fail: function (res) {
        try {
          wx.setStorageSync('display', "上邪\n我欲与君相知\n长命无绝衰\n山无陵\n江水为竭\n冬雷震震\n夏雨雪\n天地合\n乃敢与君绝\n")
          console.log("初始化display")
        } catch (e) {
          console.log("设置diaplay值错误")
        }
      }
    })
    
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
  preview:function(){
    wx.previewImage({
      current: this.data.img_url, // 当前显示图片的http链接
      urls: ["https://xcx.thinkmoon.cn/public/res/default.jpg", this.data.img_url] // 需要预览的图片http链接列表
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
            img_url: host+res.data
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
  save:function(){
    wx.downloadFile({
      url: this.data.img_url, 
      complete: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log("下载文件:"+res)
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success:function(res) {
                app.log("保存文件", res);
                wx.showModal({
                  title: '保存成功',
                  content: '谢谢您的支持' ,
                })
            }
          })
        }
      }
    })
  },
  like: function () {
    app.doRequest(config.service.baseUrl + "stamp/like", { 'img_url': this.data.img_url });
  }
})
