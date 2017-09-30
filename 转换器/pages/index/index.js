//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    img_url: "https://xcx.thinkmoon.cn/image/113.105.128.251t1506693437.png",
    data_ch: "",
    tip:"转换成功"
  },
  translate: function () {
    var that = this;
    var str = this.data.data_ch;
    var flag = true;
    for (var i = 0; i < str.length; i++) 　　　　
    {
      if (str.charCodeAt(i) < 255) //如果是汉字，则字符串长度加2
        　flag=false;
    }
    if(flag){
      wx.request({
        url: "https://xcx.thinkmoon.cn/translate.php",
        method: "POST",
        data: {
          textch: this.data.data_ch,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log("succssed");
          console.log(res.data)
          that.setData({
            img_url: res.data
          })
        }
      })
    }else{
      that.setData({
        img_url: "https://xcx.thinkmoon.cn/image/113.105.128.251t1506694094.png",
        tip:"啊哦！亲，别输入不合法的字符哦！"
      })
    }
    
  },
  inputch: function (e) {
    this.setData({
      data_ch: e.detail.value
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '篆书转换器',
      path: '/pages/index/index',
      imageUrl:'/asset/backgroud.jpg',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})
