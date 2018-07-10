"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: { character: "0" },
  input_display: function input_display(e) {
    if (e.detail.value.length < 50) {
      var that = this;
      this.setData({
        display: e.detail.value
      });
      wx.getStorage({
        key: 'display',
        success: function success(res) {
          that.setData({
            character: e.detail.value.length
          });
        }
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
  onShow: function onShow() {}
});