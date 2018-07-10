"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// circleMenu4.js
exports.default = Page({
  data: {
    STATUS_BAR_HEIGHT: wx.STATUS_BAR_HEIGHT,
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT + 'px',
    rotate1: '',
    rotate2: '',
    rotate3: '',
    switch: false,
    height: wx.DEFAULT_CONTENT_HEIGHT + 'px',
    customStyle1: {
      'background-color': 'rgba(255, 255, 255, 0.8)'
    }
  },
  navTo: function navTo(event) {
    wx.navigateTo({ url: "/pages/functions/" + event.currentTarget.dataset.aim + "/index" });
  },
  show: function show(event) {
    wx.showModal({
      title: '尊敬的客户',
      content: event.currentTarget.dataset.aim
    });
  },

  //分享接口
  onShareAppMessage: function onShareAppMessage(res) {
    return {
      title: '我在用这个小程序，你也来看看吧'
    };
  }
});