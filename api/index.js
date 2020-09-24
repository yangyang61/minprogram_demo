// 同时发送异步代码的次数
let ajaxTimes = 0
export const request = params => {
    // 显示loading
    ajaxTimes++
    wx.showLoading({title: "加载中"});
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        var reqTask = wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxTimes--
                if(ajaxTimes === 0) {
                    wx.hideLoading();
                }
            }
        });
    })
}