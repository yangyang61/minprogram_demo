import { request } from '../../api/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isFoucs: false,
    inputValue: ""
  },
  TimerId: -1,
  handleInput(e) {
    const { value } = e.detail
    if(!value.trim()) return
    this.setData({ isFoucs: true })
    clearTimeout(this.TimerId)
    setTimeout(() => {
      this.qsearch(value)
    },1000)
  },
  async qsearch(query) {
    const res = await request({url: "/goods/search",data: {query}})
    this.setData({
      goods: res.data.message.goods
    })
  },
  // 点击取消
  handleCanael() {
    this.setData({ 
      inputValue: "",
      goods: [],
      isFoucs: false
    })
  }
})