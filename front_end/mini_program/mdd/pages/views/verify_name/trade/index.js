// pages/views/take_name/trade/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // trade: {
    //   service: ["文化传播", "广告", "建筑设计", "商务服务", "会务服务", "仓储服务", "电子商务", "餐饮管理", "物流"],
    //   consult: ["企业管理咨询", "人才咨询", "旅游咨询", "健康管理咨询", "海事咨询", "房地产咨询", "商务管理咨询", "体育咨询", "法律咨询"],
    //   commerce: ["贸易", "医疗器械", "家具", "汽车用品", "通信设备", "电子产品", "建筑材料", "珠宝首饰", "化工产品"],
    //   technology: ["电子科技", "机械科技", "计算机科技", "网络科技", "信息科技", "智能科技", "环保科技", "通讯科技", "生物科技", "教育科技", "化工科技", "新能源科技"],
    //   kua_hang: ["实业", "实业发展", "企业发展", "经济发展"],
    //   engineering: ["建筑工程", "市政工程", "建筑装饰工程", "装饰工程", "建设工程", "机电工程", "建筑安装工程", "装饰设计工程"],
    //   install: ["管道安装设备", "机电设备安装", "机械设备租赁", "设备租赁", "电子设备租赁", "设备安装", "制冷设备安装", "起重设备安装", "空调设备安装"]
    // },
    trade: [
      ["文化传播", "广告", "建筑设计", "商务服务", "会务服务", "仓储服务", "电子商务", "餐饮管理", "物流"],
      ["企业管理咨询", "人才咨询", "旅游咨询", "健康管理咨询", "海事咨询", "房地产咨询", "商务管理咨询", "体育咨询", "法律咨询"],
      ["贸易", "医疗器械", "家具", "汽车用品", "通信设备", "电子产品", "建筑材料", "珠宝首饰", "化工产品"],
      ["电子科技", "机械科技", "计算机科技", "网络科技", "信息科技", "智能科技", "环保科技", "通讯科技", "生物科技", "教育科技", "化工科技", "新能源科技"],
      ["实业", "实业发展", "企业发展", "经济发展"],
      ["建筑工程", "市政工程", "建筑装饰工程", "装饰工程", "建设工程", "机电工程", "建筑安装工程", "装饰设计工程"],
      ["管道安装设备", "机电设备安装", "机械设备租赁", "设备租赁", "电子设备租赁", "设备安装", "制冷设备安装", "起重设备安装", "空调设备安装"]
    ],
    is_result: false,
    search_result: [],
    input_content: ''
  },

  //选择行业
  select_trade (event) {
    app.globalData.select_trade = event.currentTarget.dataset.trade;
    wx.redirectTo({
      url: '/pages/views/take_name/index',
    });
  },
  //键盘输入
  search (event) {
    var str = event.detail.value;
    if (str) {
      var arr = [];
      for (var i = 0; i < 7; i++) {
        for (var j = 0; j < this.data.trade[i].length; j++) {
          if (this.data.trade[i][j].indexOf(str) != -1) {
            arr.push(this.data.trade[i][j]);
            this.setData({
              is_result: true,
              search_result: arr
            });
          };
        };
      };
    }else {
      this.setData({
        is_result: false,
        search_result: ''
      });
    };
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