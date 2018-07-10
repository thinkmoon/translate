"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require("../../../static/data/config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Page({
  data: {
    character: "0",
    display: "天地玄黄",
    fontID: 0
  },
  input_display: function input_display(e) {
    if (e.detail.value.length < 150) {
      var that = this;
      this.setData({
        display: e.detail.value,
        character: e.detail.value.length
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '不支持输入超过50个字',
        success: function success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
  },
  display: function display() {
    var display = this.data.display;
    var site = this.data.fontID;
    console.log("设置的display值" + display + "site:" + site);
    wx.navigateTo({
      url: 'display?str=' + display + '&site=' + site
    });
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    this.showFont();
  },
  bindFontChange: function bindFontChange(e) {
    console.log('picker Fonts 发生选择改变，携带值为', e.detail.value);
    this.setData({
      fontID: e.detail.value
    });
  }
});