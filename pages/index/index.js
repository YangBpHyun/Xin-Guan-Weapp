//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    active: 1,
  },


  onClick(event) {
    console.log(event)
    wx.showToast({
      title: `点击标签 ${event.detail.name}`,
      // title: `点击标签 ${event.detail.title}`, 显示标签名
      icon: 'none',
    });
  },
});