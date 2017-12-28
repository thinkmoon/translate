var config = require("../../config.js");
var user_ID;
Page({
  onShow: function () {
    var that=this;
    wx.request({
      url: config.service.baseUrl + "index.php?c=stamp&m=idea_list",
      complete: function (res) {
        console.log(res.data);
        that.setData({arr:res.data})
      }
    })
  },
  up:function(e){
    var that = this;
    var idea_id = e.currentTarget.dataset.idea_id;
    wx.getStorage({
      key: 'ID',
      success: function (res) {
        console.log(res.data);
        user_ID = res.data;
        wx.request({
          url: config.service.baseUrl + "index.php?c=stamp&m=up",
          data: {
            idea_id: idea_id,
            user_id: user_ID,
          },
          success: function (res) {
            wx.showModal({
              title: res.data,
              content: '谢谢你的支持',
              success: function () {
                wx.request({
                  url: config.service.baseUrl + "index.php?c=stamp&m=idea_list",
                  complete: function (res) {
                    console.log(res.data);
                    that.setData({ arr: res.data })
                  }
                })
              }
            })
          }
        })
      }
    })

  },
  down: function (e) {
    var that=this;
    var idea_id = e.currentTarget.dataset.idea_id;
    wx.getStorage({
      key: 'ID',
      success: function (res) {
        console.log(res.data);
        user_ID=res.data;
        wx.request({
          url: config.service.baseUrl + "index.php?c=stamp&m=down",
          data: {
            idea_id: idea_id,
            user_id: user_ID,
          },
          success: function (res) {
            wx.showModal({
              title: res.data,
              content: '谢谢你的支持',
              success:function(){
                wx.request({
                  url: config.service.baseUrl + "index.php?c=stamp&m=idea_list",
                  complete: function (res) {
                    console.log(res.data);
                    that.setData({ arr: res.data })
                  }
                })
              }
            })
          }
        })
      }
    })
    
  }
});