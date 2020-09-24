import {
  request
} from '../../api/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false
  },
  GoodsObj: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    let goods_id = currentPage.options.goods_id
    this.getGoodsObj(goods_id)

  },
  async getGoodsObj(goods_id) {
    const res = await request({url: "/goods/detail",data:{goods_id}})
    this.GoodsObj = res.data.message
     // 获取收藏数据
    let collect = wx.getStorageSync("collect") || []
    let isCollect = collect.some(v=>v.goods_id === this.GoodsObj.goods_id)
    this.setData({
      goodsObj: res.data.message,
      isCollect
    })
  },
  // 预览图片
  handlePrevewImage(e) {
    const urls = this.GoodsObj.pics.map(v => v.pics_mid)
    const { current } = e.currentTarget.dataset
    wx.previewImage({
      current,
      urls
    });
  },
  /**
   * 加入购物车
   * 1 先绑定点击事件
   * 2 获取缓存中的购物车数据 数组格式
   * 3 先判断 当前的商品是否已经存在于 购物车
   * 4 已经存在 修改商品数据 执行购物车数量++ 重新把购物车数组 填充回缓存中
   * 5 不存在于购物车的数组中 直接给购物车数组添加一个新元素 新元素 带上 购买数量属性 num 重新把购物车数组 填充回缓存中
   */
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v=> v.goods_id === this.GoodsObj.goods_id)
    if(index === -1) {
      this.GoodsObj.num = 1
      this.GoodsObj.checked = true
      cart.push(this.GoodsObj)
    }else {
      cart[index].num++
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: true,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  // 商品收藏
  handleCollect() {
    let isCollect = false;
    let collect = wx.getStorageSync("collect") || [];
    let index = collect.findIndex(v=> v.goods_id === this.GoodsObj.goods_id)
    if(index > -1) {
      collect.splice(index, 1);
      isCollect = false
      wx.showToast({
        title: '取消收藏',
        icon: 'success'
      });
    }else {
      collect.push(this.GoodsObj)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
      });
    }
    this.setData({
      isCollect
    })
    wx.setStorageSync("collect", collect);
  }
})