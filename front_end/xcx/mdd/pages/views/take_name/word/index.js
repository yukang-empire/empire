// pages/views/take_name/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    one: '',
    two: '',
    three: '',
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
    if (app.globalData.input_final) {
      var arr = app.globalData.input_final.split("、");
      this.setData({
        one: arr[0],
        two: arr[1],
        three: arr[2]
      });
    }
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
  input_one: function (event) {
    if (event.detail.value) {
      this.setData({
        one: event.detail.value
      });
    };
    app.globalData.input_final = this.data.one + "、" + this.data.two + "、" + this.data.three;
  },
  input_two: function (event) {
    if (event.detail.value) {
      this.setData({
        two: event.detail.value
      });
    };
    app.globalData.input_final = this.data.one + "、" + this.data.two + "、" + this.data.three;
  },
  input_three: function (event) {
    if (event.detail.value) {
      console.log(111);
      this.setData({
        three: event.detail.value
      });
    };
    app.globalData.input_final = this.data.one + "、" + this.data.two + "、" + this.data.three;
  },
  preserve: function () {
    wx.navigateTo({
      url: '/pages/views/take_name/index',
    })
  }
})