// pages/fact/fact.js
var t;
var st;
var ct;
const App = getApp();
const backgroundAudioManager = wx.getBackgroundAudioManager();
backgroundAudioManager.title = 'zafkiel'
backgroundAudioManager.epname = 'zafkiel'
backgroundAudioManager.singer = 'sansan'
backgroundAudioManager.onPlay(() => {
	console.log('开始播放')
})

backgroundAudioManager.onError((res) => {
	console.log("播放erro");
	console.log(res.errMsg);
	console.log(res.errCode);
})

var plugin = requirePlugin("WechatSI");
let manager = plugin.getRecordRecognitionManager();
manager.onError = function (res) {
	console.log("语音识别错误:", res);
	wx.showToast({
		title: '网络繁忙,请稍后再试',
		icon: 'none',
		duration: 2000
	})
}
manager.onStart = function (res) {
}
manager.onRecognize = function (res) {
}
Page({
	data: {
		startChair: null,
		time: "",
		bitchtime: "5",
		now: 0,
		fuck: 2,
		murl1: "https://kaodian.diandigx.com/music/hai.mp3",
		murl2: "https://kaodian.diandigx.com/music/sisi.mp3",
		murl3: "https://kaodian.diandigx.com/music/romian.mp3",
		isonload: true,
		fuckboom: false,
		usedok: false,
		btncdflag: false,
		stoptimeover: false,
		stopflag: false,
		stoptime: 0,
		opentime: 1,
		hex: "AA55040101000000000009C33C",
		openhex: "AA55010101000000000009C33C",
		sendopopenflag: false,
		//blue//
		platform: null,
		connectedDeviceId: "",
		iosconnectedname: "",
		servicesId: "0000FF00-0000-1000-8000-00805F9B34FB",
		writeCharacteristicsId: "0000FF02-0000-1000-8000-00805F9B34FB",
		notifyCharacteristicsId: "0000FF03-0000-1000-8000-00805F9B34FB",
		iffound: false,
		closeflag: false
	},
	playTxt: function (txt) {
		let innerAudioContext = wx.createInnerAudioContext();
		innerAudioContext.onError((rest) => {
			console.log(rest);
		})
		plugin.textToSpeech({
			lang: "zh_CN",
			tts: true,
			content: txt,
			success: function (res) {
				innerAudioContext.src = res.filename;
				innerAudioContext.play();
			},
			fail: function (res) {
				console.log("222", res);
			}
		})
	},
	onLoad: function (options) {
		var that = this;
		that.setData({
			startChair: wx.getStorageSync('startChair')
		})
		that.countDown();
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					platform: res.platform
				})
			}
		})
		if (App.globalData.isboom) {
			that.setData({
				fuckboom: true,
				connectedDeviceId: that.data.startChair.connectedDeviceId
			})
		}
	},
	countDown: function () {
		var that = this;
		clearInterval(t);
		let stime = that.data.startChair.startTime;
		let usetime = that.data.startChair.usetime * 60;
		let nowtime = Date.parse(new Date()) / 1000;
		let leftTime= stime + usetime + that.data.stoptime - nowtime;
	
		if (leftTime <= 0) {
			clearInterval(t);
			that.setData({
				time: "感谢使用",
				usedok: true
			})
			if (that.data.fuckboom){
				that.step8();
			}else{
				that.fucktoenduse();
			}
			wx.clearStorage();
			return
		}
		t = setInterval(() => {
			timeLeftFun(leftTime);
			leftTime--;
			if (leftTime <= 0) {
				clearInterval(t);
				that.playTxt("本次按摩结束，感谢您的使用，再次扫码可继续享用按摩");
				that.setData({
					time: "感谢使用",
					usedok: true
				})
				if (that.data.fuckboom) {
					that.step8();
				} else {
					that.fucktoenduse();
				}
				wx.clearStorage();
				return;
			}
		}, 1000);

		function timeLeftFun(leftTime) {
			var hours = parseInt(leftTime / 60 / 60 % 24, 10) > 9 ? parseInt(leftTime / 60 / 60 % 24, 10) : '0' + parseInt(leftTime / 60 / 60 % 24, 10)
			var minutes = parseInt(leftTime / 60 % 60, 10) > 9 ? parseInt(leftTime / 60 % 60, 10) : '0' + parseInt(leftTime / 60 % 60, 10);
			var seconds = parseInt(leftTime % 60, 10) > 9 ? parseInt(leftTime % 60, 10) : '0' + parseInt(leftTime % 60, 10);
			that.setData({
				time: hours + ':' +minutes + ':' + seconds
			})
		}
	},
	fucktoenduse: function () {
		var that = this;
		wx.request({
			url: "https://erg.diandigx.com/",
			method: 'POST',
			data: {
				duankou: "1007",
				shebeihao: that.data.startChair.shebeihao
			},
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success: function (res) {
				console.log("1007:" + res.data);
				setTimeout(function(){
					wx.request({
						url: "https://erg.diandigx.com/",
						method: 'POST',
						data: {
							duankou: "1003",
							shebeihao: that.data.startChair.shebeihao
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: function (res) {
							console.log("1003:" + res.data);
							if(res.data!="3"){
								that.fucktoenduse();
							}
						}
					})
				},5000)
			}
		})
	},
	backto: function () {
		wx.navigateBack({
			delta: 1
		})
	},
	fuckmusic: function (e) {
		var that = this;
		let id = e.currentTarget.id;
		if (that.data.now == id) return;
		backgroundAudioManager.stop();
		if (id == 1) {
			backgroundAudioManager.src = that.data.murl1;
			backgroundAudioManager.play();
		} else if (id == 2) {
			backgroundAudioManager.src = that.data.murl2;
			backgroundAudioManager.play();
		} else if (id == 3) {
			backgroundAudioManager.src = that.data.murl3;
			backgroundAudioManager.play();
		}
		that.setData({
			now: id
		})
	},
	onReady: function () {

	},
	fuckbeaisok: function () {
		wx.hideLoading();
		this.setData({
			btncdflag: false
		})
	},
	shuidianzttips: function (e) {
		var that = this;
		if (!that.data.stoptimeover) {
			if(!that.data.stopflag){
				wx.showModal({
					title: '温馨提示',
					content: '套餐不超过半小时，暂停5分钟内不计时\r\n套餐超过半小时，暂停10分钟内不计时\r\n*暂停期间退出程序将继续计时',
					success: function (res) {
						if (res.confirm) {
							that.fuckblue(e);
						} else {
							return;
						}
					}
				})
			}else{
				that.fuckblue(e);
			}
		}else{
			that.fuckblue(e);
		}
	},
	startfuckstop:function(){
		var that=this;
		console.log("start");
		//暂停,停止计时，开始计算暂停时间
		if (!that.data.stoptimeover) {
			clearInterval(st);
			clearInterval(t);
			st = setInterval(function () {
				var stoptime = that.data.stoptime;
				if (that.data.startChair.usetime < 31) {
					if (stoptime > 300) {
						stoptime = 300;
						that.setData({
							stoptimeover: true
						})
						clearInterval(st);
						that.countDown();
					} else {
						stoptime = stoptime + 1
					}
				} else if (that.data.startChair.usetime > 30 && that.data.startChair.usetime < 61) {
					if (stoptime > 600) {
						stoptime = 600;
						that.setData({
							stoptimeover: true
						})
						clearInterval(st);
						that.countDown();
					} else {
						stoptime = stoptime + 1
					}
				}
				console.log("暂停时间:" + stoptime);
				that.setData({
					stoptime: stoptime
				})
			}, 1000)
		}		
	},
	stopfuckstop:function(){
		var that=this;
		console.log("stop");
		//开机,结束计算暂停时间，开始计时，计算开机时间指令
		clearInterval(st);

		let stime = that.data.startChair.startTime;
		let usetime = that.data.startChair.usetime * 60;
		let nowtime = Date.parse(new Date()) / 1000;
		let leftTime = stime + usetime + that.data.stoptime - nowtime;
		console.log("leftTime:"+leftTime);
		let fucktime = parseInt(leftTime / 60 % 60, 10)+1;
		console.log("fucktime:" + fucktime);
		let hhxx = "";
		if (fucktime > 16) {
			hhxx = fucktime.toString(16);
		} else {
			if (fucktime < 1) {
				hhxx = "01";
			} else {
				hhxx = "0" + fucktime.toString(16);
			}

		}
		console.log("hhxx:" + hhxx);
		that.setData({
			openhex: "AA550101" + hhxx + "000000000009C33C",
			opentime:fucktime,
			sendopopenflag: true
		})
		that.countDown();
	},
	fuckblue: function (e) {
		let id = e.currentTarget.id;
		var that = this;
		// if (id == that.data.fuck&&id!="0") return;
		// console.log("222");
		// if(that.data.stopflag){
		// 	//暂停开启
		// 	if(id!="0"){
		// 		return;
		// 	}
		// }
		//模式为暂停时
		if(that.data.fuck=="0"){
			if(id!="0")return;
		}else{
			if (id == that.data.fuck)return;
		}
		if (that.data.btncdflag) {
			return;
		} else {
			wx.showLoading({
				title: 'loading...',
			})
			that.setData({
				btncdflag: true
			})
		}
		if (that.data.fuckboom || App.globalData.isboom) {
			that.fucktoblue(e);
			return;
		}
		let dk = "1001";
		if (id == "0") {
			if(that.data.stopflag){
				//如果暂停开启,关闭暂停，发送开机指令
				that.stopfuckstop();
				console.log(that.data.opentime);
				open();
				function open(){
					wx.request({
						url: "https://erg.diandigx.com/",
						method: 'POST',
						data: {
							duankou: "1001",
							shebeihao: that.data.startChair.shebeihao,
							zhuangtai: "1",
							time: that.data.opentime
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: function (res) {
							console.log("开机1001:" + res.data);
						}
					})
				}

				setTimeout(function () {
					wx.request({
						url: "https://erg.diandigx.com/",
						method: 'POST',
						data: {
							duankou: "1003",
							shebeihao: that.data.startChair.shebeihao
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: function (res) {
							console.log("开机1003:" + res.data);
							if (res.data!="1"){
								open();
							}	
						},
						complete:function(){
							that.fuckbeaisok();
						}
					})
				}, 3000)
				that.setData({
					fuck: 2,
					stopflag: false
				})
				return;
			}else{
				//如果暂停关闭，打开暂停，开始计暂停时间
				dk = "1002";
				that.startfuckstop();
				that.setData({
					stopflag: true
				})
			}

		} else if (id == "1") {
			dk = "1004";
			// if (that.data.fuck == "0") that.stopfuckstop();
		} else if (id == "2") {
			dk = "1005";
			// if (that.data.fuck == "0") that.stopfuckstop();
		} else if (id == "3") {
			dk = "1006";
			// if (that.data.fuck == "0") that.stopfuckstop();
		}
		that.setData({
			fuck: id
		})
		console.log(dk);
		console.log(that.data.startChair.shebeihao);
		wx.request({
			url: "https://erg.diandigx.com/",
			method: 'POST',
			data: {
				duankou: dk,
				shebeihao: that.data.startChair.shebeihao
			},
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success: function (res) {
				console.log(res.data);
				if (res.data == "1") {
					
				} else {
					// wx.showToast({
					// 	title: '服务器异常',
					// 	icon: 'none',
					// 	duration: 3000
					// })
					// that.setData({
					// 	fuckboom: true
					// })
					// that.step1();
				}
				if(id=="0"){
					setTimeout(function () {
						wx.request({
							url: "https://erg.diandigx.com/",
							method: 'POST',
							data: {
								duankou: "1003",
								shebeihao: that.data.startChair.shebeihao
							},
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							success: function (res) {
								console.log("1003:" + res.data);
								if(res.data=="1"){
									console.log("暂停失败，再次发送");
									wx.request({
										url: "https://erg.diandigx.com/",
										method: 'POST',
										data: {
											duankou: "1002",
											shebeihao: that.data.startChair.shebeihao
										},
										header: {
											"Content-Type": "application/x-www-form-urlencoded"
										},
										success: function (res) {
											console.log("1002:" + res.data);
										}
									})
								}
							}
						})
					}, 3000)
				}
			},
			complete: function () {
				that.fuckbeaisok();
			}
		})
	},
	fucktoblue: function (e) {
		let id = e.currentTarget.id;
		var that = this;
		if (id == "0") {
			if (that.data.stopflag) {
				//如果暂停开启,关闭暂停，发送开机指令
				that.stopfuckstop();
				that.setData({
					hex: that.data.openhex,
					fuck: 2,
					stopflag: false
				})
			} else {
				//如果暂停关闭，打开暂停，开始计暂停时间
				that.startfuckstop();
				that.setData({
					hex: "AA55010000000000000009C33C",
					stopflag: true,
					fuck: 0
				})
			}
		} else if (id == "1") {
			if (that.data.fuck == "0") that.stopfuckstop();
			that.setData({
				hex: "AA55040101000000000009C33C",
				fuck: id
			})
			
		} else if (id == "2") {
			if (that.data.fuck == "0") that.stopfuckstop();
			that.setData({
				hex: "AA55040102000000000009C33C",
				fuck: id
			})
		} else if (id == "3") {
			if (that.data.fuck == "0") that.stopfuckstop();
			that.setData({
				hex: "AA55040103000000000009C33C",
				fuck: id
			})
		}
		that.step8();
	},
	step1: function () {
		var that = this;
		console.log("s1");
		wx.closeBluetoothAdapter({
			success: function (res) {
				console.log(res);
			}
		})
		wx.openBluetoothAdapter({
			success: function (res) {
				that.step3();
			},
			fail: function (err) {
				wx.closeBluetoothAdapter();
				setTimeout(function () {
					that.step1();
				}, 3000)
			}
		})

	},
	step3: function () {
		var that = this;
		console.log("s3");
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
		wx.getBluetoothDevices({
			success: function (res) {
				console.log(res.devices);
				for (var i = 0; i < res.devices.length; i++) {
					if (res.devices[i].localName != null) {
						if (res.devices[i].localName.indexOf(that.data.startChair.iosconnectedname) != -1) {
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
						that.step4();
					}, 1000)
				}
			}
		})
	},
	connectTO: function (e) {
		var that = this;
		wx.stopBluetoothDevicesDiscovery();
		console.log(that.data.connectedDeviceId);
		wx.createBLEConnection({
			deviceId: that.data.connectedDeviceId,
			success: function (res) {
				that.step6()
			},
			fail: function (res) {
				setTimeout(function () {
					that.step1();
				}, 1000)
			}
		})
	},
	step6: function () {
		var that = this;
		console.log("fact_step6");
		wx.getBLEDeviceServices({
			deviceId: that.data.connectedDeviceId,
			success: function (res) {
				console.log(res)
				that.step7();
			},
			fail: function (res) {
				that.step1();
			}
		})
	},
	step7: function () {
		var that = this;
		console.log("fact_step7");
		wx.getBLEDeviceCharacteristics({
			deviceId: that.data.connectedDeviceId,
			serviceId: that.data.servicesId,
			success: function (res) {
				console.log(res)
			}
		})
		setTimeout(function () {
			that.step8();
		}, 500)
	},
	step8: function () {
		var that = this;
		var hex = that.data.hex;
		if(that.data.usedok){
			hex ="AA55010000000000000009C33C";
		}	
		console.log("step8");
		var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
			return parseInt(h, 16)
		}))
		var buf = typedArray.buffer;
		wx.writeBLECharacteristicValue({
			deviceId: that.data.connectedDeviceId,
			serviceId: that.data.servicesId,
			characteristicId: that.data.writeCharacteristicsId,
			value: buf,
			success: function (res) {
				console.log("发送:" + hex);
				that.fuckbeaisok();
				if (that.data.usedok){
					wx.closeBluetoothAdapter({
						success: function(res) {
							console.log(res)
						}
					})
				}
				if (!that.data.readok) {
					that.step9();
				}

			},
			fail: function (res) {
				console.log(res);
				that.step1();
			}
		})
	},
	step9: function () {
		var that = this;
		console.log("step9");
		wx.notifyBLECharacteristicValueChange({
			state: true,
			deviceId: that.data.connectedDeviceId,
			serviceId: that.data.servicesId,
			characteristicId: that.data.notifyCharacteristicsId,
			success: function (res) {
				setTimeout(function () {
					that.step10();
				}, 1000)
			},
			fail: function (res) {
				console.log("no", res);
				that.step1();
			}
		})
	},
	step10: function () {
		var that = this;
		that.setData({
			readok: true
		})
		wx.onBLECharacteristicValueChange(function (characteristic) {
			let hex = Array.prototype.map.call(new Uint8Array(characteristic.value), x => ('00' + x.toString(16)).slice(-2)).join('');
			console.log("接收:" + hex);
			// if (hex.length < 25) {
			// 	return;
			// } else {
			// 	that.setData({
			// 		ifreturn: true
			// 	})
			// }
		})
	},
	onShow: function () {
		console.log(this.data.isonload);
		if (!this.data.isonload) {
			if(this.data.fuck!="0"){
				console.log(this.data.fuck);
				if (!this.data.usedok) {
					console.log(this.data.usedok);
					this.countDown();
				}
			}
		}else{
			this.setData({
				isonload: false
			})
		}
		clearTimeout(ct);  
	},
	onHide: function () {
		clearInterval(t);
		ct=setTimeout(function(){
			wx.closeBluetoothAdapter({
				success: function(res) {
					console.log(res);
				},
			})
		},5000)
	},
	onUnload: function () {
		wx.closeBluetoothAdapter({
			success: function(res) {
				console.log(res);
			}
		})
	},
	onPullDownRefresh: function () {

	},
	onReachBottom: function () {

	},
	onShareAppMessage: function () {

	}
})