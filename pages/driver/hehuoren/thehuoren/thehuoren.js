// pages/driver/order/order.js
const App = getApp();
Page({
	data: {
		lxingInputname:'',
		lxingInputphone:'',
		lxingInputmoney:'',
		lxinginputValue:'',
		mchengInputValue:'',
		zzhangshuInputValue:'',
		kzhangshuInputValue:'',
		manInputValue:'',
		jianInputValue:'',
		yxiaoInputValue:'',
		bzhuInputValue:'',
		radiotype:1,
		address_id:'',
		date1: '2021-10-01',//默认起始时间  
		date2: '2021-12-01',//默认结束时间
		coupon_fen:0,
		quanresult: [],
		tquanresult: [],
		gquanresult: [],
		shechairs: [],
		changdiarray: '',
		hx_index: 0,		
		isChecked: false,
		shechangdi: false,
		showModal: true,
		currentTab: 0,
		items: [
      {value: 'USA', name: '美国'},
      {value: 'CHN', name: '中国', checked: 'true'},
      {value: 'BRA', name: '巴西'},
      {value: 'JPN', name: '日本'},
      {value: 'ENG', name: '英国'},
      {value: 'FRA', name: '法国'},
    ],
		
		array:[
			{name: '1', value: '满减券', checked: 'true'},
			{name: '2', value: '折扣券'},
		 ]
	},
	onLoad: function (options) {
		var that = this;
		// 页面初始化 options为页面跳转所带来的参数
		wx.request({
			url: App.globalData.host + 'Tenant/chasheaddress',
			data: {
				customer_id: App.globalData.yonghu.id
			},
			success: (res) => {
				console.log(res.data);
				if (res.data != 'error') {
					that.setData({
						shechairs:res.data
					})
				} else {
					wx.showToast({
						title: '网络好像出了点小差',
						icon: 'none',
						duration: 3000
					})
				}
			},
			fail: function (res) {
				wx.showToast({
					title: '网络好像出了点小差',
					icon: 'none',
					duration: 3000
				})
			}
		})
		wx.request({
			url: App.globalData.host + 'Coupon/select_ordelquan',
			data: {
				openid: App.globalData.openid
			},
			success: (res) => {
				console.log("select_ordelquan===="+res.data);
				if (res.data != 'error') {
					that.setData({
						quanresult:res.data
					})
				} else {
					wx.showToast({
						title: '网络好像出了点小差',
						icon: 'none',
						duration: 3000
					})
				}
			},
			fail: function (res) {
				wx.showToast({
					title: '网络好像出了点小差',
					icon: 'none',
					duration: 3000
				})
			}
		})

		wx.request({
			url: App.globalData.host + 'Coupon/select_tfangquan',
			data: {
				openid: App.globalData.openid
			},
			success: (res) => {
				console.log("select_tfangquan===="+res.data);
				if (res.data != 'error') {
					that.setData({
						tquanresult:res.data
					})
				} else {
					wx.showToast({
						title: '网络好像出了点小差',
						icon: 'none',
						duration: 3000
					})
				}
			},
			fail: function (res) {
				wx.showToast({
					title: '网络好像出了点小差',
					icon: 'none',
					duration: 3000
				})
			}
		})

		wx.request({
			url: App.globalData.host + 'Coupon/select_gqiquan',
			data: {
				openid: App.globalData.openid
			},
			success: (res) => {
				console.log("select_gqiquan===="+res.data);
				if (res.data != 'error') {
					that.setData({
						gquanresult:res.data
					})
				} else {
					wx.showToast({
						title: '网络好像出了点小差',
						icon: 'none',
						duration: 3000
					})
				}
			},
			fail: function (res) {
				wx.showToast({
					title: '网络好像出了点小差',
					icon: 'none',
					duration: 3000
				})
			}
		})
	 },
	 lxingInputname: function (e) {
		console.log('lxingInputname===', e.detail.value)
    this.setData({
      lxingInputname: e.detail.value
    })
	},
	lxingInputphone: function (e) {
		console.log('lxingInputphone===', e.detail.value)
    this.setData({
      lxingInputphone: e.detail.value
    })
	},
	lxingInputmoney: function (e) {
		console.log('lxingInputmoney===', e.detail.value)
    this.setData({
      lxingInputmoney: e.detail.value
    })
	},
	mchengInput: function (e) {
		console.log('mchengInput===', e.detail.value)
    this.setData({
      mchengInputValue: e.detail.value
    })
	},
	zzhangshuInput: function (e) {
		console.log('zzhangshuInput===', e.detail.value)
    this.setData({
      zzhangshuInputValue: e.detail.value
    })
	},
	kzhangshuInput: function (e) {
		console.log('kzhangshuInput===', e.detail.value)
    this.setData({
      kzhangshuInputValue: e.detail.value
    })
	},manInputValue:'',
	manInput: function (e) {
		console.log('manInput===', e.detail.value)
    this.setData({
      manInputValue: e.detail.value
    })
	},
	jianInput: function (e) {
		console.log('jianInput===', e.detail.value)
    this.setData({
      jianInputValue: e.detail.value
    })
	},
	yxiaoInput: function (e) {
		console.log('yxiaoInput===', e.detail.value)
    this.setData({
      yxiaoInputValue: e.detail.value
    })
	},
	bzhuInput: function (e) {
		console.log('bzhuInput===', e.detail.value)
    this.setData({
      bzhuInputValue: e.detail.value
    })
	},
	 
	 listenerRadioGroup:function(e) {
		console.log("listenerRadioGroup=="+e.detail.value);
		var that = this;
		that.setData({
		  radiotype: e.detail.value
		});
	 },

	 
	 checkboxChange(e) {
		console.log('checkbox发生change事件，携带value值为：', e.detail.value)
		var datas = e.detail.value;
		var str = "";
     for (var i = 0; i < datas.length; i++) {
          str += datas[i]+ ",";
      }
      //去掉最后一个逗号(如果不需要去掉，就不用写)
     if (str.length > 0) {
         str = str.substr(0, str.length - 1);
     }
     console.log('str======', str)
    this.setData({
      changdiarray: str
    })
	},
	hideModal: function () {
		this.setData({
			showModal: false
		});
		console.log("yincang");
	},
	
	onCancel: function () {
		this.hideModal();
		console.log("quxiao");
		wx.redirectTo({
			url: '../hehuoren'
		})
	},
	 //滑动切换
	 swiperTab: function (e) {
		var that = this;
		that.setData({
		 currentTab: e.detail.current
		});
	 },
	 //点击切换
	 clickTab: function (e) {
		var that = this;
		if (this.data.currentTab === e.target.dataset.current) {
		 return false;
		} else {
		 that.setData({
			currentTab: e.target.dataset.current
		 })
		}
	 },
	 fuckbeatch:function(){
		var that = this;
		that.setData({
			showModal: true
		})

	},
	// 获取滚动条当前位置
	onPageScroll: function (e) {
		if (e.scrollTop > 100) {
			this.setData({
				floorstatus: true
			});
		} else {
			this.setData({
				floorstatus: false
			});
		}
	},
	//回到顶部
	goTop: function (e) {  // 一键回到顶部
		if (wx.pageScrollTo) {
			wx.pageScrollTo({
				scrollTop: 0
			})
		} else {
			wx.showModal({
				title: '提示',
				content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
			})
		}
	},
	backto: function () {
		wx.navigateBack({
			delta: 1
		})
	},
	hideModal: function () {
		this.setData({
			showModal: false
		});
		console.log("yincang");
	},

	sheonConfirm: function (e) {
		this.hideModal();
		console.log("yes");
		var that = this;
		console.log("openid==="+App.globalData.openid);
		console.log("changdiarray==="+that.data.changdiarray);
		console.log("lxingInputname==="+that.data.lxingInputname);
		console.log("lxingInputphone==="+that.data.lxingInputphone);
		console.log("lxingInputmoney==="+that.data.lxingInputmoney);
		wx.request({
			url: App.globalData.host + 'Coupon/add_hehuoren',
			data: {
				openid: App.globalData.openid,
				changdiarray: that.data.changdiarray,
				lxingInputname: that.data.lxingInputname,
				lxingInputphone: that.data.lxingInputphone,
				lxingInputmoney: that.data.lxingInputmoney,
			},
			success: (res) => {
				wx.hideLoading();
				console.log(res.data);
				if (res.data == '1') {
					wx.showToast({
						title: '创建成功！',
						icon:'success',
						duration:3000
					})
					wx.redirectTo({
						url: '../../hehuoren/hehuoren'
					})
				} else {
					wx.showToast({
						title: '网络好像出了点小差',
						icon: 'none',
						duration: 3000
					})
					wx.redirectTo({
						url: '../hehuoren'
					})
				}
			},
			fail: function (res) {
				wx.hideLoading();
				wx.showToast({
					title: '网络好像出了点小差',
					icon: 'none',
					duration: 3000
				})
			}
		})
	},
	listenerSwitch: function(e) {
		console.log('switch类型开关当前状态-----', e.detail.value);
		var that = this;
		console.log('that.data.shechangdi-----', that.data.shechangdi);
		that.setData({
			shechangdi: e.detail.value
		})

		if(that.data.shechangdi='false'){
			this.setData({
				coupon_fen: 1
			});
		}else{
			this.setData({
				coupon_fen: 0
			});
		}
		console.log('that.data.coupon_fen-----', that.data.coupon_fen);

	},
	bindDateChange1: function(e) {
    console.log('Date1发送选择改变，携带值为', e.detail.value)
    this.setData({
      date1: e.detail.value
    })
	},

  bindDateChange2(e) {
		let that = this;
		console.log('Date2发送选择改变，携带值为',e.detail.value)
    that.setData({
      date2: e.detail.value,
    })

  },


	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})