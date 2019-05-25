
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
            //初始化密码框input类型
            password_type: 'password',
            re_password: null,
            //初始化密码框input类型
            re_password_type: 'password',
            verify_code: null,
            //邀请码 默认从url里抓取 禁止修改
            invi_code: null,
            //点击注册转圈圈 禁止频繁点击
            is_circle: null,
        },
        //表单正则
        form_RE: {
            phone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            email: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
            password: /^[\w]{6,16}$/,
            verify_code: /^\d{6}$/
        },
        //表单输入数据 显示清除图标
        form_ico: {
            account: null,
            password: null,
            see: null,
            hide: null,
            re_password: null,
            re_see: null,
            re_hide: null,
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
        },
        //查看or隐藏密码
        see_or_hide (name) {
            //切换密码框input的type
            if (name == 'password') {
                if (this.form_ico.see) {
                    this.form.password_type = 'text';
                }else {
                    this.form.password_type = 'password';
                };
                this.form_ico.see = !this.form_ico.see;
                this.form_ico.hide = !this.form_ico.hide;
            }else {
                if (this.form_ico.re_see) {
                    this.form.re_password_type = 'text';
                }else {
                    this.form.re_password_type = 'password';
                };
                this.form_ico.re_see = !this.form_ico.re_see;
                this.form_ico.re_hide = !this.form_ico.re_hide;
            }
        },
        //input获得焦点
        get_focus (name) {
            //当input获得焦点时 如果其值不为空 也要显示清除图标
            if (this.form[name]) {
                this.form_ico[name] = true;
            };
        },
        //input输入数据 显示清除图标
        input_data (name) {
            this.form_ico[name] = true;
            //密码框额外处理 显示隐藏/查看图标
            if (name == 'password') {
                this.form_ico.see = true;
                this.form_ico.hide = false;
            }else if (name == 're_password') {
                this.form_ico.re_see = true;
                this.form_ico.re_hide = false;
            };
        },
        //限制某些input的输入数据格式 设置type为number 在IOS端无效 设置为tel 在PC端无效 所以只能用js限制
        limit_input (name) {
            if (name == 'account' && this.form[name]) {
                //限制手机号码只能纯数字
                this.form[name] = this.form[name].replace(/[^\d]/g, '');
            }else if(name == 'verify_code' && this.form[name]) {
                //限制验证码不能输入中文
                this.form[name] = this.form[name].replace(/[\u4e00-\u9fa5]/ig, '');
            };
        },
        //清空input的操作
        clear_input (name) {
            this.form[name] = '';
            this.form_ico[name] = false;
            switch (name) {
                case 'account':
                    this.verify_error('account', '请输入手机号码！');
                    break;
                case 'password':
                    this.verify_error('password', '请输入密码！');
                    break;
                case 'password':
                    this.verify_error('re_password', '请再次输入密码！');
                    break;
                case 'verify_code':
                    this.verify_error('verify_code', '请输入验证码！');
                    break;
            };
        },
        //失去焦点时 验证input值
        verify_input (name) {
            switch (name) {
                case 'account':
                    //正则验证
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
                    if (!this.form.verify_code) {
                        this.verify_error('verify_code', '请输入验证码！');
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
            //判断是否还在计时
            if (this.limit_get.is_disabled) {
                this.is_dialog('请勿频繁获取！');
                return false;
            };
            //判断是否填入了正确的手机号码
            if (!this.form_RE.phone.test(account)) {
                this.is_dialog('请输入正确格式的手机号码！')
                this.verify_error('account', '请输入正确格式的手机号码！')
            }else {
                //储存手机号码 刷新后检测到有的话 则自动填入 更人性化
                localStorage.setItem('account', account);
                //禁止频繁获取
                if (!this.limit_get.is_disabled) {
                    //定时器
                    this.limit_get.is_disabled = true;
                    //即刻改变 避免有延迟
                    this.limit_get.text = '重新获取(' + this.limit_get.init_sec + 's)';
                    this.limit_get.timer = setInterval( function () {
                        if (that.limit_get.sec <= 0) {
                            //计时结束
                            that.limit_get.text = '获取验证码';
                            that.limit_get.is_disabled = false;
                            //初始化秒数
                            that.limit_get.sec = that.limit_get.init_sec;
                            //清除定时器 并且删掉存储的localStorage
                            clearInterval(that.limit_get.timer);
                            that.limit_get.timer = null;
                            localStorage.removeItem('limit_get');
                        }else {
                            that.limit_get.sec--;
                            that.limit_get.text = '重新获取(' + that.limit_get.sec + 's)';
                            //储存定时器数据 以防页面刷新丢失
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
                        //jq ajax参数API可查看文档 http://www.w3school.com.cn/jquery/ajax_ajax.asp;
                        //不设定这个参数为false 则jq会以Form Data数据类型发送给后端 可能会导致后端无法识别
                        contentType: false,
                        // processData: false,
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
        //注册
        register (name) {
            //如果上次请求还未完成(在转圈圈) 则不允许继续点击
            if (this.form.is_circle) {
                this.is_dialog('请勿频繁点击！');
                return false;
            };
            //用户按了回车键直接注册的 会跳过失去焦点的正则检验 所以要回去检验一遍
            if (name) {
                this.verify_input(name);
            };
            var that = this;
            var account = this.form.account;
            var password = this.form.password;
            var re_password = this.form.re_password;
            //验证input值是否有空值
            var is_empty = !account || !password || !re_password || !this.form.verify_code;
            //都不为空值的情况下 继续验证input值是否都符合正则
            var is_RE = is_empty || this.verify_warn.account.is_open || this.verify_warn.password.is_open || this.verify_warn.re_password.is_open || this.verify_warn.verify_code.is_open;
            if (!is_RE) {
                //转圈圈 禁止再继续点击注册
                this.form.is_circle = true;
                //md5加密规定的字符串
                var time = new Date().getTime();
                var sign = 'phoneSign201903' + account + 'H5LOGIN' + time + 'phoneSign201903';
                //默认16位加密 可自行修改
                var sign_md5 = sign.MD5(32);
                var password_md5 = password.MD5(32);
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
                $.ajax({
                    type: "POST",
                    //jq ajax参数API可查看文档 http://www.w3school.com.cn/jquery/ajax_ajax.asp;
                    //不设定这个参数为false 则jq会以Form Data数据类型发送给后端 可能会导致后端无法识别
                    contentType: false,
                    // processData: false,
                    url: "https://api.technologyle.com/hthapi.php",
                    dataType : "json",
                    data: JSON.stringify(register_para),
                    success: function (response) {
                        console.log(response);
                        if (response.code == 0) {
                            that.is_dialog("注册成功！请前往登录！");
                            that.form.is_circle = false;
                            setTimeout(function () {
                                window.location.href = './login.html';
                            }, 2000);
                        }else {
                            that.form.is_circle = false;
                            that.is_dialog(response.start);
                        };
                    }
                });
            }else {
                this.is_dialog("请完善注册信息！");
            };
        },
        //返回上一页
        go_back () {
            window.history.go(-1);
        },
    },
    mounted () {
        var that = this;
        //截取url里的邀请码
        var url = location.href;
        //一般为6位数
        this.form.invi_code = url.substring(url.indexOf('first_leader=') + 13, url.indexOf('first_leader=') + 19) || null;
        //检查是否有存储的手机号码
        this.form.account = localStorage.getItem('account') ? localStorage.getItem('account') : null;
        //检查是否有存储的定时器
        var store_limit_get = localStorage.getItem('limit_get') || null;
        //获取剩余的秒数
        var remain_sec = store_limit_get ? JSON.parse(store_limit_get).sec : 0;
        if ( store_limit_get && remain_sec > 0) {
            this.limit_get.sec = remain_sec;
            this.limit_get.is_disabled = true;
            //减掉1秒是为了看起来不突兀 否则刷新后的一开始需要等待2秒才会计时
            this.limit_get.text = '重新获取(' + (this.limit_get.sec - 1) + 's)';
            this.limit_get.timer = setInterval( function () {
                if (that.limit_get.sec <= 0) {
                    //计时结束
                    that.limit_get.text = '获取验证码';
                    that.limit_get.is_disabled = false;
                    //把定时器的秒数初始化
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