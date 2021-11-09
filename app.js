//app.js
App({
    onLaunch: function() {
        this.getSessionId();
    },
    getSessionId: function() {
        var that = this;
        wx.login({
            success: function(res) {
                if (res.code) {
					that.globalData.code = res.code;
					// wx,wx.showLoading({
					// 	title: '连接中...'
					// })
                    wx.request({
                        url: that.globalData.host + 'Index/getuserinfo2',
                        data: {
                            code: res.code
                        },
                        success: (res) => {
                            console.log(res.data);
							
                            if (res.data.result == 1) {
                                that.globalData.openid = res.data.openid;
								that.globalData.session_key = res.data.session_key;
                                // wx.request({
                                //     url: that.globalData.host + 'Tenant/openid1',
                                //     data: {
                                //         openid: res.data.openid
                                //     },
                                //     success: (res) => {
                                //         console.log("siji:", res.data);
                                //         that.globalData.userinfo = res.data[0];
                                //     }
                                // })
                                wx.request({
                                    url: that.globalData.host + 'Yonghu/openid2',
                                    data: {
                                        openid: res.data.openid
                                    },
                                    success: (res) => {
                                        console.log("yonghu:", res.data);
                                        that.globalData.yonghu = res.data[0];
                                    }
                                })
                            }
                        },
                        complete: (res) => {
							// wx.hideLoading();
                        }
                    })
                } else {
                    wx.showToast({
                        title: '网络异常',
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail: function(res) {
                wx.showToast({
                    title: '请您先登录微信',
                    icon: 'none',
                    duration: 2000
                })
            }
        });
    },
    globalData: {
        host: "https://api.wuwang.work/Small/",
        userinfo: [],
        yonghu: [],
        code: "",
        isboom: false,
        openid: "",
		session_key:""
    },
    jian: function(that, param, opacity) {
        let animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'linear',
        });
        animation.opacity(opacity).step();
        let json = '{"' + param + '":""}';
        json = JSON.parse(json);
        json[param] = animation.export();
        that.setData(json);
    },
    index: function(that, param, opacity, ypx) {
        let animation = wx.createAnimation({
            duration: 1200,
            timingFunction: 'linear',
        });
        animation.translateY(ypx).opacity(opacity).step();
        let json = '{"' + param + '":""}';
        json = JSON.parse(json);
        json[param] = animation.export();
        that.setData(json);
    },
})