// pages/driver/devices/devices.js
const App = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		mcodechairs: [],
		shechairs: [],
		shenumber:'',
		address_id:'',
    hx_index: 0,
		chairs:[],
		time1: '',
		time2: '',
		time3: '',
		price1: '',
		price2: '',
		price3: '',
		showModal: false,
		sheshowModal: false,
		mid:''
	},
	Inputtime1: function (e) {
		console.log('time1===', e.detail.value)
    this.setData({
      time1: e.detail.value
    })
	},
	Inputtime2: function (e) {
		console.log('time2===', e.detail.value)
    this.setData({
      time2: e.detail.value
    })
	},
	Inputtime3: function (e) {
		console.log('time3===', e.detail.value)
    this.setData({
      time3: e.detail.value
    })
	},
	Inputprice1: function (e) {
		console.log('price1===', e.detail.value)
    this.setData({
      price1: e.detail.value
    })
	},
	Inputprice2: function (e) {
		console.log('price2===', e.detail.value)
    this.setData({
      price2: e.detail.value
    })
	},
	Inputprice3: function (e) {
		console.log('price3===', e.detail.value)
    this.setData({
      price3: e.detail.value
    })
	},
	getinput:function(e){
		console.log("填写的设备编号==="+e.detail.value)
		this.setData({
			shenumber:e.detail.value
		 })	 
	},
	bindPickerChange2: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		console.log('选择的地址ID====', this.data.shechairs[e.detail.value].address_id)
    this.setData({
      address_id: this.data.shechairs[e.detail.value].address_id
    })
  },
	bindPickerChange(e) {
		console.log('picker发送选择改变，携带值为', e)
		var that=this;
		let id = e.currentTarget.value;
		let index = e.detail.value;
		if(id=="t1"){
			that.setData({
				time1: index
			})
		} else if (id == "t2"){
			that.setData({
				time2: index
			})
		} else if (id == "t3") {
			that.setData({
				time3: index
			})
		} else if (id == "p1") {
			that.setData({
				pay1: index
			})
		} else if (id == "p2") {
			that.setData({
				pay2: index
			})
		} else if (id == "p3") {
			that.setData({
				pay3: index	
			})
		}

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
	modify:function(e){
		var that=this;
		console.log(e);
		let state = e.currentTarget.dataset.state;
		if(state>0){
			wx.showToast({
				title: '设备使用中无法修改套餐',
				icon:'none',
				duration:3000
			})
			return;
		}
		that.setData({
			showModal: true,
			mid:e.currentTarget.id
		})
		wx.request({
			url: App.globalData.host + 'Coupon/select_mcode_xinxi',
			data: {
				mcode_id:e.currentTarget.id
			},
			success: (res) => {
				console.log(res.data);
				that.setData({
					mcodechairs: res.data
				})
				
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

	shemodify:function(e){
		var that=this;
		console.log(e);
		let state = e.currentTarget.dataset.state;
		if(state>0){
			wx.showToast({
				title: '设备使用中无法修改套餐',
				icon:'none',
				duration:3000
			})
			return;
		}
		that.setData({
			sheshowModal: true,
			mid:e.currentTarget.id
		})

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
	sheonConfirm: function (e) {
		this.hideModal();
		this.shehideModal();
		var that = this;
		console.log("addshe"+e.detail.value);
		console.log("shenumber==="+that.data.shenumber);
		console.log("address_id==="+that.data.address_id);
		console.log("customer_id===",App.globalData.yonghu.id);
		
		wx.request({
			url: App.globalData.host + 'Coupon/addshe',
			data: {
				shenumber:that.data.shenumber,
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
				}else if(res.data == '-2'){
					wx.showToast({
						title: '该设备已经绑定其他商家，请先解绑！',
						icon: 'none',
						duration: 3000
					})

				}else if(res.data == '-3'){
					wx.showToast({
						title: '当前用户不是商家',
						icon: 'none',
						duration: 3000
					})
					
				} else {
					wx.showToast({
						title: '网络好像出了点小差33',
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
	onConfirm: function (e) {
		this.hideModal();
		this.shehideModal();
		console.log("queding");
		var that = this;
		console.log("mid==",that.data.mid);
		console.log("time1==",that.data.mcodechairs.time1);
		console.log("time1==",that.data.time1);
		console.log("time2==",that.data.time2);
		console.log("time3==",that.data.time3);
		console.log("price1==",that.data.price1);
		console.log("price2==",that.data.price2);
		console.log("price3==",that.data.price3);
		if(!that.data.time1){
			that.setData({
				time1:that.data.mcodechairs.time1
			})
		}
		if(!that.data.time2){
			that.setData({
				time2:that.data.mcodechairs.time2
			})
		}
		if(!that.data.time3){
			that.setData({
				time3:that.data.mcodechairs.time3
			})
		}
		if(!that.data.price1){
			that.setData({
				price1:that.data.mcodechairs.price1
			})
		}
		if(!that.data.price2){
			that.setData({
				price2:that.data.mcodechairs.price2
			})
		}
		if(!that.data.price3){
			that.setData({
				price3:that.data.mcodechairs.price3
			})
		}
		wx.request({
			url: App.globalData.host + 'Tenant/xiumid',
			data: {
				mid:that.data.mid,
				time1:that.data.time1,
				time2:that.data.time2,
				time3:that.data.time3,
				price1:that.data.price1,
				price2:that.data.price2,
				price3:that.data.price3,
			},
			success: (res) => {
				console.log(res.data);
				if (res.data == '1') {
					wx.showToast({
						title: '修改成功',
						icon:'success',
						duration:2000
					})
					setTimeout(function(){
						that.backto();
					},2000)
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
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that=this;
		console.log("customer_id==="+App.globalData.yonghu.id);
		wx.request({
			url: App.globalData.host + 'Tenant/chasymid',
			data: {
				customer_id: App.globalData.yonghu.id
			},
			success: (res) => {
				console.log(res.data);
				if (res.data != 'error') {
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
		console.log("customer_id===",App.globalData.yonghu.id);
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