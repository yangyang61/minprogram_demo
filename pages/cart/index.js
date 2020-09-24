// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    carts: [],
    allCheckedallChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow: function () {
    const address = wx.getStorageSync("address") || {};
    const carts = wx.getStorageSync("cart") || [];
    this.setData({
      address
    })
    this.setCart(carts)
  },
  /** 获取用户的收货地址
   * 1 绑定点击事件
   * 2 调用小程序内置 api 获取用户的收货地址 wx.chooseAddress
   * 3 获取 用户 对小程序 所授予 获取地址的 权限 状态 scope
   *  1 用户 点击获取收货地址提示框 确定 authSetting scope.address = true
   *  2 用户 重来没有调用过 收货地址的api authSetting scope.address = undefined
   *  3 用户 点击获取收货地址提示框 取消 authSetting scope.address = false
   *     scope 值 false
   *     1 诱导用户 自己 打开 授权设置页码 当用户重新给与 获取地址权限的 时候
   *     2 获取收货地址
   * 4 存本地
   */
  handleChooseAddress() {
    wx.getSetting({
      success: (result)=>{
        // 获取权限状态 
        const scopeAddress = result.authSetting["scope.address"]
        if(scopeAddress || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (result)=>{
              console.log("result",result);
              wx.setStorageSync("address", result);
            }
          });
        }else {
          // 以前拒绝
          wx.openSetting({
            success: (res)=>{
              wx.chooseAddress({
                success: (result)=>{
                  console.log("result",result);
                  wx.setStorageSync("address", result);
                }
              });
            }
          });
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  handleCheck(e) {
    const { id } = e.currentTarget.dataset
    let { carts } = this.data
    carts.map((v,i) => {
      if(v.goods_id === id) {
        v.checked = !v.checked
      }
    })
    this.setCart(carts)
  },
  // 重新计算购物车数据
  setCart(carts) {
    let allChecked = true
    let totalPrice = 0;
    let totalNum = 0;
    carts.forEach(v => {
      if(v.checked) {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
      }else {
        allChecked = false
      }
    })
    allChecked = carts.length != 0 ? allChecked : false
    this.setData({
      carts,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart", carts);
  },
  // 全选
  handleAllCheck() {
    let { carts,allChecked } = this.data
    if(carts.length === 0) {
      this.setData({
        allChecked: false
      })
      return
    }
    allChecked = !allChecked
    carts.forEach(v => v.checked = allChecked)
    this.setCart(carts)
  },
  // 编辑商品数量
  handleItemNumEdit(e) {
    const { operation,id } = e.currentTarget.dataset
    let { carts } = this.data
    const index = carts.findIndex(v => v.goods_id === id)
    if(carts[index].num <= 1 && operation === -1){
      wx.showModal({
        title: '提示',
        content: '您是否要删除？',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if(result.confirm){
            carts.splice(index,1)
            this.setCart(carts)
          }
        },
        fail: ()=>{},
        complete: ()=>{}
      });
      return
    }
    carts[index].num += operation
    this.setCart(carts)
  },
  // 结算
  handlePay() {
    const { address, totalNum } = this.data
    if(!address.userName) {
      wx.showToast({
        title: '您还没有选择收货地址 ',
        icon: 'none',
        mask: false
      });
      return
    }
    if(totalNum === 0) {
      wx.showToast({
        title: '您还没有选购商品',
        icon: 'none',
        mask: false
      });
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }
})