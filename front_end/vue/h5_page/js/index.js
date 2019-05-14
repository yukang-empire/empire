
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
        //弹框信息
        dialog: {
            is_open: false,
            msg: ''
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
        //表单数据
        form_data: {
            phone: '',
            password: '',
            re_password: '',
            verify_code: '',
            login: false
        },
        //表单正则
        rules_RE: {
            phone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            password: /^[\w]{6,16}$/,
            verify_code: /^\d{6}$/
        },
        //验证错误时的提示
        tip: {
            phone: {
                is_open: false,
                text: ''
            },
            password: {
                is_open: false,
                text: ''
            },
            re_password: {
                is_open: false,
                text: ''
            },
            verify_code: {
                is_open: false,
                text: ''
            }
        },
        //限制频繁获取验证码
        limit_get: {
            sec: 60,
            set_sec: 60,
            timer: null,
            text: '获取验证码',
            is_disabled: true
        },

    },
    methods: {
        
        //判断返回的数据是否为JSON格式 如果不是 则转换成JSON格式
        is_JSON (data) {
            if( typeof(data) == 'string') {
                return JSON.parse(data);
            }else {
                return data;
            }
        },
        //错误时的操作
        if_error (error) {
            //打开遮罩
            this.dialog.is_open = true;
            this.dialog.msg = error;
        },
        //点击分享
        share () {
            this.modules.is_bottom_share = true;
        },
        //复制文字
        copy_text () {
            let that = this;
            let clipboard = new ClipboardJS('.copy');
            //复制成功后的回调
            clipboard.on('success', function(e) {
                that.modules.is_copy_tip = true;
                setTimeout( () => {
                    that.modules.is_copy_tip = false;
                },1500);
                e.clearSelection();
            });
        },
        //html元素转截图
        html_to_img () {
            this.html_canvas(this.$refs.make_card, {
                //注入参数 可查看官网http://html2canvas.hertzen.com/configuration的api文档
                //解决截图过长出现滚动条的bug处理
                height: this.device_rele.height - 8
            }).then( canvas => {
                //删掉页面所有元素 只保留最终截图
                // document.body.removeChild(this.$refs.make_card);
                // document.body.appendChild(canvas);
            });
        },
        //清空input的操作
        clear_input (name) {
            switch (name) {
                case 'phone':
                    this.open_tip('phone', '请输入正确格式的手机号码！');
                    break;
                case 'password':
                    this.open_tip('password', '请输入6-16位由数字与字母组成的密码！');
                    break;
                case 're_password':
                    this.open_tip('re_password', '两次输入的密码不一致！');
                    break;
                case 'verify_code':
                    this.open_tip('verify_code', '请输入6位由纯数字组成的验证码！');
                    break;
            }
        },
        //验证input值
        blur_verify (name) {
            switch (name) {
                case 'phone':
                    if (!this.rules_RE.phone.test(this.form_data.phone)) {
                        this.open_tip('phone', '请输入正确格式的手机号码！');
                    }else {
                        this.tip.phone.is_open = false;
                    };
                    break;
                case 'password':
                    if (!this.rules_RE.password.test(this.form_data.password)) {
                        this.open_tip('password', '请输入6-16位由数字与字母组成的密码！');
                    }else {
                        this.tip.password.is_open = false;
                    };
                    break;
                case 're_password':
                    if (!this.form_data.re_password) {
                        this.open_tip('re_password', '请输入密码！');
                    }else if (this.form_data.re_password !== this.form_data.password) {
                        this.open_tip('re_password', '两次输入的密码不一致！');
                    }else {
                        this.tip.re_password.is_open = false;
                    };
                    break;
                case 'verify_code':
                    if (!this.rules_RE.verify_code.test(this.form_data.verify_code)) {
                        this.open_tip('verify_code', '请输入6位由纯数字组成的验证码！');
                    }else {
                        this.tip.verify_code.is_open = false;
                    };
                    break;
            }
        },
        //验证失败的提示操作
        open_tip (which, text) {
            //打开提示段落
            this.tip[which].is_open = true;
            this.tip[which].text = text;
        },
        //获取验证码
        get_code () {
            let phone = this.form_data.phone;
            //判断是否填入了正确的手机号码
            if (!this.rules_RE.phone.test(phone)) {
                this.open_tip('phone', '请输入正确格式的手机号码！')
            }else {
                //禁止频繁获取
                if (this.limit_get.is_disabled) {
                    //定时器
                    this.limit_get.is_disabled = false;
                    //即刻改变 避免延迟
                    this.limit_get.text = '重新获取(' + this.limit_get.set_sec + 's)';
                    this.limit_get.timer = setInterval( () => {
                        if (this.limit_get.sec <= 0) {
                            this.limit_get.text = '获取验证码';
                            this.limit_get.is_disabled = true;
                            //回到设定的初始秒数
                            this.limit_get.sec = this.limit_get.set_sec;
                            //清除定时器 并且删掉存储的localStorage
                            clearInterval(this.limit_get.timer);
                            this.limit_get.timer = null;
                            localStorage.removeItem('limit_get');
                        }else {
                            this.limit_get.sec--;
                            this.limit_get.text = '重新获取(' + this.limit_get.sec + 's)';
                            //储存定时器数据 以防页面刷新
                            localStorage.setItem('limit_get', JSON.stringify(this.limit_get));
                        };
                    }, 1000);
                    //md5加密规定的字符串
                    let time = new Date().getTime();
                    let sign = 'phoneSign201903' + phone + 'H5LOGIN' + time + 'phoneSign201903';
                    console.log("sign:", sign);
                    //默认16位加密 可自行修改
                    sign_md5 = sign.MD5(32);
                    console.log('MD5(32位):', sign_md5);
                    //获取验证码需要的参数
                    let code_para = {
                        mobile: phone,
                        type: 'H5LOGIN',
                        time: time,
                        sign: sign_md5
                    }
                    axios.post("https://mall.xr-network.com/api/sms/sms.php", code_para, 
                        // 设定请求头
                        // {headers: 
                        // 	{
                        // 	'X-Requested-With': 'XMLHttpRequest',
                        // 	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        // 	}
                        // }
                        ).then( (response) => {
                            var res = this.is_JSON(response.data);
                            console.log(res);
                        }).catch( (error) => {
                            this.if_error(error);
                    },"json");
                }else {
                    this.if_error('请勿频繁获取！');
                }
                
            };
        },
        //注册
        register () {
            //验证input值是否有空值
            let is_empty = !this.form_data.phone || !this.form_data.password || !this.form_data.re_password || !this.form_data.verify_code;
            //验证input值是否都符合正则
            let is_register = is_empty || this.tip.phone.is_open || this.tip.password.is_open || this.tip.re_password.is_open || this.tip.verify_code.is_open;
            let register_para = {
                phone: this.form_data.phone,
                password: this.form_data.password,
                code: this.form_data.verify_code
            };
            if (!is_register) {
                //显示转圈圈获取样式
                this.form_data.login = true;
                //注册请求
                
            }else {
                this.if_error("请完善必要的信息！");
            };
        },
        //混合开发的h5跳转页面
        h5_jump: function (url) {
            window.location.href = url;
        },
        //混合开发的h5与原生APP交互
        getInfo: function () {
            let that = this;
            //要发送的数据
            let data = {

            };
            //ios终端
            if (this.device_rele.is_ios) {
                this.setupWebViewJavascriptBridge( bridge => {
                    //getInfo为事先与ios开发人员约好的函数名 data为发送过去的数据 response为ios那边返回的数据
                    bridge.callHandler('getInfo', data, function(response) {
                        that.error(response);
                    });
                });
            }
            //android终端
            else if (this.device_rele.is_android) {
                //getInfo为事先与android终端开发人员约好的函数名 data为发送过去的数据(一般建议转成JSON.stringify字符串)
                let data_ = JSON.stringify(data);
                window.jsInterface.getInfo(data_);
                //把安卓返回的数据装起来
                let res = window.jsInterface.getInfo(data);
                that.error(res);
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
    mounted: function () {
        //判断浏览器终端类型
        let agent = navigator.userAgent;
        //Android终端
        this.device_rele.is_android = agent.indexOf('Android') != -1 || agent.indexOf('Adr') != -1 || agent.indexOf('Linux') != -1;
        //IOS终端
        this.device_rele.is_ios = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        //微信终端
        this.device_rele.is_wx = agent.toLowerCase().indexOf('micromessenger') != -1;
        //兼容获取页面高宽
        this.device_rele.width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
        this.device_rele.height = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;

        //html元素转截图
        this.html_canvas = html2canvas;

        //检查是否有存储的定时器
        let store_limit_get = localStorage.getItem('limit_get') || null;
        //获取剩余的秒数
        let remain_sec = store_limit_get ? JSON.parse(store_limit_get).sec : 0;
        if ( store_limit_get && remain_sec > 0) {
            this.limit_get.sec = remain_sec;
            this.limit_get.is_disabled = false;
            this.limit_get.text = '重新获取(' + (this.limit_get.sec - 1) + 's)';
            this.limit_get.timer = setInterval( () => {
                if (this.limit_get.sec <= 0) {
                    this.limit_get.text = '获取验证码';
                    this.limit_get.is_disabled = true;
                    this.limit_get.sec = this.limit_get.set_sec;
                    //清除定时器 删掉存储的localStorage
                    clearInterval(this.limit_get.timer);
                    this.limit_get.timer = null;
                    localStorage.removeItem('limit_get');
                }else {
                    this.limit_get.sec--;
                    this.limit_get.text = '重新获取(' + this.limit_get.sec + 's)';
                    localStorage.setItem('limit_get', JSON.stringify(this.limit_get));
                };
            }, 1000);
        };

    }
})