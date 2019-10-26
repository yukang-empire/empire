
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
	  record_data: {
		chance: '0%'
	  }
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
	  
	  get_record_data () {
		var that = this;
		moment.locale('zh-cn');
		//参赛记录数据
		var send_data = new FormData();
		var token = sessionStorage.getItem('token');
		// var token = '681b05855cb2';
		send_data.append("token", token);
		$.ajax({
			type: "POST",
			contentType: false,
			processData: false,
			url: "https://shop.technologyle.com/index.php?m=Api&c=Game&a=sign_list",
			dataType: "json",
			data: send_data,
			success: function (response) {
				console.log('参赛记录', response);
				if (response.status == 1) {
					that.record_data = response.result;
					that.record_data.list = that.record_data.list;
					that.record_data.chance = that.record_data.chance ? that.record_data.chance + "%" : '0%';
					if (that.record_data.list && that.record_data.list.length > 0) {
						var length = that.record_data.list.length;
						for (var i = 0; i < length; i++) {
							if (that.record_data.list[i].status == 1 && that.record_data.list[i].is_sign == 0) {
								that.record_data.list[i].status_text = '未打卡';
							}else if (that.record_data.list[i].status == 1 && that.record_data.list[i].is_sign == 1) {
								that.record_data.list[i].status_text = '已打卡';
							}else if (that.record_data.list[i].status == 0) {
								that.record_data.list[i].status_text = '未开赛';
							};
							that.record_data.list[i].clock_time = that.record_data.list[i].clock_time ? moment(that.record_data.list[i].clock_time * 1000).format('HH:mm:ss') : '--:--:--';
						};
					};
				};
			}
		});
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
	
		this.get_record_data ();

	}
  })