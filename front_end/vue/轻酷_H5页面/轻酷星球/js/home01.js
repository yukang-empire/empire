
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
    rankings: [],
    index_data: {
      bonus: {
        up_time: ''
      },
      bonus_list: [],
      total_bonus: []
    },
    timer: null,
    token: ''
  },
  methods: {
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
    //点击球分红
    to_bonus (index, id) {
      var that = this;
      var send_data = new FormData();
      send_data.append("id", id);
      send_data.append("token", sessionStorage.getItem('token'));
      // send_data.append("token", '681b05855cb2');
      $.ajax({
        type: "POST",
        contentType: false,
        processData: false,
        url: "https://shop.technologyle.com/index.php?m=Api&c=Bonus&a=give_money",
        dataType: "json",
        data: send_data,
        success: function (response) {
            console.log('点击分红', response);
            if (response.status == 1) {
              that.index_data.bonus_list.splice(index, 1);
			  that.if_error('领取成功！')
            }else {
              alert(response.msg);
            };
        }
      });
    },
    // 混合开发的h5与原生APP交互
    sendToken () {
      var that = this;
      //要发送的数据
      var data = {
        
      };
      //ios终端
      if (this.device_rele.is_ios) {
          this.setupWebViewJavascriptBridge( function(bridge) {
              //sendToken为事先与ios开发人员约好的函数名 data为发送过去的数据 response为ios那边返回的数据
              bridge.callHandler('sendToken', data, function(response) {
                  sessionStorage.setItem('token', response);
                  that.get_home_data(response);
              });
          });
      }
      //android终端
      else if (this.device_rele.is_android) {
          //sendToken为事先与android终端开发人员约好的函数名 data为发送过去的数据(一般建议转成JSON.stringify字符串)
          //把安卓返回的数据装起来
          var token = window.jsInterface.sendToken();
          sessionStorage.setItem('token', token);
          that.get_home_data(token);
      }else {
          return false;
      };
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
          url: "https://shop.technologyle.com/index.php?m=Api&c=Bonus&a=bonus_index",
          dataType: "json",
          data: send_data,
          success: function (response) {
              console.log('首页数据', response);
              if (response.status == 1) {
                  that.index_data = response.result;
                  that.rankings = that.index_data.total_bonus;
                  that.index_data.frozen_points = that.index_data.frozen_points ? that.index_data.frozen_points : 0;
                  sessionStorage.setItem('bonus_points', that.index_data.bonus_points);
                  sessionStorage.setItem('frozen_points', that.index_data.frozen_points);
                  for (var i = 0; i < that.index_data.bonus_list.length; i++) {
                    that.index_data.bonus_list[i].time01 = moment(that.index_data.bonus_list[i].add_time * 1000).format('HH:mm');
                    that.index_data.bonus_list[i].time02 = moment(that.index_data.bonus_list[i].add_time * 1000).format('MM.DD');
                    that.index_data.bonus_list[i].is_show = true;
                  };
                  let all_time = that.index_data.bonus.up_time;
                  let dead_line_num = parseInt(all_time) * 1000 - new Date().getTime();
                  that.index_data.bonus.up_time = moment(dead_line_num).format('DD:HH:mm:ss');
                  that.timer = setInterval(() => {
                    dead_line_num = dead_line_num - 1000;
                    that.index_data.bonus.up_time = moment(dead_line_num).format('DD:HH:mm:ss');
                    if (dead_line_num < 1000) {
                      clearInterval(that.timer);
                      that.timer = null;
                      that.index_data.bonus.up_time = '即将分红'
                    };
                  }, 1000);
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
    this.sendToken();
    
    // sessionStorage.setItem('token', '681b05855cb2');
    // this.get_home_data('681b05855cb2');
  }
})