//index.js
//获取应用实例
const App = getApp();
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
	  shenid:0,
	  localName:"",
	  moveData:"",
	  moveData2:"",
	  moveData3:"",
	  moveData4:"",
	  showModal: false,
	  isboom: false,
	  openblueflag: false,
	  widthScreen:""
  },
	playTxt: function (txt) {
		let innerAudioContext = wx.createInnerAudioContext();
		innerAudioContext.onError((rest) => {
			console.log(rest);
		})
		plugin.textToSpeech({
			lang:"zh_CN",
			tts: true,
			content: txt,
			success: function (res) {
				innerAudioContext.src = res.filename;
				innerAudioContext.play();
			},
			fail: function (res) {
				console.log("222",res);
			}
		})
	},
  tomenu:function(){
	  var that=this;
	  if(that.data.isboom){
		  wx.showToast({
			  title: '此设备异常，请使用另一台设备',
			  icon:'none',
			  duration:4000
		  })
		  return;
	  }
	  
	  if(that.data.localName==""){
		  that.openscancode();
	  }else{
		  if (that.data.openblueflag) {
			  wx.openBluetoothAdapter({
				  success: function (res) {
						var that = this;
						wx.showLoading({
							title: '加载中',
						})
						setTimeout(function () {
							wx.navigateTo({
							  url: '../menu/menu?localName=' + that.data.localName,
							})
							wx.hideLoading()
						}, 2000)
					  // wx.navigateTo({
						//   url: '../menu/menu?localName=' + that.data.localName,
					  // })
				  },
				  fail: function (res) {
					  wx.showToast({
						  title: '请打开手机蓝牙后使用',
						  icon: 'none',
						  duration: 3000
					  })
				  }
			  })

		  }else{
				setTimeout(function () {
					wx.navigateTo({
						url: '../menu/menu?localName=' + that.data.localName,
					})
					wx.hideLoading()
				}, 2000)
			  // wx.navigateTo({
				//   url: '../menu/menu?localName=' + that.data.localName,
			  // }) 
		  }	  
	  }
  },
	openscancode: function () {
		wx.scanCode({
			onlyFromCamera: true,
			success: (res) => {
				console.log("res.path:", res.path);
				console.log("res.result:", res.result);
				let url="";
				if (res.path == null){
					url = res.result;
				}else{
					url = res.path;
				}

					function fuck(name) {
						var reg = new RegExp("[^\?&]?" + encodeURI(name) + "=[^&]+");
						var arr = url.match(reg);
						if (arr != null) {
							return decodeURI(arr[0].substring(arr[0].search("=") + 1));
						}
						return "";
					}
					console.log("sygx:" + fuck("sygx"));
					if (fuck("sygx") != null) {
						wx.showToast({
							title: '开始连接...',
							icon: 'success',
							duration: 2000
						})
						this.data.localName = fuck("sygx");
						this.tomenu();
					} else {
						wx.showToast({
							title: '二维码错误!',
							icon: 'none',
							duration: 2000
						})
					}
			}
		});
	},
	onShow: function () {
		var that=this;
		setTimeout(function(){
			App.index(that, 'moveData',1,-210);
			App.jian(that, 'moveData3',1);
		},400)
		setTimeout(function () {
			App.jian(that, 'moveData4', 1);
			App.index(that, 'moveData2', 1,-210);
		}, 600)
		this.tomenu();
	},
	onHide: function () {
		var that=this;
		App.index(that, 'moveData', 0,210);
		App.index(that, 'moveData2', 0,210);
		App.jian(that, 'moveData3', 0);
		App.jian(that, 'moveData4', 0);
	},
  toregist:function(){
	  var that=this;
	  if (App.globalData.userinfo.shenid>2){
		  wx.navigateTo({
			  url: '../driver/driver',
		  })
	  }else{
		  wx.navigateTo({
			  url: '../regist/regist',
		  })
	  }
  },
	showDialogBtn: function () {
		this.setData({
			showModal: true
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
					if(res.data=="1001"){
						console.log("白");
						wx.navigateTo({
							url: '../regist/regist',
						})
					}else{
						if (res.data[0].shenhe=="1"){
							wx.navigateTo({
								url: '../driver/driver',
							})
						} else if (res.data[0].shenhe == "0"){
							wx.showToast({
								title: '您的注册信息在审核中,请等待短信通知',
								icon:'none',
								duration:3000
							})
						} else if (res.data[0].shenhe == "2") {
							wx.showToast({
								title: '审核不通过，请联系客服',
								icon: 'none',
								duration: 3000
							})
						}
						App.globalData.userinfo = res.data[0];
					}
				
				}
			})
		}

	},
  onLoad: function (options) {
	  var that=this;
	  if (App.globalData.userinfo.shenid){
		  that.setData({
			  shenid: App.globalData.userinfo.shenid
		  })
	  }
	  // 获取屏蔽宽
	  wx.getSystemInfo({
		  success: function (res) {
			  that.setData({
				  widthScreen: res.screenWidth
			  })
		  }
	  })
	  if (options.sygx !== undefined) {
		  that.data.localName = options.sygx;
		  console.log("options.sygx:", options.sygx);
		//   that.checkWork()
		//   if (!that.data.twicecome) {
		// 	  that.connectToBlue();
		//   }
	  }
	  that.playTxt("欢迎使用按摩器");
	  if (options.q !== undefined) {
		  var scan_url = decodeURIComponent(options.q);

		  function fuck(name) {
			  var reg = new RegExp("[^\?&]?" + encodeURI(name) + "=[^&]+");
			  var arr = scan_url.match(reg);
			  if (arr != null) {
				  return decodeURI(arr[0].substring(arr[0].search("=") + 1));
			  }
			  return "";
		  }
		  that.data.localName = fuck("sygx");
		  console.log("options.q:", fuck("sygx"));
	  }

	  if (options.q == undefined && options.sygx == undefined) {
		//   
		console.log("无参数，打开扫码");
	  }
	  that.checkWork()

  },
	checkWork: function () {
		var that = this;
		let startChair = wx.getStorageSync('startChair');
		console.log("检查正在按摩获取本地startChair:", startChair);
		if (!startChair || !startChair.usetime) return;
		let stime = startChair.startTime;
		let usetime = startChair.usetime * 60;
		let nowtime = Date.parse(new Date()) / 1000;
		let leftTime = stime + usetime - nowtime;
		console.log(leftTime);
		if (leftTime > 0) {
			console.log("使用中跳转");
			wx.redirectTo({
				url: '../fact/fact'
			})
		}else{
			wx.clearStorage();
		}
	}
})
