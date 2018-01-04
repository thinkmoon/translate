var config = require("../../config.js");
const app = getApp()

Page({
  show_list:function(){
    var that = this;
    wx.request({
      url: config.service.baseUrl + "stamp/idea_list",
      complete: function (res) {
        console.log(res.data);
        that.setData({ arr: res.data })
      }
    })
  },
  onShow:function(){
    this.show_list();
  },
  up:function(e){
    app.doRequest(config.service.baseUrl + "/stamp/up", {'idea_id' : e.currentTarget.dataset.idea_id});
  },
  down: function (e) {
    app.doRequest(config.service.baseUrl + "/stamp/down", { 'idea_id': e.currentTarget.dataset.idea_id });
  }
});