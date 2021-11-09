// pages/driver/devices/devices.js
const App = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		shechairs: [],
		shenumber:'',
		address_id:'',
    hx_index: 0,
		chairs:[],
		hehuorenchairs:[],
		cdiInputname:'',
		showModal: false,
		sheshowModal: false,
		mid:''
	},

	modify:function(e){
		var that=this;
		that.setData({
				showModal: true,
				mid:e.currentTarget.id
		})
		console.log("e.currentTarget.id====",e.currentTarget.id);
		wx.request({
			url: App.globalData.host + 'coupon/select_hehuoren_xinxi',
			data: {
				cuid:e.currentTarget.id
			},
			success: (res) => {
				console.log("res.data=====",res.data);
				if (res.data != 'error') {
					that.setData({
						hehuorenchairs:res.data
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


	shemodify:function(e){
		var that=this;
		this.setData({
			showModal: true
		});

	},

	preventTouchMove: function () { },
	hideModal: function () {
		this.setData({
			showModal: false
		});
		console.log("yincang");
	},
	shehideModal: function () {
		this.setData({
			sheshowModal: false
		});
		console.log("yincang");
	},
	onCancel: function () {
		this.hideModal();
		this.shehideModal();
		console.log("quxiao");
	},
	cdiInputname: function (e) {
		console.log('cdiInputname===', e.detail.value)
    this.setData({
      cdiInputname: e.detail.value
    })
	},
	sheonConfirm: function (e) {
		this.hideModal();
		this.shehideModal();
		var that = this;
		console.log("addshe"+e.detail.value);
		console.log("shenumber==="+that.data.shenumber);
		
		wx.request({
			url: App.globalData.host + 'Coupon/address_create',
			data: {
				address_name:that.data.cdiInputname,
				customer_id:App.globalData.yonghu.id,
			},
			success: (res) => {
				console.log(res.data);
				if (res.data == '1') {
					wx.showToast({
						title: '添加成功',
						icon:'success',
						duration:2000
					})
					setTimeout(function(){
						that.backto();
					},2000)
				}else {
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
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that=this;
		console.log("customer_id==="+App.globalData.yonghu.id);
		wx.request({
			url: App.globalData.host + 'Coupon/select_address_xinxi',
			data: {
				customer_id: App.globalData.yonghu.id
			},
			success: (res) => {
				console.log(res.data);
				if (res.data != '-1') {
					that.setData({
						chairs:res.data
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
			url: App.globalData.host + 'Tenant/chasheaddress',
			data: {
				openid: App.globalData.openid
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