// pages/views/take_name/address/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_city: ['深圳市', '广州市', '东莞市', '佛山市', '珠海市', '成都市', '南京市', '西安市'],
    city: '',
    is_address: '',
    is_kaifang: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var length = this.data.all_city.length;
    this.setData({
      city: app.globalData.select_city,
      is_address: app.globalData.is_address
    });
    for (var i = 0; i < length; i++) {
      if (this.data.all_city[i] == app.globalData.select_city) {
        this.setData({
          is_kaifang: true
        })
      }
    };
    
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
  selectCity: function (event) {
    this.setData({
      city: event.currentTarget.dataset.city
    });
    app.globalData.select_city = event.currentTarget.dataset.city;
    wx.navigateTo({
      url: '/pages/views/take_name/index',
    })
  }
})