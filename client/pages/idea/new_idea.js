// pages/setting/setting.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  input_display: function (e) {
    this.setData({
      idea: e.detail.value
    })
  },
  send:function(){
    this.doRequest();
  },
  doRequest: function () {
    var that = this
    var options = {
      url: config.service.baseUrl + "/stamp/new_idea",
      login: true,
      data:{
        idea: this.data.idea,
      },
      success: function (res) {
        console.log(res.data);
        wx.showModal({
          title: res.data.title,
          content: res.data.content,
          success: function () {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    }
    qcloud.request(options)
  },
})