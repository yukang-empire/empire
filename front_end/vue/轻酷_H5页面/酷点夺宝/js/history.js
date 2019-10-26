
// 纯H5页面不建议使用ES5以上的语法 比如let或箭头函数 axios也不建议用 否则会因为兼容不识别导致整个页面空白无法加载
new Vue({
	el:'#app',
	data: {
	  //检测设备
	  device_rele: {
		  is_android: null,
		  is_ios: null,
		  is_wx: null,
		  height: null,
		  width: null
	  },
	  //弹框信息
	  dialog: {
		  is_open: false,
		  msg: ''
	  },
	  sign_dialog: {
		  is_open: false,
	  },
	  home_data: [],
	  select_index: 0,
	  newest_phase: {},
	  newest_phase_win_num: [],
	  progress: 0,
	  buy_dialog: false,
	  is_tip: {
		  is_open: '',
		  msg: ''
	  },
	  need_kd: 1,
	  is_win: false,
	  is_win_dialog: 0,
	  token: '',
	  scroll_x: 0
	},
	methods: {
	  dialog_sign_up () {
		  this.sign_dialog.is_open = false;
		  this.nav_index = 2;
	  },
	  //增减人次
	  plus_kd () {
		  if (this.need_kd < 5) {
			  this.need_kd ++;
		  }else {
			  this.is_tip.is_open = true;
			  this.is_tip.msg = '最多参与5人次！';
			  setTimeout(()=>{
				  this.is_tip.is_open = false;
			  }, 1000);
		  };
		  sessionStorage.setItem('num', this.need_kd);
	  },
	  reduce_kd () {
		  if (this.need_kd < 2) {
			  this.is_tip.is_open = true;
			  this.is_tip.msg = '至少需参与1次！';
			  setTimeout(()=>{
				  this.is_tip.is_open = false;
			  }, 1000);
		  }else {
			  this.need_kd --;
		  };
		  sessionStorage.setItem('num', this.need_kd);
	  },
	  //获取url参数
	  getQueryVariable (variable) {
		  var query = window.location.search.substring(1);
		  var vars = query.split("&");
		  for (var i=0;i<vars.length;i++) {
				  var pair = vars[i].split("=");
				  if(pair[0] == variable){
					  return pair[1];
					  sessionStorage.setItem('token', pair[1]);
				  };
		  };
		  return(false);
	  },
	  //判断是否在打卡时间内
	  is_range_fn () {
		  // 获取当前时间
		  var current_time = Math.round(new Date() / 1000);
		  var day_06 = moment(current_time * 1000).format('YYYY-MM-DD') + ' 06:00:00';
		  var day_08 = moment(current_time * 1000).format('YYYY-MM-DD') + ' 08:00:00';
		  var today_stamp_06 = moment(day_06).valueOf() / 1000;
		  var today_stamp_08 = moment(day_08).valueOf() / 1000;
		  if (current_time >= today_stamp_06 && current_time <= today_stamp_08) {
			  this.is_range = true;	
		  };
	  },
	  //自定义弹框
	  if_error (error) {
		  //打开遮罩
		  this.dialog.is_open = true;
		  this.dialog.msg = error;
	  },
	  pay_db_01 (id) {
		  this.buy_dialog = true;
		  sessionStorage.setItem('id', id);
	  },
	  // 混合开发的h5与原生APP交互
	  pay_db_02 () {
		var that = this;
		//要发送的数据
		var num = sessionStorage.getItem('num') ? parseInt(sessionStorage.getItem('num')) : 1;
		var data = {
		  id: sessionStorage.getItem('id'),
		  num: num
		};
		console.log('data', data);
		//ios终端
		if (this.device_rele.is_ios) {
			this.setupWebViewJavascriptBridge( function(bridge) {
				//pay_db为事先与ios开发人员约好的函数名 data为发送过去的数据 response为ios那边返回的数据
				bridge.callHandler('pay_db', data, function(response) {
					
				});
			});
		}
		//android终端
		else if (this.device_rele.is_android) {
			  var data_ = JSON.stringify(data);
			  //pay_db为事先与android终端开发人员约好的函数名 data为发送过去的数据(一般建议转成JSON.stringify字符串)
			  //把安卓返回的数据装起来
			  window.jsInterface.pay_db(data_);
		};
		
		//判断是否小程序环境
		wx.miniProgram.getEnv(function(res) {
			console.log('is_mp', res.miniprogram);
			if (res.miniprogram) {
			  wx.miniProgram.navigateTo({url: '/pages/home/payment/main?id=' + data.id + '&goods_price=' + data.goods_price });
			}
		})
	  },
	  //选择期数
	  select_phase (index) {
		  var that = this;
		  this.select_index = index;
		  this.newest_phase = this.home_data[index];
		  
		  if (this.newest_phase[0]) {
			  
			  that.newest_phase_win_num = this.newest_phase[0].luck_list;
			  for (var j = 0;j<that.newest_phase_win_num.length;j++) {
				  if (that.newest_phase_win_num[j].luck_no == newest_phase.give_no) {
					  that.is_win = true;
				  };
			  };
		  }
	  },
	  get_home_data (token) {
		var that = this;
		//请求首页数据
		var send_data = new FormData();
		send_data.append("token", token);
		$.ajax({
			type: "POST",
			contentType: false,
			processData: false,
			url: "https://shop.technologyle.com/index.php?m=Api&c=Game&a=luck_list",
			dataType: "json",
			data: send_data,
			success (response) {
				console.log('首页数据', response);
				if (response.status == 1) {
				  that.home_data = response.result;
				  var length = that.home_data.length;
				  for (var i = 0; i < length; i++) {
					  that.home_data[i].add_time = moment(that.home_data[i].add_time * 1000).format('YYYY-MM-DD');
					
				  };
				};
			}
		});
	  },
	  // 与IOS原生APP交互相关 必须要有
	  setupWebViewJavascriptBridge: function (callback) {
		  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
		  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
		  window.WVJBCallbacks = [callback];
		  var WVJBIframe = document.createElement('iframe');
		  WVJBIframe.style.display = 'none';
		  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
		  document.documentElement.appendChild(WVJBIframe);
		  setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
	  },
		
	},
	mounted () {
	  moment.locale('zh-cn');
	  //判断浏览器终端类型
	  var agent = navigator.userAgent;
	  //Android终端
	  this.device_rele.is_android = agent.indexOf('Android') != -1 || agent.indexOf('Adr') != -1 || agent.indexOf('Linux') != -1;
	  //IOS终端
	  this.device_rele.is_ios = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	  //微信终端
	  this.device_rele.is_wx = agent.toLowerCase().indexOf('micromessenger') != -1;
	  this.device_rele.width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
	  this.device_rele.height = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
	  
	  console.log('设备窗口信息', this.device_rele);
	  this.dis_height = this.device_rele.width / 2.717;
  
	  //获取打卡首页数据
	  var token = this.getQueryVariable("token");
	//   var token = 'cdb66e9e4244';
	  // var token = '681b05855cb2';
	//   this.token = token;
	  sessionStorage.setItem('token', token);
	  this.get_home_data(token);
  
	  // this.is_range_fn();
	  
	}
  }) 