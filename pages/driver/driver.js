// pages/driver/driver.js
const App = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		customertype:2,
		ye:'',
		showModal: false,
		enc_bank_no:'',
		enc_true_name:'',
		bank_name:'',
		desc:"提现",
		fuckrmb:1,
		qian4:"",
		hou4:""
	},
	backto: function () {
		wx.navigateBack({
			delta: 1
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that=this;
		setTimeout(function () {
			that.getmoney();
		}, 2000)
		
		console.log("driver======",App.globalData.yonghu);
		that.setData({
			enc_bank_no: App.globalData.yonghu.enc_bank_no,
			enc_true_name: App.globalData.yonghu.enc_true_name,
			bank_name: App.globalData.yonghu.bank_name,
			//qian4: App.globalData.userinfo.enc_bank_no.substring(0,4),
			//hou4: App.globalData.userinfo.enc_bank_no.substring(App.globalData.userinfo.enc_bank_no.length - 4)
		})
		console.log(App.globalData.openid);
		wx.request({
			url: App.globalData.host + 'Coupon/select_customer_type',
			data: {
				openid: App.globalData.openid
			},
			success: (res) => {
				console.log("2228888:"+res.data);
				if (res.data != 'error') {
					that.setData({
						customertype: res.data
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
			},complete:function(){
				wx.hideLoading();
			}
		})
	},
	getmoney:function(){
		var that = this;
		wx.showLoading({
			title: '',
		})
		console.log("App.globalData=====",App.globalData)
		console.log("App.globalData.yonghu=====",App.globalData.yonghu.id)
		wx.request({
			url: App.globalData.host + 'Tenant/chamoney',
			data: {
				customer_id: App.globalData.yonghu.id
			},
			success: (res) => {
				console.log("222:"+res.data);
				if (res.data != 'error') {
					that.setData({
						ye: res.data
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
			},complete:function(){
				wx.hideLoading();
			}
		})
	},
	fuckbeatch:function(){
		var that = this;
		that.setData({
			showModal: true
		})

	},
	getinput:function(e){
		this.setData({
			fuckrmb: e.detail.value
		})
	},
	preventTouchMove: function () { },
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
		if (that.data.fuckrmb > that.data.ye || that.data.fuckrmb<1){
			wx.showToast({
				title: '提现金额范围1到小于您的余额',
				icon:'none',
				duration:3000
			})
			return;
		}
		wx.showLoading({
			title: '',
		})
		console.log("App.globalData.yonghu.id===",App.globalData.yonghu.id);
		console.log("that.data.enc_bank_no===",that.data.enc_bank_no);
		console.log("that.data.enc_true_name===",that.data.enc_true_name);
		console.log("that.data.bank_name===",that.data.bank_name);
		console.log("that.data.desc===",that.data.desc);
		console.log("that.data.fuckrmb===",that.data.fuckrmb);
		wx.request({
			url: App.globalData.host + 'Tenant/payBank',
			data: {
				customer_id: App.globalData.yonghu.id,
				enc_bank_no: that.data.enc_bank_no,
				enc_true_name: that.data.enc_true_name,
				bank_name: that.data.bank_name,
				desc: that.data.desc,
				money: that.data.fuckrmb
			},
			success: (res) => {
				wx.hideLoading();
				console.log(res.data);
				if (res.data == '1') {
					wx.showToast({
						title: '提现成功',
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
	goto(e) {
		let id = e.currentTarget.id;
		if (id == "order") {
			wx.navigateTo({
				url: 'order/order'
			})
		} else if (id == "device") {
			wx.navigateTo({
				url: 'devices/devices'
			})
		} else if (id == "tongji") {
			wx.navigateTo({
				url: 'tongji/tongji'
			})
		} else if (id == "youhui") {
			wx.navigateTo({
				url: 'youhui/youhui'
			})
		}else if (id == "hehuoren") {
			wx.navigateTo({
				url: 'hehuoren/hehuoren'
			})
		} else if (id == "changdi") {
			wx.navigateTo({
				url: 'changdi/changdi'
			})
		}e
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