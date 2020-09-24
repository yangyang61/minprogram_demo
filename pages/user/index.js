// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collectNums: 0
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo = wx.getStorageSync("userinfo") || {};
    const collect = wx.getStorageSync("collect") || [];
    let collectNums = collect.length
    this.setData({userInfo,collectNums});
  }
})