// pages/self/my_like.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

const app = getApp()
Page({
  doRequest: function () {
    var that = this
    var options = {
      url: config.service.baseUrl + "stamp/my_like",
      login: true,
      success: function (res) {
        console.log(res.data);
        var urls=new Array();
        var data = res.data.img_url;
        that.setData({ arr: data});
        data.forEach(function (val, index, arr) {
          urls.push(data[index]['img_url']);
        });
        that.setData({ Urls: urls });
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    }
    qcloud.request(options)
  },
 preview:function(e){
   var current_url=e.currentTarget.dataset.img_url;
   wx.previewImage({
     current: current_url, // 当前显示图片的http链接
     urls: this.data.Urls // 需要预览的图片http链接列表
   })
 },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.doRequest();
  },
})