// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    chooseImages: []
  },
  handleTabsItemChange(e) {
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false)
    this.setData({ tabs })
  },
  // 上传
  handleChooseImg() {
    console.log('eee')
    wx.chooseImage({
      // 同时选择图片的数量
      count: 9,
      // 图片的格式  原图  压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源 相册  照相机
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result)
        this.setData({
          chooseImages: [...this.data.chooseImages, result.tempFilePaths]
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  // 删除图片
  handleChooseImg(e) {
    const { index } = e.currentTarget.dataset
    let { chooseImages } = this.data
    chooseImages.splice(index,1)
    this.setData({ chooseImages})
  }
})