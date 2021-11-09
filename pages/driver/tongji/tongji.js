// pages/driver/order/order.js
const GetPeriod = require("../../../utils/getperiod.js");
const App = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		timetype:1,
		timechairs:[],
		orders: [],
		dateType: 0,
    dateTypeR: 'now'
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
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.time = new GetPeriod();
		this.setData({ dateType: 0, startDate: this.time.getNowDate(), endDate: this.time.getNowDate(), date: this.time.getPeriod() });
		
		var that=this;
		console.log(that.data.startDate);
		wx.request({
			url: App.globalData.host + 'Coupon/select_cdshouyi',
			data: {
				startDate: that.data.startDate,
				endDate: that.data.endDate
			},
			success: (res) => {
				if (res.data != 'error') {
					var list=res.data;
					for (var i = 0; i < list.length;i++){
						list[i]["paytime"] = that.functime(list[i]["paytime"])
					}
					that.setData({
						timechairs: list
					})
				} else {
					wx.showToast({
						title: '网络好像出了点小差，再扫码会更快哦!',
						icon: 'none',
						duration: 3000
					})
				}
			},
			fail: function (res) {
				wx.showToast({
					title: '网络好像出了点小差，再扫码会更快哦!',
					icon: 'none',
					duration: 3000
				})
			}
		})
	},
	functime: function (inputTime){
		inputTime = parseInt(inputTime);
		var date = new Date(inputTime);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
	},
	getDateTypeR(e){
    let dateType = e.currentTarget.dataset.datetype;
    this.setData({ dateTypeR: dateType, date: this.time.getPeriod({ periodType: dateType})})
  },
  // 获取当前时间段
  getDateType(e) {
    let dateType = e.currentTarget.dataset.datetype;
    let startDate = '', endDate = '';

    if (dateType == 0) {//今天
      startDate = this.time.getNowDate();
      endDate = this.time.getNowDate();
    } else if (dateType == 1) {//本周
      startDate = this.time.getWeekStartDate();
      endDate = this.time.getWeekEndDate();
    } else if (dateType == 2) {//本月
      startDate = this.time.getMonthStartDate();
      endDate = this.time.getMonthEndDate();
    } else if (dateType == 3) {//本年
      startDate = this.time.getYearStartDate();
      endDate = this.time.getYearEndDate();
    } else if (dateType == 4) {//选择时段初始化为当天时间段
      startDate = this.time.getNowDate();
      endDate = this.time.getNowDate();
    } else if (dateType == 5) {//本季度
      startDate = this.time.getQuarterStartDate();
      endDate = this.time.getQuarterEndDate();
    }
    this.setData({ dateType: dateType, startDate: startDate, endDate: endDate });
  },
  bindDateChange(e){
    if(e.currentTarget.id == 'start'){
      this.setData({ startDate: e.detail.value})
    } else if (e.currentTarget.id == 'end'){
      this.setData({ endDate: e.detail.value })
    }else{
      return;
    }
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