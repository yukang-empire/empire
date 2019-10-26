
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
	//底部距离上面的高度
	dis_height: '',
	nav_index: 1,
	home_data: {
		yesterday: {
			
		},
		today: {
			
		},
		tomorrow: {
			
		},
	},
	is_range: null,
	token: '',
	test_text: ''
  },
  methods: {
	dialog_sign_up () {
		this.sign_dialog.is_open = false;
		this.nav_index = 2;
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
		var day_00 = moment(current_time * 1000).format('YYYY-MM-DD') + ' 00:00:01';
		var day_06 = moment(current_time * 1000).format('YYYY-MM-DD') + ' 06:00:00';
		var day_08 = moment(current_time * 1000).format('YYYY-MM-DD') + ' 08:00:00';
		var today_stamp_00 = moment(day_00).valueOf() / 1000;
		var today_stamp_06 = moment(day_06).valueOf() / 1000;
		var today_stamp_08 = moment(day_08).valueOf() / 1000;
		if (current_time >= today_stamp_06 && current_time <= today_stamp_08) {
			this.is_range = 1;
		}else if (current_time >= today_stamp_00 && current_time < today_stamp_06) {
			this.is_range = 0;
		}else {
			this.is_range = 2;
		}
	},
	//选择日期
	select_btn(index) {
		this.nav_index = index;
	},
	//自定义弹框
	if_error (error) {
		//打开遮罩
		this.dialog.is_open = true;
		this.dialog.msg = error;
	},
    //判断返回的数据是否为JSON格式 如果不是 则转换成JSON格式
    is_JSON (data) {
      if(typeof(data) === 'string') {
        return JSON.parse(data);
      }else {
        return data;
      };
    },
	//打卡
	to_sign_up () {
		var that = this;
		this.is_range_fn();
		if (this.is_range == 1) {
			var send_data = new FormData();
			var token = sessionStorage.getItem('token');
			send_data.append("token", token);
			$.ajax({
				type: "POST",
				contentType: false,
				processData: false,
				url: "https://shop.technologyle.com/index.php?m=Api&c=Game&a=sign_in",
				dataType: "json",
				data: send_data,
				success: function (response) {
					console.log('打卡', response);
					if (response.status == 1) {
						that.sign_dialog.is_open = true;
					}else {
						that.if_error(response.msg);
					};
				}
			});
		}else {
			that.if_error('已过打卡时间！');
		};
	},
    // 混合开发的h5与原生APP交互
    toPay (phase, one_price) {
	  var that = this;
	  sessionStorage.setItem('phase', phase);
	  sessionStorage.setItem('price', one_price);
      //要发送的数据
      var data = {
		phase: phase,
		one_price: one_price
	  };
      //ios终端
      if (this.device_rele.is_ios) {
          this.setupWebViewJavascriptBridge( function(bridge) {
              //toPay为事先与ios开发人员约好的函数名 data为发送过去的数据 response为ios那边返回的数据
              bridge.callHandler('toPay', data, function(response) {
				  
              });
          });
      }
      //android终端
      else if (this.device_rele.is_android) {
            //toPay为事先与android终端开发人员约好的函数名 data为发送过去的数据(一般建议转成JSON.stringify字符串)
            //把安卓返回的数据装起来
			var response = window.jsInterface.toPay(phase, one_price);
	  };
	  
	  //判断是否小程序环境
	//   wx.miniProgram.getEnv(function(res) {
	// 	  console.log('is_mp', res.miniprogram);
	// 	//   that.test_text = '说明';
	// 	  if (res.miniprogram) {
	// 		// that.test_text = '规则';
	// 		wx.miniProgram.navigateTo({url: '/pages/home/payment/main?phase=' + data.phase + '&one_price=' + data.one_price });
	// 		// wx.miniProgram.navigateTo({url: '/pages/home/index/main'});
	// 	  }
	//   })
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
          url: "https://shop.technologyle.com/index.php?m=Api&c=Game&a=clock_index",
          dataType: "json",
          data: send_data,
          success (response) {
              console.log('首页数据', response);
              if (response.status == 1) {
				that.home_data = response.result;
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
  created () {
	  var that = this;
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
	// var token = 'af5997af7fac';
	// var token = '681b05855cb2';
	sessionStorage.setItem('token', token);
	this.get_home_data(token);

	this.is_range_fn();
	
  }
}) 