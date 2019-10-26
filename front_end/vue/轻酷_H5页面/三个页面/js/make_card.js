
new Vue({
    el:'#app',
    data: {
        //要显示的组件
        modules: {
            is_ticket: false,
            is_bottom_share: false,
            is_tip: false,
            is_justify_li: false,
            is_copy_tip: false,
            is_form: false,
            is_back: false,
        },
        //默认用户信息
        user_info: {
            userName: 'qingku_user',
            userPic: 'imgs/logo02.png'
        }, 
        //检测设备
        device_rele: {
            is_android: null,
            is_ios: null,
            is_wx: null,
            height: null,
            width: null
        },
        //html元素转截图
        html_canvas: null,
        //截图后注入的img
        final_img: '',
        QR_code: '',
        base_64: '',
    },
    methods: {
        sent_base (base_64) {
            var that = this;
            //要发送的数据
            var data = base_64;
            //ios终端
            if (this.device_rele.is_ios) {
                this.setupWebViewJavascriptBridge( function (bridge) {
                    bridge.callHandler('shareImg', data, function(response) {
                        
                    });
                });
            }
            //android终端
            else if (this.device_rele.is_android) {
                var data_ = JSON.stringify(data);
                // window.jsInterface.shareImg("123", "friend");
                var return_data = window.jsInterface.shareImg("123", "friend");
                alert(return_data);
            }else {
                return false;
            };
        },
        //html元素转截图
        html_to_img () {
            var that = this;
            this.html_canvas(this.$refs.make_card, {
                //在此可注入参数 可查看官网http://html2canvas.hertzen.com/configuration的api文档

            }).then( function (canvas) {
                // this.base_64 = canvas.toDataURL();
                // this.sent_base(this.base_64);
                that.$refs.app.removeChild(that.$refs.make_card);
                // toDataURL在本地可能会因为跨域等问题导致无效 丢到服务器就正常了
                that.final_img = canvas.toDataURL();

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
        //获取用户信息
        if (localStorage.getItem('user_info')) {
            this.user_info = JSON.parse(localStorage.getItem('user_info'));
        };
        if (localStorage.getItem('QR_code')) {
            this.QR_code = localStorage.getItem('QR_code');
        };

        //html元素转截图
        this.html_canvas = html2canvas;
        // this.html_to_img();
    }
})