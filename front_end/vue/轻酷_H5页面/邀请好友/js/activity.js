
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
        response: ''
    },
    methods: {
        // 混合开发的h5与原生APP交互
        jumpActivity: function () {
			var that = this;
			//要发送的数据
			var data = {
				
			};
			//ios终端
			if (this.device_rele.is_ios) {
				this.setupWebViewJavascriptBridge( function(bridge) {
					//jumpActivity为事先与ios开发人员约好的函数名 data为发送过去的数据 response为ios那边返回的数据
					bridge.callHandler('jumpActivity', data, function(response) {
						that.response = response;
					});
				});
			}
			//android终端
			else if (this.device_rele.is_android) {
				//jumpActivity为事先与android终端开发人员约好的函数名 data为发送过去的数据(一般建议转成JSON.stringify字符串)
				//把安卓返回的数据装起来
				var res = window.jsInterface.jumpActivity();
				var response = JSON.parse(res);
			};
			wx.miniProgram.navigateTo({url: '../index/main'});
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
    mounted: function () {
        // 判断浏览器终端类型
        var agent = navigator.userAgent;
        //Android终端
        this.device_rele.is_android = agent.indexOf('Android') != -1 || agent.indexOf('Adr') != -1 || agent.indexOf('Linux') != -1;
        //IOS终端
        this.device_rele.is_ios = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        //微信终端
        this.device_rele.is_wx = agent.toLowerCase().indexOf('micromessenger') != -1;
        //兼容获取页面高宽
        this.device_rele.width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
        this.device_rele.height = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
    }
})