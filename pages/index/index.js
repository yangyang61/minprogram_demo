import {
    request
} from '../../api/index.js';
// 使用es7语法
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({
    data: {
        swiperList: [],
        catesList: [],
        floorList: []
    },
    onLoad: function (options) {
        this.getSwiperList()
        this.getCatelist()
        this.getFloorList()
    },
    // 获取轮播图数据
    async getSwiperList() {
        // wx.request({
        //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //     success: (result)=>{
        //         this.setData({
        //             swiperList: result.data.message
        //         })
        //     }
        // });
        // 第一次优化后
        // request({
        //     url: '/home/swiperdata'
        // }).then(res => {
        //     this.setData({
        //         swiperList: res.data.message
        //     })
        // })
        // 第二次有优化，引入runtime
        const res = await request({url: '/home/swiperdata'})
        this.setData({
            swiperList: res.data.message
        })
    },
    // 获取分类导航数据
    async getCatelist() {
        const res = await request({url: "/home/catitems"})
        this.setData({
            catesList: res.data.message
        })
    },
    // 获取分类导航数据
    async getFloorList() {
        const res = await request({url: "/home/floordata"})
        this.setData({
            floorList: res.data.message
        })
    }
})