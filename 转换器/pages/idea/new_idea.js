// pages/setting/setting.js
var config = require("../../config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  input_display: function (e) {
    this.setData({
      idea: e.detail.value
    })
  },
  send:function(){
    wx.request({
      url: config.service.baseUrl + "index.php?c=stamp&m=new_idea",
      data:{
        idea: this.data.idea,
        user_id: wx.getStorageSync('ID'),
        user_name: wx.getStorageSync('nickName')
      },
      success:function(res){
        wx.showModal({
          title: res.data,
          content: '谢谢你的支持',
          complete:function(){
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  }
})