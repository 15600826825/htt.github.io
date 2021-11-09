// pages/regist/regist.js
const App = getApp();
var t;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		img1:'',
		img2:'',
		img3:'',
		yzmcd:false,
		loading:false,
		cdtime:60,
		flag: false,
		phone:"",
		form:"",
		zhengmian:"",
		beimian:"",
		shouchi:"",
		index_t1: 0,
		index_t2: 0,
		time1: ['5', '10', '20', '30', '40', '50', '60'],
		time2: ['5', '10', '20', '30', '40', '50', '60'],
		fuck1:"",
		fuck2:""
	},
	bindPickerChange(e) {
		console.log('picker发送选择改变，携带值为', e)
		var that = this;
		let id = e.currentTarget.id;
		let index = e.detail.value;
		if (id == "t1") {
			that.setData({
				index_t1: index
			})
		} else if (id == "t2") {
			that.setData({
				index_t2: index
			})
		}

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that=this;
		wx.request({
			url: App.globalData.host + 'Tenant/chazkehu',
			data: {
			},
			success: (res) => {
				console.log("111:",res.data);
				if (res.data !='error') {
					let arr=[];
					for(var i=0;i<res.data.length;i++){
						arr[i]=res.data[i].cname;
					}
					that.setData({
						time1: arr,
						fuck1:res.data
					})
				} else {
					wx.showToast({
						title: '网络繁忙，请稍后再试',
						icon: 'none',
						duration: 3000
					})
				}
			}
		})
		wx.request({
			url: App.globalData.host + 'Tenant/chadaili',
			data: {
			},
			success: (res) => {
				console.log("222:",res.data);
				if (res.data != 'error') {
					let arr = [];
					for (var i = 0; i < res.data.length; i++) {
						arr[i] = res.data[i].name;
					}
					that.setData({
						time2: arr,
						fuck2:res.data
					})
				} else {
					wx.showToast({
						title: '网络繁忙，请稍后再试',
						icon: 'none',
						duration: 3000
					})
				}
			}
		})
	},
	backto: function () {
		wx.navigateBack({
			delta: 1
		})
	},
	formSubmit(e) {
		var that=this;
		console.log('form发生了submit事件，携带数据为：', e.detail.value)
		let form = e.detail.value;
		if (form.name == "" || form.namenum == "" || form.dizhi == "" || form.phone == "" || form.yzm == "" || form.banktype == "" || form.banknum == ""||that.data.loading){
			wx.showToast({
				title: '注册信息输入不完整',
				icon:'none',
				duration:2000
			})
			return;
		}else{
			console.log("form:",form);
			that.setData({
				form: form,
				loading:true
			})
			wx.showModal({
				title: '温馨提示',
				content: '您是否检查注册信息无误，并且阅读并同意使用条款',
				success: function (res) {
					if (res.confirm) {
						wx.showLoading({
							title: '正在上传相片...',
						})
						that.submitimg();
					}else{
						that.setData({
							loading: false
						})
						return
					}
				}
			})
		
		}
		// this.submit();
	},
	submitall:function(){
		var that=this;
		let form=that.data.form;
		wx.hideLoading();
		wx.showLoading({
			title: '正在上传资料',
		})

		wx.request({
			url: App.globalData.host + 'Tenant/shangchuan',
			data: {
				xingmin: form.name,
				bianhao: form.namenum,
				zhuzhi: form.dizhi,
				shoujihao: form.phone,
				yanma: form.yzm,
				yhxing: form.banktype,
				ykhao: form.banknum,
				zhengmian: that.data.zhengmian,
				beimian: that.data.beimian,
				shouchi: that.data.shouchi,
				openid: App.globalData.openid,
				customer_id: that.data.fuck1[that.data.index_t1].id,
				cid: that.data.fuck2[that.data.index_t2].id
			},
			success: (res) => {
				console.log("sbmitall:",res.data);
				wx.hideLoading();
				if(res.data=="1"){
					wx.showModal({
						title: '资料提交成功',
						content: '审核结果请等待短信通知',
						showCancel:false
					})
				} else if (res.data == "-1001") {
					wx.showToast({
						title: '该身份证号码已经过注册账号，请使用另一个身份证注册',
						icon: 'none',
						duration: 3000
					})
				}  else if (res.data =="-1003"){
					wx.showToast({
						title: '请输入住址',
						icon: 'none',
						duration: 3000
					})
				} else if (res.data == "-1004") {
					wx.showToast({
						title: '请输入正确的手机号',
						icon: 'none',
						duration: 3000
					})
				} else if (res.data == "-1005") {
					wx.showToast({
						title: '请输入手机号',
						icon: 'none',
						duration: 3000
					})
				} else if (res.data == "-1006") {
					wx.showToast({
						title: '请输入正确的身份证编号',
						icon: 'none',
						duration: 3000
					})
				} else if (res.data == "-1007") {
					wx.showToast({
						title: '请输入身份证编号',
						icon: 'none',
						duration: 3000
					})
				} else if (res.data == "-1008") {
					wx.showToast({
						title: '请输入正确的姓名',
						icon: 'none',
						duration: 3000
					})
				} else if (res.data == "-1009") {
					wx.showToast({
						title: '请输入姓名',
						icon: 'none',
						duration: 3000
					})
				} else if (res.data == "-1010") {
					wx.showToast({
						title: '数据提交失败，请重新提交!',
						icon: 'none',
						duration: 3000
					})
				} else if (res.data == "-1012") {
					wx.showToast({
						title: '输入的身份证编号和手持身份证照片的身份证编号不相同',
						icon: 'none',
						duration: 3000
					})
				} else if (res.data == "-1013") {
					wx.showToast({
						title: '输入的姓名和手持身份证照片的姓名不相同',
						icon: 'none',
						duration: 3000
					})
				} else if (res.data == "-1014") {
					wx.showToast({
						title: '手持身份证照片识别失败',
						icon: 'none',
						duration: 3000
					})
				} else if (res.data == "-1015") {
					wx.showToast({
						title: '输入的身份证编号和照片的身份证编号不相同',
						icon: 'none',
						duration: 3000
					})
				} else if (res.data == "-1016") {
					wx.showToast({
						title: '输入的姓名和照片的姓名不相同',
						icon: 'none',
						duration: 3000
					})
				} else if (res.data == "-1017") {
					wx.showToast({
						title: '身份证正面识别失败!',
						icon: 'none',
						duration: 3000
					})
				} else if (res.data == "-1018") {
					wx.showToast({
						title: '请按要求上传照片',
						icon: 'none',
						duration: 3000
					})
				}else{
					wx.showToast({
						title: '系统繁忙，请稍后再试',
						icon: 'none',
						duration: 3000
					})
				}
			
			},
			fail: (res) => {
				console.log(res.data);
				wx.hideLoading();
				wx.showToast({
					title: '网络繁忙，请重试',
					icon:'none',
					duration:2000
				})
			},
			complete: (res) => {
				that.setData({
					loading:false
				})
			}
		})
	},
	//获取手机输入
	getInput: function (e) {
		this.isphone(e.detail.value);
		this.setData({
			phone: e.detail.value
		})
	},
	isphone(str) {
		let myreg = /^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/;
		if (!myreg.test(str)) {
			this.setData({
				flag: false
			})
		} else {
			this.setData({
				flag: true
			})
		}
	},
	getyzm:function(){
		console.log("getyzm");
		var that=this;
		if(!that.data.flag){
			wx.showToast({
				title: '您输入的手机号码格式不正确',
				icon:'none',
				duration:2000
			})
			return;
		}
		if(that.data.yzmcd){
			console.log("yzmcd");
			return;
		}else{
			console.log(that.data.phone);
			console.log(App.globalData.id);
			wx.request({
				url: App.globalData.host + 'Tenant/hyanma',
				data: {
					mobile:that.data.phone
				},
				success: (res) => {
					console.log(res.data);
					if(res.data=="2"){
						wx.showToast({
							title: '此手机已经注册，请使用未注册的手机号',
							icon:'none',
							duration:4000
						})
					}else{
						wx.showToast({
							title: '验证码已发送',
							icon:'success',
							duration:2000
						})
					}
				}
			})
			that.setData({
				cdtime:60,
				yzmcd:true
			})
			daotime(60);
			 function daotime(e){
				 setTimeout(function () {
					 e--;
					 if (e == 0) {
						 that.setData({
							 yzmcd: false
						 })
						 return;
					 }
					 that.setData({
						 cdtime: e
					 })
					 daotime(e);
				 }, 1000) 
			 }
		}
	},
	daotime: function (e) {
		var that = this;
		
		setTimeout(function () {
			if (e == 0) {
				that.setData({
					yzmcd: false
				})
				return;
			}
			that.setData({
				cdtime: e
			})
			that.daotime(e);
		}, 1000)
	},
	formReset() {
		console.log('form发生了reset事件')

	},
	chooseImage(e) {
		var that=this;
		let id = e.currentTarget.id;
		console.log("id:"+id);
		wx.chooseImage({
			count:1,
			sizeType: ['original', 'compressed'], 
			sourceType: ['album', 'camera'], 
			success: res => {
				let tempFilePaths = res.tempFilePaths[0]
				console.log(tempFilePaths);
				if(id==1){
					that.setData({
						img1:tempFilePaths
					})
				}else if(id==2){
					that.setData({
						img2: tempFilePaths
					})
				} else if (id == 3) {
					that.setData({
						img3: tempFilePaths
					})
				}
			}
		})
	},
	submitimg:function(){
		var that=this;
		console.log("111:"+that.data.img1)
		if(that.data.img1==""||that.data.img2==""||that.data.img3==""){
			wx.hideLoading();
			wx.showToast({
				title: '图片未选全',
				icon:'none',
				duration:2000
			})
			return;
		}

		uploadimg(1);

		function uploadimg(qu){
			let imgpath = "";
			if (qu == 1) {
				imgpath = that.data.img1;
			} else if (qu == 2) {
				imgpath = that.data.img2;
			} else if (qu == 3) {
				imgpath = that.data.img3;
			}
			wx.uploadFile({
				url: App.globalData.host + "Tenant/uploadhh",
				filePath: imgpath,
				name: 'file',
				formData: {
					qu: qu,
					openid: App.globalData.userinfo.openid
				},
				success: function (res) {
					console.log("success:",res.data);
					let result = JSON.parse(res.data);
					console.log(result.tu1);
					if (result.result==qu){
						if(qu==1){
							uploadimg(2);
							that.setData({
								zhengmian: result.tu1,
							})
						}else if(qu==2){
							uploadimg(3);
							that.setData({
								beimian: result.tu1
							})
						}else if(qu==3){
							that.setData({
								shouchi: result.tu1
							})
							that.submitall();
						}
					}else{
						wx.hideLoading();
						wx.showToast({
							title: '网络异常',
							icon:'none',
							duration:2000
						})
					}
				},
				fail: function (res) {
					console.log("fail:" + res);
					wx.hideLoading();
					wx.showToast({
						title: '网络繁忙，请稍后再试',
						icon:'none',
						duration:2000
					})
				}
			})
		}

	},
	goservers: function () {
		wx.navigateTo({
			url: 'service/service'
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