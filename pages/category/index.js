import { request } from '../../api/index.js'
// 使用es7语法
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1 获取本地存储中的数据
    const Cates = wx.getStorageSync('cates') || []
    // console.log(Cates)
    if(Cates) {
      this.getCates()
    }else {
      if(Date.now-Cates.time > 1000*10){
        this.getCates()
      }else {
        this.Cates = Cates
        let leftMenuList = this.Cates.map(v=>v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  // 获取分类数据
  async getCates() {
    const res = await request({url: "/categories"})
    this.Cates = res.data.message
    // 把接口的数据存入到本地存储中
    wx.setStorageSync('cates',{time: Date.now(),data: this.Cates})
    let leftMenuList = this.Cates.map(v=>v.cat_name)
    let rightContent = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
})