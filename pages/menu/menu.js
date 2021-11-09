// pages/menu/menu.js
const App = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		zhifu:0,
		shouxianhbao:false,
		youhongbao:0,
		user_coupon_id:'',
		coupon_moneyReduction:0,
		youhuiquan:[],
		nohongbao:false,
		hongbaostatus:0,
		oldtitle:'',
		oldprice:0,
		oldtime:0,
		active:0,
		paydata:'',
		moveData1:'',
		moveData2:'',
		moveData3:'',
		moveData4:'',
		moveData5:'',
		loading:false,
		showmoney:false,
		sendhexflag:false,
		chair:{},
		chaaddress:'',
		shebeinumber:'',
		usetime:'',
		showModal: false,
		platform: null,
		status: false,
		connectedDeviceId: "",
		iosconnectedname: "",
		writeServicweId: "0000FF00-0000-1000-8000-00805F9B34FB",
		writeCharacteristicsId: "0000FF02-0000-1000-8000-00805F9B34FB",
		iffound: false,
		closeflag: false,
		//轮播图配置
    autoplay: true,
    interval: 3000,
		duration: 1200,
		ymianhongbao:[],
    ishongbao: false,
		topImages: 'http://m.qpic.cn/psc?/V14ZaBeY40XWC8/zkoezU7GGNbZGOF.DPhgQVgKh0Fw63ZhFQsd0hetQ8T6CBTPzbnz3dz1WfeDXiG6wY3NwfQcy1Y7Ry49HK1QdM9SKG1QzVXMBdXM0bH80fc!/b&bo=nQLyAJ0C8gADCSw!&rf=viewer_4',
		couponLeftImages: 'http://m.qpic.cn/psc?/V14ZaBeY40XWC8/zkoezU7GGNbZGOF.DPhgQXDCLspq1L1upRR.ZiRnZuFvq1XezxpUwmIc4ky9cr0DEpxn.YXOFA15Y03Wwkk2zJSBTVERFZsf3KTl5vSZorE!/b&bo=lgCWAJYAlgADCSw!&rf=viewer_4',
		closeBtnImages: 'http://m.qpic.cn/psc?/V14ZaBeY40XWC8/zkoezU7GGNbZGOF.DPhgQZjV2a5npNMM5D47K1jMLBHO3ccXXkEwsTHa*69Gi8pCGkdmz4imEISAR0fRbZj7*malDMMANN7ZzH8oI6XDWDk!/b&bo=QABAAEAAQAADCSw!&rf=viewer_4',
		// 是否显示优惠劵弹窗
		isShowCouponPopUp: false,
		
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
			var that = this; 
			var data = {
				"datas": [
					{
						"id": 1,
						"imgurl": "../../img/a.jpg"
					},
					{
						"id": 2,
						"imgurl": "../../img/b.jpg"
					},
					{
						"id": 3,
						"imgurl": "../../img/c.jpg"
					},
					{
						"id": 4,
						"imgurl": "../../img/d.jpg"
					}
				]
			}; 
			that.setData({
				lunboData: data.datas
			})
		
		console.log("menu-onload");	
	
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					platform: res.platform,
					closeflag: false
				})
			}
		})
		that.setData({
			shebeinumber: options.localName
		})
		wx.showLoading({
			title: '',
		})
	
		console.log("888888=="+options.localName);	
		wx.request({
			url: App.globalData.host + 'Yonghu/shebei2',	
			data: {
				shebeinumber: options.localName
			},
			success: (res) => {
				console.log("99999=="+options.localName);	
				console.log("222222====:",res.data);
				if (res.data != 'error'){
					that.setData({
						chair:res.data,
						connectedDeviceId: res.data.macaddress.toUpperCase(),
						iosconnectedname: res.data.localname
					})
				}
			},complete:(res)=>{
				console.log("66666=="+options.localName);	
				wx.hideLoading();
			}
		})
		console.log("33333=="+options.localName);	
		wx.request({
			url: App.globalData.host + 'Yonghu/chaaddress',	
			data: {
				shebeinumber: options.localName
			},
			success: (res) => {
				console.log("4444=="+res.data.address_name);	
				if (res.data != 'error'){
					that.setData({
						chaaddress: res.data.address_name
					})
				}
			},complete:(res)=>{
				// wx.hideLoading();
			}
		})
		wx.request({
			url: App.globalData.host + 'Coupon/select_ymianhongbao',	
			data: {
				shebeinumber: options.localName
			},
			success: (res) => {
				console.log("select_ymianhongbao=="+options.localName);	
				console.log(res.data);
				if (res.data != '-1'){
					console.log("98898989898=="+res.data.coupon_id);	
					that.setData({
						ymianhongbao:res.data
					})
					console.log("App.globalData.openid==="+App.globalData.openid);
					console.log("res.data.coupon_id==="+res.data.coupon_id);
					wx.request({
						url: App.globalData.host + 'Coupon/select_coupon_num',	
						data: {
							openid: App.globalData.openid,
							coupon_id: res.data.coupon_id,
						},
						success: (res) => {
							console.log("select_coupon_num==="+res.data);
							if (res.data <= '2'){
								console.log("ishongbao==="+"true");
								that.setData({	
									ishongbao: true,
								})
							}else{

								that.setData({	
									youhongbao:1
								})
							}
						}
					})
				}else{
					this.setData({	
						ishongbao: false,
					})
				}
			},complete:(res)=>{
				console.log("66666=="+options.localName);	
				// wx.hideLoading();
			}
		})
	},
	chooseItem: function (e) {
		if (this.data.loading) return;
		this.setData({
			active: e.currentTarget.dataset.idx
		})
	},
	//阻止弹出层滑动事件，空函数，不做任何处理
  onPreventTouchMove: function () {
    return false;
  },
  //打开优惠劵弹窗
  openTheCouponPopUp: function () {
    var that = this;
    setTimeout(() => {
      // 先开启优惠劵弹窗
      that.setData({
        isShowCouponPopUp: true
      })
      // 设置优惠劵弹窗打开动画
      var animation = wx.createAnimation({
        duration: 600,
        timingFunction: 'ease',
      })
      that.animation = animation;
      animation.scale(1).step();
      that.setData({
        animationData: animation.export()
      })
    }, 1000)
  },
  //关闭优惠劵弹窗
  closeTheCouponPopUp: function () {
    // 设置优惠劵弹窗关闭动画
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.animation = animation;
    animation.scale(0).step();
    this.setData({
      animationData: animation.export(),
    })
    //执行完动画后再关闭
    setTimeout(() => {
      this.setData({
        isShowCouponPopUp: false
      })
    }, 200)
  },
  //领取单个优惠劵
  getCoupons: function (e) {
		 console.log(e.currentTarget.id)
		 wx.request({
			url: App.globalData.host + 'Coupon/user_coupon_create',	
			data: {
				openid: App.globalData.openid,
				coupon_id: e.currentTarget.id
			},
			success: (res) => {	
				wx.showToast({
					title: '已领取，可在卡包查看',
					icon: 'none'
				})
				this.closeTheCouponPopUp();
			},complete:(res)=>{
				this.closeTheCouponPopUp();
			}
		})
  },
  //已领取优惠劵
  alreadyReceived: function () {
    wx.showToast({
      title: '已领取，可在卡包查看',
      icon: 'none'
    })
  },

	showDialogBtn: function () {
		wx.request({
			url: App.globalData.host + 'Coupon/select_openid',	
			data: {
				openid: App.globalData.openid
			},
			success: (res) => {	
				if (res.data == '1'){
					wx.navigateTo({
						url: '../driver/driver',
					})					
				}else{
					this.setData({
						showModal: true
					})
				}
			},complete:(res)=>{
				// wx.hideLoading();
			}
		})
		
	},
	hideModal: function () {
		this.setData({
			showModal: false,
			showmoney: false
		});
		console.log("yincang");
	},
	onCancel: function () {
		this.hideModal();
		console.log("quxiao");
	},
	onConfirm: function (e) {
		this.hideModal();
		console.log(App.globalData.openid);
		console.log(e.detail.encryptedData);
		console.log(e.detail.iv);
		console.log(App.globalData.session_key);
		if (e.detail && e.detail.iv) {
			wx.request({
				url: App.globalData.host + 'Tenant/phone',
				method: 'POST',
				data: {
					openid: App.globalData.openid,
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv,
					session_key: App.globalData.session_key
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				success: (res) => {
					console.log("2222:",res.data);
					console.log("App.globalData.userinfo888888==="+res.data[0]);
					App.globalData.userinfo = res.data[0];
					wx.navigateTo({
						url: '../driver/driver',
					})
				}
			})
		}

	},
	checkuser:function(){
		wx.redirectTo({
			url: '../fact/fact',
		})
	},
	backto: function () {
		wx.navigateBack({
			delta: 1
		})
	},
	goservers: function () {
		wx.navigateTo({
			url: 'service/service'
		})
	},
	payment: function () {
		var that=this;
		wx.clearStorage();
		console.log("1111111111==="+App.globalData.openid);
		console.log("2222222222==="+that.data.shebeinumber);
		wx.request({
			url: App.globalData.host + 'Coupon/select_coupon_show',	
			data: {
				openid: App.globalData.openid,
				number: that.data.shebeinumber,
			},
			success: (res) => {
				if(res.data){//有红包
					console.log("user_coupon_id==:",res);
			  	console.log("888iiiii==:",res.data.user_coupon_id);
			   	console.log("res.data.coupon_moneyReduction==="+res.data.coupon_moneyReduction);
					this.setData({	
						youhuiquan: res.data,
						coupon_moneyReduction:res.data.coupon_moneyReduction,
						user_coupon_id: res.data.user_coupon_id,
						shouxianhbao: true,
					})
					that.paymentss();
				}else{//没红包
					that.setData({
						nohongbao:true
					});
					that.paymentll();
				}
			}
		})
	},
	/**有红包支付**/
	paymentss: function () {
		var that=this;
		wx.clearStorage();
		that.setData({
			showmoney:true,
			zhifu:1
		});
		let tosuccess = false;
		let price=0;
		let time=0;
		let oldtitle='';
		if(that.data.active==0){
			oldtitle='身心愉快';
			price = that.data.chair.price1;
			time = that.data.chair.time1;
		} else if (that.data.active == 1){
			oldtitle='轻松推拿';
			price = that.data.chair.price2;
			time = that.data.chair.time2;
		} else if (that.data.active == 2) {
			oldtitle='背部按摩';
			price = that.data.chair.price3;
			time = that.data.chair.time3;
		}
		
		console.log("price==="+price);
		console.log("that.data.coupon_moneyReduction==="+that.data.coupon_moneyReduction);
		console.log("that.data.user_coupon_id==="+that.data.user_coupon_id);
		console.log("yingmoney==="+yingmoney);
		let yingmoney= price-(that.data.coupon_moneyReduction);
		that.setData({
			usetime: time,
			oldprice:price,
			oldtime:time,
			oldtitle:oldtitle,
			yingmoney: yingmoney
		})
	},
  /**没红包支付**/
	paymentll: function () {
		var that=this;
		wx.clearStorage();
		that.setData({
			showmoney:true
		});
	  let tosuccess = false;
		let price=0;
		let time=0;
		let oldtitle='';
		if(that.data.active==0){
			oldtitle='身心愉快';
			price = that.data.chair.price1;
			time = that.data.chair.time1;
		} else if (that.data.active == 1){
			oldtitle='轻松推拿';
			price = that.data.chair.price2;
			time = that.data.chair.time2;
		} else if (that.data.active == 2) {
			oldtitle='背部按摩';
			price = that.data.chair.price3;
			time = that.data.chair.time3;
		}
		
		that.setData({
			usetime: time,
			oldprice:price,
			oldtime:time,
			oldtitle:oldtitle
		})
	},
	//统一下单后调起支付
	payment2: function () {
		var that=this;
		wx.clearStorage();
		that.setData({
			loading: true
		});

		if(that.data.zhifu==1){
			var tosuccess = false;
			var jianmoney =that.data.coupon_moneyReduction;
			var oldprice=that.data.oldprice;
			var price=Math.abs(oldprice-jianmoney);
			var time=that.data.oldtime;
			console.log("price666666666==="+price);
			console.log("update_usercoupon_status==="+that.data.user_coupon_id);
			if(that.data.hongbaostatus==1){
				wx.request({
					url: App.globalData.host + 'Coupon/update_usercoupon_status',	
					data: {
						user_coupon_id: that.data.user_coupon_id,
					},
					success: (res) => {
						console.log("res=====",res)
					}
				})
			}
		}else{
			var tosuccess = false;
			var oldprice=that.data.oldprice;
			var price=that.data.oldprice;
			var time=that.data.oldtime;
	
		}
		
		wx.request({
			url: App.globalData.host + 'Weixpay/pay',
			data: {
				price:price,
				time:time,
				shebeibianhao: that.data.chair.number,
				openid: App.globalData.openid
			},
			success: (res) => {
				console.log(res.data);
				if (res.data != 'error') {
					that.data.paydata = res.data;
					requestPayment();
				} else {	
					that.setData({
						loading: false
					})
					wx.showToast({
						title: '网络好像出了点小差，再扫码会更快哦!',
						icon: 'none',
						duration: 3000
					})
				}
			},
			fail: function (res) {
				console.log("统一下单失败:" + res);
				this.setData({	
					loading: false
				})
				wx.showToast({
					title: '服务器繁忙，请稍后再试!',
					icon: 'none',
					duration: 3000
				})
			}
		})
		//调起支付
		function requestPayment() {
			let _pd = that.data.paydata;
			wx.requestPayment({
				'timeStamp': _pd.timeStamp.toString(),
				'nonceStr': _pd.nonceStr,
				'package': _pd.package,
				'signType': _pd.signType,
				'paySign': _pd.paySign,
				'success': function (res) {
					//支付成功，生成缓存，跳转到我的套餐页面
					if (!tosuccess) {
						tosuccess = true;
						wx.openBluetoothAdapter({
							success: function (res) {
								that.step1();
								that.countbacktime();
							},
							fail: function () {
								that.fuckoff(time);
							}
						})
						wx.showLoading({
							title: '正在开机',
						})
					}
				},
				'fail': function (res) {
					that.setData({
						loading: false
					});
				},
				complete: function (res) {
					clearInterval(checkPayInterval);
				}
			})
			//启动一个定时器检测支付是否成功
			var checkPayInterval = setInterval(() => {
				console.log("向服务器查询是否支付");
				wx.request({
					url: App.globalData.host + 'Weixpay/paid',
					data: {
						payid: _pd.payid
					},
					success: function (res) {
						if (res.data == 1 && !tosuccess) {
							tosuccess = true;
							clearInterval(checkPayInterval);
							wx.openBluetoothAdapter({
								success: function(res) {
									that.step1();
									that.countbacktime();
								},
								fail:function(){
									that.fuckoff(time);
								}
							})
							wx.showLoading({
								title: '正在开机',
							})
						}
					}
				})
			}, 2000);
		}
	},
	fuckisok:function(){
		var that=this;
		wx.hideLoading();
		// let usetime = parseInt(that.data.usetime);
		// usetime=usetime>30?usetime+10:usetime+5;
		let startChair = {
			'usetime': that.data.usetime,
			'startTime': Date.parse(new Date()) / 1000,
			iosconnectedname: that.data.iosconnectedname,
			shebeihao: that.data.shebeinumber
		}
		if(that.data.isboom){
			App.globalData.isboom = true;
			startChair['connectedDeviceId'] = that.data.connectedDeviceId
		}
		console.log(startChair);
		wx.setStorageSync('startChair', startChair);
		that.setData({
			closeflag:true
    })
		wx.redirectTo({
			url: '../fact/fact',
		})
	},
	fuckoff:function(time){
		var that =this;
		console.log("on:" + that.data.shebeinumber);
		var count=0;
		// var fucktime = parseInt(time);
		// fucktime = fucktime > 30 ? fucktime + 10 : fucktime + 5;
		console.log("2gtime:" + time);
		var ok=false;
		fuckto();
		function fuckto(){
			count++;
			console.log("count:" + count);
			wx.request({
				url: "https://erg.diandigx.com/",
				method: 'POST',
				data: {
					duankou: "1001",
					shebeihao: that.data.shebeinumber,
					zhuangtai: "1",
					time: time
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				success: function (res) {
					console.log("开机返回:"+res.data);
					if(res.data=="1"){
						ok=true;
						setTimeout(function(){
							wx.request({
								url: "https://erg.diandigx.com/",
								method: 'POST',
								data: {
									duankou: "1003",
									shebeihao: that.data.shebeinumber
								},
								header: {
									"Content-Type": "application/x-www-form-urlencoded"
								},
								success: function (res) {
									console.log("查询返回m:" + res.data);
								}
							})
						},6000)
						App.globalData.isboom = false;
						that.fuckisok();
					}else{
						if (count<5){
							fuckto();
						}else{
							that.reback();
						}
					}
				}
			})
		}

	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		
	},
	reback:function(){
		var that=this;
		App.globalData.isboom = true;
		if (that.data.sendhexflag) return;
		wx.showToast({
			title: '网络繁忙，请打开蓝牙后再使用',
			icon: 'none',
			duration: 3000
		})
		console.log("payid" + that.data.paydata.payid);
		wx.request({
			url: App.globalData.host + 'Weixpay/refund',
			data: {
				id: that.data.paydata.payid
			},
			success: function (res) {
				console.log("退款返回:" + res.data);
				wx.showToast({
					title: '退款成功',
					icon: 'success',
					duration: 3000
				})
				that.setData({
					closeflag: true
				})
				setTimeout(function () {
					that.backto();
				}, 3000)

			}
		})
	},
	countbacktime:function(){
		var that=this;
		setTimeout(function(){
			console.log("sendhexflag:" + that.data.sendhexflag);
			if (!that.data.sendhexflag){
				that.reback();
			}
		},15000)
	},
	//蓝牙连接
	step1: function () {
		var that = this;
		console.log("step1:" + that.data.closeflag);
		wx.closeBluetoothAdapter();
		if (that.data.closeflag) return;
		wx.openBluetoothAdapter({
			success: function (res) {
				that.step3();
			},
			fail: function (err) {
				setTimeout(function () {
					that.step1();
					wx.showToast({
						title: '若未设备未启动请打开蓝牙',
						icon:'none',
						duration:3000
					})
				}, 3000)
			}
		})

	},
	step3: function () {
		var that = this;
		console.log("step3");
		if (that.data.closeflag) return;
		wx.startBluetoothDevicesDiscovery({
			success: function (res) {
				setTimeout(function () {
					that.step4();
				}, 2000)
			},
			fail: function () {
				that.step1();
			}
		})
	},
	step4: function () {
		var that = this;
		console.log("step4");
		if (that.data.closeflag) return;
		wx.getBluetoothDevices({
			success: function (res) {
				console.log(res.devices);
					for (var i = 0; i < res.devices.length; i++) {
						if (res.devices[i].localName != null) {
							if (res.devices[i].localName.indexOf(that.data.iosconnectedname) != -1) {
								that.setData({
									connectedDeviceId: res.devices[i].deviceId,
									iffound: true
								})
								// setTimeout(function () {
								that.connectTO();
								// }, 1000)
								return;
							}
						}
					}
					if (!that.data.iffound) {
						setTimeout(function () {
							that.step3();
						}, 1000)
					}	
			}
		})
	},
	connectTO: function (e) {
		var that = this;
		console.log("connectTO");
		wx.stopBluetoothDevicesDiscovery();
		console.log(that.data.connectedDeviceId);
		if (that.data.closeflag) return;
		wx.createBLEConnection({
			deviceId: that.data.connectedDeviceId,
			success: function (res) {
				that.step6();
				that.setData({
					status: true
				})
			},
			fail: function (res) {
				console.log(res);
				if (that.data.connectedDeviceId == null) {
					that.setData({
						status: false
					})
					return;
				}
				setTimeout(function () {
					that.step1();
				}, 1000)
			}
		})
	},
	step6: function () {
		var that = this;
		console.log("step6");
		wx.getBLEDeviceServices({
			deviceId: that.data.connectedDeviceId,
			success: function (res) {
				that.step7();
			},
			fail: function (res) {
				that.step1();
			}
		})
	},
	step7: function () {
		var that = this;
		console.log("step7");
		wx.getBLEDeviceCharacteristics({
			deviceId: that.data.connectedDeviceId,
			serviceId: that.data.writeServicweId,
			success: function (res) {
			}
		})
		setTimeout(function(){
			that.step8();
		},1000)

	},
	step8: function () {
		var that = this;
		console.log("step8");
		if (that.data.closeflag) return;
		let time = 0;
		if (that.data.active == 0) {
			time = that.data.chair.time1;
		} else if (that.data.active == 1) {
			time = that.data.chair.time2;
		} else if (that.data.active == 2) {
			time = that.data.chair.time3;
		}
		// if (time>30){
		// 	time=parseInt(time)+10
		// }else{
		// 	time = parseInt(time) + 5
		// }
		time = parseInt(time);
		time=time > 16 ? time.toString(16) : '0' + time.toString(16);
		console.log("time:"+time);
		var hex = "AA550101"+time+"000000000009C33C";
		var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
			return parseInt(h, 16)
		}))
		var buf = typedArray.buffer;
		wx.writeBLECharacteristicValue({
			deviceId: that.data.connectedDeviceId,
			serviceId: that.data.writeServicweId,
			characteristicId: that.data.writeCharacteristicsId,
			value: buf,
			success: function (res) {
				console.log("发送:" + hex);
				that.setData({
					sendhexflag:true,
					isboom:true
				})
				App.globalData.isboom = true;
				that.fuckisok();
			},
			fail: function (res) {
				console.log(res);
				that.step1();
			}
		})
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		var that=this;
		
		setTimeout(function () {
			App.jian(that, 'moveData1', 1)
		}, 400)
		setTimeout(function () {
			App.jian(that, 'moveData2', 1)
		}, 600)
		setTimeout(function () {
			App.jian(that, 'moveData3', 1)
		}, 800)
		setTimeout(function () {
			App.jian(that, 'moveData5', 1)
		}, 1000)
		setTimeout(function () {
			App.jian(that, 'moveData4', 1)
		}, 1200)
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		var that=this;
		App.jian(that, 'moveData1', 0);
		App.jian(that, 'moveData2', 0);
		App.jian(that, 'moveData3', 0);
		App.jian(that, 'moveData4', 0);
		App.jian(that, 'moveData5', 0);
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