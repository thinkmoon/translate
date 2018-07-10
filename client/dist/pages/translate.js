"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require("../static/data/config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Page({
  data: {
    data_ch: "",
    fontID: 0,
    height: 100,
    width: 100,
    showMask: false
  },
  //显示字体
  showFont: function showFont() {
    var that = this;
    var options = {
      url: _config2.default.stamp.stamp_host,
      success: function success(res) {
        that.setData({ fonts: res.data });
      }
    };
    wx.request(options);
  },

  //关闭错误提醒
  closeError: function closeError() {
    this.setData({ showTopTips: false });
  },


  //显示错误信息
  showError: function showError(content) {
    this.setData({
      showTopTips: true,
      tipsContent: content
    });
    setTimeout(closeError, 5000);
  },


  //判断输入是否正确
  judgeInput: function judgeInput(str) {
    var flag = true;
    if (str == "" || str.length > 30) {
      this.showError("输入不合法");
      return;
    } else {
      this.setStr(str, this.data.fontID);
    }
  },

  //监听页面加载
  onLoad: function onLoad(options) {
    //myUtils.draw("http://mp.thinkmoon.cn:39999?str=我&site=0","mycanvas")
    this.showFont();
    //this.setData({showMask:true});
  },
  setStr: function setStr(str) {
    var site = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var url = [];
    var i;
    for (i = 0; i < str.length; i++) {
      url.push(_config2.default.stamp.img_host + ":39999?str=" + str[i] + "&site=" + site);
    }
    console.log(url);
    this.setData({
      img_arr: url,
      width: 100 / i < 10 ? 10 : 100 / i,
      height: Math.floor(100 / Math.ceil(i / 10))
    });
  },

  //转换函数
  translate: function translate() {
    this.judgeInput(this.data.data_ch);
  },


  //输入函数
  inputch: function inputch(e) {
    this.setData({ data_ch: e.detail.value });
  },


  //分享接口
  onShareAppMessage: function onShareAppMessage(res) {
    return {
      title: '我在用这个小程序，你也来看看吧'
    };
  },


  //字体切换事件
  bindFontChange: function bindFontChange(e) {
    console.log('picker Fonts 发生选择改变，携带值为', e.detail.value);
    this.setData({
      fontID: e.detail.value
    });
  }
});