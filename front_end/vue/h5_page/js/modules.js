
// H5页面不建议使用ES5以上的语法 比如let或箭头函数 axios也不建议用 否则会因为兼容不识别导致整个页面空白无法加载
new Vue({
    el:'#app',
    data: {
        //要显示的复用模块
        show_modules: {
            wx_right: false,
            bottom_share: false,
            go_back: false,
            justify_li: false,
            copy_text: false,
        },
        //弹框相关
        dialog: {
            is_open: false,
            msg: null
        },
        //检测浏览器类型
        browser: {
            //移动端/PC端
            is_mobile: null,
            is_android: null,
            is_ios: null,
            //是否微信浏览器
            is_wx: null,
            //页面高宽
            height: null,
            width: null
        },
        //html元素转截图
        html_canvas: {
            before: null,
            after: null
        }
    },
    methods: {
        //判断返回的数据是否为JSON格式 如果不是 则转换成JSON格式
        is_JSON (data) {
            if( typeof(data) === 'string') {
                return JSON.parse(data);
            }else {
                return data;
            };
        },
        //打开dialog弹框
        is_dialog (info) {
            //打开遮罩
            this.dialog.is_open = true;
            this.dialog.msg = info;
        },
        //复制文字并提示
        copy_text () {
            var that = this;
            var clipboard = new ClipboardJS('.copy');
            //复制成功后的回调
            clipboard.on('success', function(e) {
                that.show_modules.copy_text = true;
                setTimeout( function () {
                    that.show_modules.copy_text = false;
                },1500);
                e.clearSelection();
            });
        },
        //html元素转截图
        html_to_canvas () {
            var that = this;
            //$refs.screenshot为页面需要截图的dom元素
            this.html_canvas.before(this.$refs.screenshot, {
                //可注入参数 具体查看官网http://html2canvas.hertzen.com/configuration的api文档

            }).then( function (canvas) {
                // toDataURL把图片转成base64格式 在本地可能会因为跨域等问题导致无效 丢到服务器就正常了
                this.html_canvas.after = canvas.toDataURL();
                //然后再注入到页面img元素的src里
                
            });
        },
        //混合开发的H5与原生APP交互
        h5_app: function () {
            var that = this;
            //要发送的数据
            var data = {

            };
            //ios终端
            if (this.browser.is_ios) {
                this.setupWebViewJavascriptBridge( function (bridge) {
                    //fn_name为事先与ios开发人员约定好的函数名 data为发送过去的数据 response为ios那边返回的数据
                    bridge.callHandler('fn_name', data, function(response) {
                        
                    });
                });
            }
            //android终端
            else if (this.browser.is_android) {
                //fn_name为事先与android开发人员约定好的函数名 data为发送过去的数据(一般建议转成字符串) android返回的数据可以用变量装起来
                var data = JSON.stringify(data);
                //这种写法 既拿到了返回数据 又调起了android那边的函数
                var response = window.jsInterface.fn_name(data);
            }else {
                return false;
            };
        },
        //与IOS原生APP交互相关 必须要有
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
        var that = this;
        //判断浏览器终端类型
        var agent = navigator.userAgent;
        //移动端/PC端
        this.browser.is_mobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(agent);
        //Android终端
        this.browser.is_android = agent.indexOf('Android') != -1 || agent.indexOf('Adr') != -1 || agent.indexOf('Linux') != -1;
        //IOS终端
        this.browser.is_ios = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        //微信终端
        this.browser.is_wx = agent.toLowerCase().indexOf('micromessenger') != -1;
        //兼容获取页面高宽
        this.browser.width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
        this.browser.height = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;

        //html元素转截图
        this.html_canvas.before = html2canvas;
        if (this.$refs.screenshot) {
            this.html_to_canvas();
        };


    }
})