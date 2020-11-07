// pages/me/me.js
var app=getApp();

Page({
  data: {
    hasLogin:false,
    showModal:false,
    touxiang:"",
    yonghuming:"",
    servicelist:[{
      icon:"../../icons/dingdan.png",
      text:"订单",
      url:"../dingdan/dingdan"
    },{
      icon:"../../icons/shoucang.png",
      text:'收藏',
      url:"../shoucang/shoucang"
    },{
      icon:"../../icons/tuikuan.png",
      text:'售后/退款',
      url:"../tuikuan/tuikuan"
    },
    {
      icon:"../../icons/zuji.png",
      text:'足迹',
      url:"../zuji/zuji"

    }
  ]
  },
  headimage:function(){
var _this=this;
wx.chooseImage({
  count: 1,
  sizeType:['original','compressed'],
  sourceType:['album','camera'],
  success:function(res){
    const tempFilePath = res.tempFilePaths[0];
    _this.setData({
      touxiang:tempFilePath
    })
    app.globalData.touxiang=tempFilePath
  }
})
  },
  headimage1:function(){
    wx.showModal({
      title: '提示' ,
      content: '请先登录' ,
      success: function (res) {
       if (res.confirm) {
        wx.navigateTo({
          url: '../dingdan/dingdan',
        })
       }
      }
    })
      },
  onLoad: function (options) {
    if(!app.globalData.hasLogin){
      wx.showToast({
        title:"请先登录",
        icon:"loading",
        duration: 3000,
      })
      wx.redirectTo({
        url: '../../pages/denglu/denglu'
      })
    }

  },

  onShow: function () {
    // 从本地的缓存中获取值
    var yonghuming = wx.getStorageSync('yonghuming')
    var touxiang = wx.getStorageSync('touxiang')
    var lianxifangshi = wx.getStorageSync('lianxifangshi')
    var hasLogin = wx.getStorageSync('hasLogin')
    // 从全局变量中取值
    this.setData({
      yonghuming:yonghuming,
      touxiang:touxiang,
      lianxifangshi:lianxifangshi,
      hasLogin:hasLogin,
    })    
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

  }
})