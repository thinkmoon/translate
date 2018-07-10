"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parse = require("../../../packages/parse-svg-path/index.js");
exports.default = Page({
  data: {
    img_src: "https://xcx.thinkmoon.cn?str=thinkmoon&site=0"
  },
  onLoad: function onLoad(options) {
    var img = "https://xcx.thinkmoon.cn?" + "str=" + encodeURI(options.str) + "&site=" + options.site;
    this.setData({
      img_src: img,
      str: options.str,
      site: options.site
    });
    console.log(options);
  },

  preview: function preview() {
    wx.previewImage({
      current: this.data.img_src, // 当前显示图片的http链接
      urls: [this.data.img_src] // 需要预览的图片http链接列表
    });
  },
  save: function save() {
    wx.downloadFile({
      url: this.data.img_src,
      complete: function complete(res) {
        console.log("下载文件:" + res);
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function success(res) {
              wx.showModal({
                title: '保存成功',
                content: '谢谢您的支持'
              });
            }
          });
        }
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function onShareAppMessage() {
    var str = this.data.display;
    var pages = getCurrentPages(); //获取加载的页面
    var currentPage = pages[pages.length - 1]; //获取当前页面的对象
    var url = currentPage.route;
    var inUrl = url + "?str=" + this.data.str + "&site=" + this.data.site;
    console.log("分享的链接为" + inUrl);
    return {
      title: '您的好友给您分享了一段篆文',
      path: inUrl,
      success: function success(res) {
        // 转发成功
      },
      fail: function fail(res) {
        // 转发失败
      }
    };
  }
});