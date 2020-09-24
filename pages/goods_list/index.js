import {
  request
} from '../../api/index.js';
// 使用es7语法
// import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "综价格合",
        isActive: false
      }
    ],
    goodsList: []
  },
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 20
  },
  totalPage: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid || ""
    this.getGoosList()
  },
  handleTabsItemChange(e) {
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false)
    this.setData({ tabs })
  },
  async getGoosList() {
    const res = await request({
      url: "/goods/search",
      data: this.QueryParams
    })
    // 获取总条数
    const total = res.data.message.total
    this.totalPage = Math.ceil(total / this.QueryParams.pagesize)
    // this.QueryParams.pagenum = res.data.message.pagenum
    this.setData({
      goodsList: [...this.data.goodsList,...res.data.message.goods],
    })
    wx.stopPullDownRefresh()
  },
  // 上拉加载
  onReachBottom: function() {
    if(this.QueryParams.pagenum >= this.totalPage) {
      wx.showToast({title: '没有下一页数据了',icon:'none'});
    }else {
      this.QueryParams.pagenum++
      this.getGoosList()
    }
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    this.setData({ goodsList: []})
    this.QueryParams.pagenum = 1
    this.getGoosList()
  }
})