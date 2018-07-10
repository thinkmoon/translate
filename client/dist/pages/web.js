'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var wemark = require('../static/utils/wemark/wemark.js');
exports.default = Page({
  data: {},
  onLoad: function onLoad(options) {
    var _this = this;

    var that = this;
    wx.setNavigationBarTitle({
      title: options.title
    });
    wx.showNavigationBarLoading();
    wx.showLoading({ title: '加载中' });
    wx.request({
      url: options.url,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function success(res) {
        wemark.parse(res.data, _this, { name: 'wemark' });
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      }
    });
  },

  onShareAppMessage: function onShareAppMessage(res) {
    return {
      title: '我在看》》》》'
    };
  }
});