
new Vue({
    el:'#app',
    data: {
        //要显示的组件
        modules: {
            is_tip: false,
            is_form: true,
        },
        //弹框信息
        dialog: {
            is_open: false,
            msg: ''
        },
        //表单数据
        form_data: {
            phone: '',
            password: '',
            re_password: '',
            verify_code: '',
            invi_code: '',
            login: false
        },
        //表单正则
        rules_RE: {
            phone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[189])\d{8}$/,
            password: /^[\w]{6,12}$/,
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
		is_code_disabled: false
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
        //清空input的操作
        clear_input (name) {
            switch (name) {
                case 'phone':
                    this.open_tip('phone', '请输入正确格式的手机号码！');
                    break;
                case 'password':
                    this.open_tip('password', '请输入6-12位由数字与字母组成的密码！');
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
                        this.open_tip('password', '请输入6-12位由数字与字母组成的密码！');
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
            var that = this;
            var phone = this.form_data.phone;
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
                    this.limit_get.timer = setInterval( function () {
                        if (that.limit_get.sec <= 0) {
                            that.limit_get.text = '获取验证码';
                            that.limit_get.is_disabled = true;
                            //回到设定的初始秒数
                            that.limit_get.sec = that.limit_get.set_sec;
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
                    var sign = 'phoneSign201903' + phone + 'H5LOGIN' + time + 'phoneSign201903';
                    console.log("sign:", sign);
                    //默认16位加密 可自行修改
                    sign_md5 = sign.MD5(32);
                    console.log('MD5(32位):', sign_md5);
                    //获取验证码需要的参数
                    var code_para = {
                        mobile: phone,
                        type: 'H5LOGIN',
                        time: time,
                        sign: sign_md5
                    };
                    $.ajax({
                        type: "POST",
                        contentType: false,
                        processData: false,
                        url: "https://api.technologyle.com/sms/sms.php",
                        dataType : "json",
                        data: JSON.stringify(code_para),
                        success: function (response) {
                            console.log(response);
                        }
                    });
                    // axios.post("https://api.technologyle.com/sms/sms.php", code_para, 
                    //     // 设定请求头
                    //     // {headers: 
                    //     // 	{
                    //     // 	'X-Requested-With': 'XMLHttpRequest',
                    //     // 	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    //     // 	}
                    //     // }
                    //     ).then( function (response) {
                    //         var res = that.is_JSON(response.data);
                    //         console.log(res);
                    //     }).catch( function (error) {
                    //         that.if_error(error);
                    // },"json");
                }else {
                    this.if_error('请勿频繁获取！');
                }
                
            };
        },
        //注册
        register () {
            var that = this;
            var phone = this.form_data.phone;
            //验证input值是否有空值
            var is_empty = !this.form_data.phone || !this.form_data.password || !this.form_data.verify_code;
            //验证input值是否都符合正则
            var is_register = is_empty || this.tip.phone.is_open || this.tip.password.is_open || this.tip.verify_code.is_open;
             //md5加密规定的字符串
             var time = new Date().getTime();
             var sign = 'phoneSign201903' + phone + 'H5LOGIN' + time + 'phoneSign201903';
             var password = this.form_data.password;
             console.log("sign:", sign);
             //默认16位加密 可自行修改
             sign_md5 = sign.MD5(32);
             password_md5 = password.MD5(32);
             console.log('MD5(32位):', sign_md5);
            var register_para = {
                mobile: phone,
                type: 'H5LOGIN',
                time: time,
                sign: sign_md5,
                codes: this.form_data.verify_code,
                password: password_md5,
                invited: this.form_data.invi_code,
            };
            if (!is_register) {
                //显示转圈圈获取样式
                this.form_data.login = true;
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
                        that.form_data.login = false;
                        if (response.code == 0) {
							that.if_error("注册成功！请前往下载登录！");
							wx.miniProgram.getEnv(function(res) {
								if (res.miniprogram) {
									setTimeout(function () {
										wx.miniProgram.navigateTo({url: '../login/main'});
									}, 1500);
								}else {
									setTimeout(function () {
										window.location.href = 'https://shop.technologyle.com/userReg/invi_download.html?first_leader=' + that.form_data.invi_code;
									}, 1500);
								};
							});
                        }else {
                            that.if_error(response.start);
                        };
                    }
                });
                // axios.post("https://api.technologyle.com/hthapi.php", register_para, 
                //     // 设定请求头
                //     // {headers: 
                //     // 	{
                //     // 	'X-Requested-With': 'XMLHttpRequest',
                //     // 	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                //     // 	}
                //     // }
                //     ).then( function (response) {
                //         console.log(response);
                //         that.form_data.login = false;
                //         if (response.data.code == 0) {
                //             that.if_error("注册成功！请前往下载登录！");
                //             setTimeout(function () {
                //                 window.location.href = 'https://shop.technologyle.com/userReg/invi_download.html?first_leader=' + that.form_data.invi_code;
                //             }, 2000);
                //         }else {
                //             that.if_error(response.data.start);
                //         };
                //     }).catch( function (error) {
                //         that.if_error(error);
                // },"json");
            }else {
                this.if_error("请完善必要的信息！");
            };
        },
        //前往下载
        to_download () {
            window.location.href = 'https://shop.technologyle.com/download';
        }
    },
    mounted: function () {
        var that = this;
        window.onpageshow = function (e) {
            if (e.persisted) {
                window.location.reload(true)
            }
        };
        //截图url里的邀请码
        var url = location.href;
        var invi_code = url.substring(url.indexOf('first_leader=') + 13, url.indexOf('first_leader=') + 19);
        this.form_data.invi_code = invi_code;
		if (invi_code) { this.is_code_disabled = true; };
        //检查是否有存储的定时器
        var store_limit_get = localStorage.getItem('limit_get') || null;
        //获取剩余的秒数
        var remain_sec = store_limit_get ? JSON.parse(store_limit_get).sec : 0;
        if ( store_limit_get && remain_sec > 0) {
            this.limit_get.sec = remain_sec;
            this.limit_get.is_disabled = false;
            this.limit_get.text = '重新获取(' + (this.limit_get.sec - 1) + 's)';
            this.limit_get.timer = setInterval( function () {
                if (that.limit_get.sec <= 0) {
                    that.limit_get.text = '获取验证码';
                    that.limit_get.is_disabled = true;
                    that.limit_get.sec = that.limit_get.set_sec;
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