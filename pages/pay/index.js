/**
 * 1 页面加载的时候
 *  1 从缓存中获取购物车数据渲染到页面中
 *    这些数据 checked = true
 *2 微信支付
    1 哪些 哪些账号 可以实现微信支付
      1 企业账号
      2 企业账号的小程序后台中 必须给开发者 添加到白名单
        1 一个qppid可以同时绑定多个开发者
        2 这些开发者就可以共用这个appid和这个开发权限了
  3 支付按钮
    1 先判断缓存中有没有token
    2 没有 跳转到授权页面 进行获取token
    3 有 token 创建订单
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    carts: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow: function () {
    const address = wx.getStorageSync("address") || {};
    let carts = wx.getStorageSync("cart") || [];
    let totalPrice = 0;
    let totalNum = 0;
    // 过滤后的购物车数组
    carts = carts.filter(v=>v.checked);
    carts.forEach(v => {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
    })
    this.setData({
      carts,
      totalPrice,
      totalNum,
      address
    })
  },
  // 点击支付
  handleOrderPay() {
    const token = wx.getStorageSync("token");
    if(!token){
      // 个人开发者不能用呀
      // wx.navigateTo({
      //   url: '/pages/order/index'
      // });
      return
    }
  }
})