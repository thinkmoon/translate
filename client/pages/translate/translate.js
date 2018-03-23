//index.js
//获取应用实例
const app = getApp()

var config = require("../../config.js");
var that;
//-------- 自定义函数 ---------
//显示当前的字体库
var showFont = function(){
  wx.request({
    url: config.service.baseUrl + 'Stamp/showFont',
    success: function (res) {
      console.log(res);
      that.setData({ fonts: res.data })
    }
  })
}
// 显示错误提示函数
var showError = function(content){
  that.setData({
    showTopTips: true,
    tipsContent: content,
  });
  setTimeout(function () {
    that.setData({
      showTopTips: false
    });
  }, 5000);
}
var setStr=function(str){
  var url = [];
  var i;
  for (i = 0; i < str.length; i++) {
    url.push(config.service.stampUrl + "?str=" + str[i]);
  }
  that.setData({
    img_arr: url,
    width: 100 / (i) < 10 ? 10 : 100 / (i),
    height: Math.floor(100 / Math.ceil(i / 10))
  });
}
//判断输入是否正确
var judgeInput = function(str){
  var flag = true;
  if (str == "" || str.length > 30){
    showError("输入不合法");
    return;
  } 
  else{
    setStr(str);
  }
}
//-------- Page函数 ----------
Page({
  data: {
    data_ch: "",
    fontID: 0,
    height:100,
    width:100
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    showFont();
    setStr("家");
  },
  //预览函数
  preview: function () {
    wx.previewImage({current: config.service.baseUrl, urls: this.data.img_arr})
  },
  //转换函数
  translate: function () {
    judgeInput(this.data.data_ch)
  },
  //输入函数
  inputch: function (e) {
    this.setData({data_ch: e.detail.value})
  },
  //分享接口
  onShareAppMessage: function (res) {
    var inUrl = '/pages/index/index';
    console.log(inUrl);
    return {
      title: '篆书转换器',
      path: inUrl,
      imageUrl: this.data.img_url,
    }
  },
  //字体切换事件
  bindFontChange: function (e) {
    console.log('picker Fonts 发生选择改变，携带值为', e.detail.value);
    this.setData({
      fontID: e.detail.value
    })
  },
  save: function () {
    wx.downloadFile({
      url: this.data.img_url,
      complete: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log("下载文件:" + res)
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (res) {
              app.log("保存文件", res);
              wx.showModal({
                title: '保存成功',
                content: '谢谢您的支持',
              })
            }
          })
        }
      }
    })
  },
  like: function () {
    app.doRequest(config.service.baseUrl + "stamp/like", { 'img_url': this.data.img_url }
  ,false);
    wx.setStorageSync("like_num", Number(wx.getStorageSync("like_num")) + Number(1))
    wx.showModal({
      title: '收藏成功',
      content: '是否跳转到收藏页？',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({url: '../user/my_like'})
        } 
      }
    })
  },
  longpress: function () {
    wx.showActionSheet({
      itemList: ['收藏', '下载'],
      itemColor: "#2b393c",
      success: function (res) {
        if (res.tapIndex == 0) {
          that.like()
        } else {
          that.save()
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
})
