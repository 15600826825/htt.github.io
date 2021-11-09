// pages/driver/devices/devices.js
const App = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		lxingInputname:'',
		lxingInputphone:'',
		lxingInputmoney:'',
		changdiarray: '',
		shechairs: [],
		shenumber:'',
		address_id:'',
    hx_index: 0,
		chairs:[],
		cuid:'',
		hehuorenchairs:[],
		time1: ['5', '8', '10', '15', '20', '25', '30', '35', '40', '45', '50', '60'],
		time2: ['5', '8', '10', '15', '20', '25', '30', '35', '40', '45', '50', '60'],
		time3: ['5', '8', '10', '15', '20', '25', '30', '35', '40', '45', '50', '60'],
		pay1: ['1', '2', '3', '4', '5', '10', '15', '20', '25','30', '40', '50'],
		pay2: ['1', '2', '3', '4', '5', '10', '15', '20', '25', '30', '40', '50'],
		pay3: ['1', '2', '3', '4', '5', '10', '15', '20', '25', '30', '40', '50'],
		showModal: false,
		sheshowModal: false,
		index_t1:0,
		index_t2:0,
		index_t3:0,
		index_p1:0,
		index_p2:0,
		index_p3:0,
		mid:''
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
				index_t1: index
			})
		} else if (id == "t2"){
			that.setData({
				index_t2: index
			})
		} else if (id == "t3") {
			that.setData({
				index_t3: index
			})
		} else if (id == "p1") {
			that.setData({
				index_p1: index
			})
		} else if (id == "p2") {
			that.setData({
				index_p2: index
			})
		} else if (id == "p3") {
			that.setData({
				index_p3: index	
			})
		}
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

	modify:function(e){
		var that=this;
	
		that.setData({
				showModal: true,
				cuid:e.currentTarget.id
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
		wx.navigateTo({
			url: 'thehuoren/thehuoren'
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
		console.log("that.data.cuid,==="+that.data.cuid);
		console.log("changdiarray==="+that.data.changdiarray);
		console.log("lxingInputname==="+that.data.lxingInputname);
		console.log("lxingInputphone==="+that.data.lxingInputphone);
		console.log("lxingInputmoney==="+that.data.lxingInputmoney);
		wx.request({
			url: App.globalData.host + 'Coupon/update_customer_xinxi',
			data: {
				cuid: that.data.cuid,
				changdiarray: that.data.changdiarray,
				lxingInputname: that.data.lxingInputname,
				lxingInputphone: that.data.lxingInputphone,
				lxingInputmoney: that.data.lxingInputmoney,
			},
			success: (res) => {
				console.log(res.data);
				if (res.data == '1') {
					wx.showToast({
						title: '修改成功',
						icon:'success',
						duration:2000
					})
					that.onShow();
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
		wx.request({
			url: App.globalData.host + 'Tenant/xiumid',
			data: {
				mid:that.data.mid,
				time1:that.data.time1[that.data.index_t1],
				time2:that.data.time2[that.data.index_t2],
				time3:that.data.time3[that.data.index_t3],
				price1:that.data.pay1[that.data.index_p1],
				price2:that.data.pay2[that.data.index_p2],
				price3:that.data.pay3[that.data.index_p3],
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
		console.log("openid==="+App.globalData.yonghu.id);
		wx.request({
			url: App.globalData.host + 'Coupon/select_hehuoren',
			data: {
				openid: App.globalData.openid
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