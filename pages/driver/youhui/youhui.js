// pages/driver/order/order.js
const App = getApp();
Page({
	data: {
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
		hx_index: 0,
		
		isChecked: false,
		shechangdi: false,
		showModal: false,
		currentTab: 0,
		
		array:[
			{name: '1', value: '满减券', checked: 'true'},
			{name: '2', value: '折扣券'},
		 ]
	},
	onLoad: function (options) {
		var that = this;
		// 页面初始化 options为页面跳转所带来的参数
		console.log("customer_id==="+App.globalData.yonghu.id);
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
	 lxingInput: function (e) {
		console.log('lxingInput===', e.detail.value)
    this.setData({
      lxinginputValue: e.detail.value
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
	 bindPickerChange2: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		console.log('选择的地址ID====', this.data.shechairs[e.detail.value].address_id)
    this.setData({
      address_id: this.data.shechairs[e.detail.value].address_id
    })
  },
	 listenerRadioGroup:function(e) {
		console.log("listenerRadioGroup=="+e.detail.value);
		var that = this;
		that.setData({
		  radiotype: e.detail.value
		});
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
	onCancel: function () {
		this.hideModal();
		console.log("no");
	},
	onConfirm: function (e) {
		this.hideModal();
		console.log("yes");
		var that = this;
		console.log("lxinginputValue==="+that.data.lxinginputValue);
		console.log("mchengInputValue==="+that.data.mchengInputValue);
		console.log("zzhangshuInputValue==="+that.data.zzhangshuInputValue);
		console.log("kzhangshuInputValue==="+that.data.kzhangshuInputValue);
		console.log("manInputValue==="+that.data.manInputValue);
		console.log("jianInputValue==="+that.data.jianInputValue);
		console.log("yxiaoInputValue==="+that.data.yxiaoInputValue);
		console.log("bzhuInputValue==="+that.data.bzhuInputValue);
		console.log("address_id==="+that.data.address_id);
		console.log("radiotype==="+that.data.radiotype);
		console.log("date1==="+that.data.date1);
		console.log("date2==="+that.data.date2);
	
		console.log("coupon_fen==="+that.data.coupon_fen);
		wx.request({
			url: App.globalData.host + 'Coupon/add_coupon',
			data: {
				openid: App.globalData.openid,
				coupon_eventtype: that.data.lxinginputValue,
				coupon_eventname: that.data.mchengInputValue,
				coupon_zshuliang: that.data.zzhangshuInputValue,
				coupon_kqshuliang: that.data.kzhangshuInputValue,
				coupon_moneyfull: that.data.manInputValue,
				coupon_moneyReduction: that.data.jianInputValue,
				coupon_effective: that.data.yxiaoInputValue,
				bzhuInput: that.data.bzhuInputValue,
				coupon_type: that.data.radiotype,
				coupon_fen: that.data.coupon_fen,
				address_id: that.data.address_id,
				coupon_eventstarttime: that.data.date1,
				coupon_eventstoptime: that.data.date2,
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
				} else {
					wx.showToast({
						title: '网络好像出了点小差',
						icon: 'none',
						duration: 3000
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