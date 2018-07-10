"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Bmob = require('../static/utils/Bmob.min.js');
exports.default = Page({
  data: {},
  onShow: function onShow() {
    var aim = "http://mp.thinkmoon.cn:39999?str=篆&site=" + new Date().getDay();
    this.setData({
      src: aim });
    Bmob.initialize("99cae4b91a08eaae33f99906500a822b", "9e915cd90d0a30c4668553d1f6edcbc9");
    Bmob.User.auth().then(function (res) {
      console.log(res);
      console.log('一键登陆成功');
    }).catch(function (err) {
      console.log(err);
    });
  }
});