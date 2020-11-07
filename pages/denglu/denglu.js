// pages/denglu/denglu.js
var util = require('../../utils/util.js');
var app=getApp();

Page({
  data:{
    focusLianXiFangShi:false,
    hasLogin:false,
    focusMiMa:false,
    shenfen:"",
    lianxifangshi:"",
    mima:"",
    res:""
  },
  focusLianXiFangShi: function() {
    this.setData({
      focusLianXiFangShi: true
    })
  },
  focusMiMa: function() {
    this.setData({
      focusMiMa: true
    })
  },
  blurLianXiFangShi: function (e) {
    this.setData({
      focusLianXiFangShi: false,
      lianxifangshi: e.detail.value
  })
  util.checkAll("lianxifangshi",e.detail.value)
},
  blurMiMa: function (e) {
  this.setData({
    focusMiMa: false,
    mima:e.detail.value
})
},
radioChange: function(e) {
  console.log(e.detail.value)
  this.setData({
    shenfen:e.detail.value
  })

},

  onLoad: function(options) {
  //   setUserInfo: function(res) {
  //   this.setData({ user: res.userInfo })
  // }
  },
  

  denglu: function(e) {
    wx.showLoading({ title:'登录中...',duration:2000});
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/jianyue/denglu/',
      header:{
        "Content-Type" :"application/x-www-form-urlencoded"
    },
      data: {
        shenfen: e.detail.value.shenfen,
        lianxifangshi: e.detail.value.lianxifangshi,
        mima: e.detail.value.mima
      },
      method: 'GET', 
      success: that.getResult.bind(that)
    })
  },
 
  getResult: function (res) {
    console.log(res)
    wx.setStorageSync('sessionid', res.cookies[0]);
    let status = res.data.status
    let msg = res.data.msg
    var app1= app
    if(status == "2"){
    wx.showToast({
      title: "登录成功",
      duration: 2000
    })
      // 设置在全局变量中
    app.globalData.userInfo.lianxifangshi = this.data.lianxifangshi
    app.globalData.userInfo.touxiang = this.data.touxiang
    app.globalData.userInfo.yonghuming = this.data.yonghuming
    app.globalData.userInfo.shenfen = this.data.shenfen
    app.globalData.hasLogin = true
    console.log(app.globalData.userInfo)
    // 在本地的cookies中赋值
    wx.setStorageSync('lianxifangshi', this.data.lianxifangshi);
    wx.setStorageSync('shenfen', this.data.shenfen);
    wx.setStorageSync('hasLogin', true);
    console.log("缓存成功")
    setTimeout(function () {
      wx.switchTab({
        url: '../../pages/index/index' 
      })
    }, 2000)
  } 
  if(status == "1"){
    wx.showToast({
      title: "账号或密码错误",
      icon: 'none',
      duration: 2000
    })
  }
  if(status == "0"){
    wx.showToast({
      title: "用户不存在",
      icon: 'none',
      duration: 2000
    })
  }
  if(status == "3"){
    wx.showToast({
      title: "身份错误",
      icon: 'none',
      duration: 2000
    })
  }

  },

  goto_zhuce: function(res) {
    wx.navigateTo({
      url: '/pages/zhuce/zhuce',
    })
  },
  goto_wangjimimae: function(res) {
    wx.navigateTo({
      url: '/pages/wangjimima/wangjimima',
  })
},
goto_index: function(res) {
  
},
bindGetUserInfo(e) {


}
})