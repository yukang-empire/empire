// pages/views/take_name/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_find: false,
    qmxz: true,
    hyjc: false,
    xzzh: false,
    cmjc: false,
  },

  my_collection() {
    wx.redirectTo({
      url: '/pages/views/collection/index',
    });
  },
  
  understand () {
    wx.redirectTo({
      url: '/pages/views/take_name/rule/index',
    });
  },
  //调起拨打电话
  call_phone () {
    wx.makePhoneCall({
      phoneNumber: '4000-380-680',
    });
  },

  rename() {
    wx.redirectTo({
      url: '/pages/views/take_name/index',
    });
  },
  check_name() {
    wx.redirectTo({
      url: '/pages/views/verify_name/index',
    });
  },
  add_collect() {

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