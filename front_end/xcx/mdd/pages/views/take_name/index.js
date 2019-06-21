// pages/views/take_name/index.js
var amapFile = require("../../common/libs/amap-wx.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '',
    array: ['有限公司', '合伙企业'],
    index: 0,
    longitude: '',
    latitude: '',
    key: 'c11a7386404c0f717216dc0886aadebb',
    is_succ: app.globalData.is_address,
    is_dialog: false,
    input_final: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_address();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      city: app.globalData.select_city,
      input_final: app.globalData.input_final ? app.globalData.input_final : "请输入您希望字号中包含的字"
    });
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

  },
  //调起picker组件
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  //选择地区
  select_address: function () {
    wx.navigateTo({
      url: '/pages/views/take_name/address/index',
    })
  },
  //选择字号
  select_word: function () {
    wx.navigateTo({
      url: '/pages/views/take_name/word/index',
    })
  },
  //获取定位
  get_address: function () {
    var that = this;
    wx.getLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
        that.gaode_switch();
      },
      fail: function (error) {
        app.globalData.is_address = false;
        that.setData({
          is_succ: app.globalData.select_city ? true : false,
          city: app.globalData.select_city ? app.globalData.select_city : "授权失败"
        });
      }
    })
  },
  //用高德地图转为城市
  gaode_switch: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: that.data.key });
    myAmapFun.getRegeo({
      location: '' + that.data.longitude + ',' + that.data.latitude + '',
      success: function (data) {
        console.log(data);
        that.setData({
          city: app.globalData.select_city ? app.globalData.select_city : data[0].regeocodeData.addressComponent.city
        });
        app.globalData.select_city = data[0].regeocodeData.addressComponent.city;
      },
      fail: function (info) {
        console.log(info);
      }
    });
  },
  //查看字号说明
  look_font: function () {
    this.setData({ is_dialog: true });
  },
  //隐藏自定义模态框
  hidden_dialog: function () {
    this.setData({ is_dialog: false });
  },
})