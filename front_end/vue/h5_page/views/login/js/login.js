
// 纯H5页面不建议使用ES5以上的语法 比如let或箭头函数 axios也不建议用 否则会因为兼容不识别导致整个页面空白无法加载
new Vue({
    el:'#app',
    data: {
        //弹框相关
        dialog: {
            is_open: false,
            msg: null
        },
        //表单数据
        form: {
            account: null,
            password: null,
            re_password: null,
            verify_code: null,
            is_circle: null,
        },
        //表单正则
        form_RE: {
            phone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            email: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
            password: /^[\w]{6,16}$/,
            verify_code: /^\d{6}$/
        },
        //表单获得焦点 显示清除图标
        form_ico: {
            account: null,
            password: null,
            re_password: null,
            verify_code: null,
        },
        //验证错误时的提示
        verify_warn: {
            account: {
                is_open: false,
                text: null
            },
            password: {
                is_open: false,
                text: null
            },
            re_password: {
                is_open: false,
                text: null
            },
            verify_code: {
                is_open: false,
                text: null
            }
        },
        //限制频繁获取验证码
        limit_get: {
            sec: 60,
            init_sec: 60,
            timer: null,
            text: '获取验证码',
            is_disabled: false
        },

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
        //验证失败的提示操作
        verify_error (which, text) {
            //打开提示段落
            this.verify_warn[which].is_open = true;
            this.verify_warn[which].text = text;
            this.form_ico[which] = false;
        },
        //input获得焦点 显示清除图标
        get_focus (name) {
            this.form_ico[name] = true;
        },
        //清空input的操作
        clear_input (name) {
            this.form[name] = '';
            switch (name) {
                case 'account':
                    this.verify_error('account', '请输入正确格式的手机号码！');
                    break;
                case 'password':
                    this.verify_error('password', '请输入6-16位数字与字母组成的密码！');
                    break;
                case 're_password':
                    this.verify_error('re_password', '两次输入的密码不一致！');
                    break;
                case 'verify_code':
                    this.verify_error('verify_code', '请输入6位纯数字组成的验证码！');
                    break;
            };
        },
        //验证input值
        verify_input (name) {
            switch (name) {
                case 'account':
                    if (!this.form_RE.phone.test(this.form.account)) {
                        this.verify_error('account', '请输入正确格式的手机号码！');
                    }else {
                        this.verify_warn.account.is_open = false;
                    };
                    break;
                case 'password':
                    if (!this.form_RE.password.test(this.form.password)) {
                        this.verify_error('password', '请输入6-16位数字与字母组成的密码！');
                    }else {
                        this.verify_warn.password.is_open = false;
                    };
                    break;
                case 're_password':
                    if (!this.form.re_password) {
                        this.verify_error('re_password', '请再次输入密码！');
                    }else if (this.form.re_password !== this.form.password) {
                        this.verify_error('re_password', '两次输入的密码不一致！');
                    }else {
                        this.verify_warn.re_password.is_open = false;
                    };
                    break;
                case 'verify_code':
                    if (!this.form_RE.verify_code.test(this.form.verify_code)) {
                        this.verify_error('verify_code', '请输入6位纯数字组成的验证码！');
                    }else {
                        this.verify_warn.verify_code.is_open = false;
                    };
                    break;
            };
        },
        //获取验证码
        get_code () {
            var that = this;
            var account = this.form.account;
            //判断是否填入了正确的手机号码
            if (!this.form_RE.phone.test(account)) {
                this.verify_error('account', '请输入正确格式的手机号码！')
            }else {
                //禁止频繁获取
                if (!this.limit_get.is_disabled) {
                    //定时器
                    this.limit_get.is_disabled = true;
                    //即刻改变 避免延迟
                    this.limit_get.text = '重新获取(' + this.limit_get.init_sec + 's)';
                    this.limit_get.timer = setInterval( function () {
                        if (that.limit_get.sec <= 0) {
                            that.limit_get.text = '获取验证码';
                            that.limit_get.is_disabled = false;
                            //回到设定的初始秒数
                            that.limit_get.sec = that.limit_get.init_sec;
                            //清除定时器 并且删掉存储的localStorage
                            clearInterval(that.limit_get.timer);
                            that.limit_get.timer = null;
                            localStorage.removeItem('limit_get');
                        }else {
                            that.limit_get.sec--;
                            that.limit_get.text = '重新获取(' + that.limit_get.sec + 's)';
                            //储存定时器数据 以防页面刷新
                            localStorage.setItem('limit_get', JSON.stringify(that.limit_get));
                        };
                    }, 1000);
                    //md5加密规定的字符串
                    var time = new Date().getTime();
                    var sign = 'accountSign201903' + account + 'H5LOGIN' + time + 'accountSign201903';
                    //默认16位加密 可修改为32位
                    sign_md5 = sign.MD5(32);
                    console.log('MD5(32位):', sign_md5);
                    //获取验证码需要的参数
                    var code_para = {
                        mobile: account,
                        type: 'H5LOGIN',
                        time: time,
                        sign: sign_md5
                    }
                    $.ajax({
                        type: "POST",
                        //不设定这2个参数 则jq会以Form Data数据类型发送给后端 可能会导致后端无法识别
                        contentType: false,
                        processData: false,
                        url: "https://api.technologyle.com/sms/sms.php",
                        dataType : "json",
                        data: JSON.stringify(code_para),
                        success: function (response) {
                            console.log(response);
                        }
                    });
                    //使用axios请求 在某些低版本浏览器里 可能会导致页面空白无法加载
                    // axios.post("https://mall.xr-network.com/api/sms/sms.php", code_para, 
                    //     // 可设定请求头
                    //     // {
                    //     //     headers: {
                    //     //         'X-Requested-With': 'XMLHttpRequest',
                    //     //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    //     // 	}
                    //     // }
                    //     ).then( function (response) {
                    //         var res = that.is_JSON(response.data);
                    //         console.log(res);
                    //     }).catch( function (error) {
                    //         that.is_dialog(error);
                    // },"json");
                }else {
                    this.is_dialog('请勿频繁获取！');
                };
                
            };
        },
        //登录
        login () {
            var that = this;
            var account = this.form.account;
            //验证input值是否有空值
            var is_empty = !this.form.account || !this.form.password || !this.form.verify_code;
            //验证input值是否都符合正则
            var is_RE = is_empty || this.verify_warn.account.is_open || this.verify_warn.password.is_open || this.verify_warn.verify_code.is_open;
            if (!is_RE) {
                //md5加密规定的字符串
                var time = new Date().getTime();
                var sign = 'phoneSign201903' + account + 'H5LOGIN' + time + 'phoneSign201903';
                //默认16位加密 可自行修改
                var sign_md5 = sign.MD5(32);
                var password_md5 = this.form.password.MD5(32);
                console.log('MD5(32位):', sign_md5);
                var register_para = {
                    mobile: account,
                    type: 'H5LOGIN',
                    time: time,
                    sign: sign_md5,
                    password: password_md5,
                    codes: this.form.verify_code,
                    invited: this.form.invi_code,
                };
                console.log(1);
                //注册请求
                $.ajax({
                    type: "POST",
                    contentType: false,
                    processData: false,
                    url: "https://api.technologyle.com/hthapi.php",
                    dataType : "json",
                    data: JSON.stringify(register_para),
                    success: function (response) {
                        console.log(response);
                        if (response.code == 0) {
                            that.is_dialog("注册成功！请前往下载登录！");
                            setTimeout(function () {
                                window.location.href = 'https://shop.technologyle.com/userReg/invi_download.html?first_leader=' + that.form.invi_code;
                            }, 2000);
                        }else {
                            that.is_dialog(response.start);
                        };
                    }
                });
            }else {
                this.is_dialog("请完善必要的信息！");
            };
        },
    },
    mounted () {
        var that = this;
        //检查是否有存储的定时器
        var store_limit_get = localStorage.getItem('limit_get') || null;
        //获取剩余的秒数
        var remain_sec = store_limit_get ? JSON.parse(store_limit_get).sec : 0;
        if ( store_limit_get && remain_sec > 0) {
            this.limit_get.sec = remain_sec;
            this.limit_get.is_disabled = true;
            this.limit_get.text = '重新获取(' + (this.limit_get.sec - 1) + 's)';
            this.limit_get.timer = setInterval( function () {
                if (that.limit_get.sec <= 0) {
                    that.limit_get.text = '获取验证码';
                    that.limit_get.is_disabled = false;
                    that.limit_get.sec = that.limit_get.init_sec;
                    //清除定时器 删掉存储的localStorage
                    clearInterval(that.limit_get.timer);
                    that.limit_get.timer = null;
                    localStorage.removeItem('limit_get');
                }else {
                    that.limit_get.sec--;
                    that.limit_get.text = '重新获取(' + that.limit_get.sec + 's)';
                    localStorage.setItem('limit_get', JSON.stringify(that.limit_get));
                };
            }, 1000);
        };
    }
})