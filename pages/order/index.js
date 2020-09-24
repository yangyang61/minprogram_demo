import {
  request
} from '../../api/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 2,
        value: "退款/退货",
        isActive: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    const currentPage = getCurrentPages()
    const {type} = currentPage[currentPage.length - 1].options
    this.changeTitleByIndex(type-1)
  },
  handleTabsItemChange(e) {
    const { index } = e.detail
    this.changeTitleByIndex(index)
  },
  // 整不了呀
  async getOrders(type) {
    const res = await request({url: "/my/orders/all",data: {type}})

  },
  changeTitleByIndex(index) {
    let { tabs } = this.data
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false)
    this.setData({ tabs })
  }
})