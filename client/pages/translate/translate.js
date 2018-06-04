//index.js
//获取应用实例
const app = getApp()

var config = require("../../config.js");
var that;
//-------- 自定义函数 ---------
//显示当前的字体库
var showFont = function(){
  wx.request({
    url: config.stamp.stamp_host,
    success: function (res) {
      console.log(res);
      that.setData({ fonts: res.data })
    },
    complete:function(res){
      console.log(res);
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
var setStr=function(str,site=0){
  var url = [];
  var i;
  for (i = 0; i < str.length; i++) {
    url.push(config.stamp.img_host + ":39999?str=" + str[i] +"&site=" + site);
  }
  console.log(url);
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
    setStr(str,that.data.fontID);
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
})
