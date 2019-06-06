
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
            //初始密码框input类型
            password_type: 'password',
            //登录失败次数过多 则显示验证码input
            login_error: 0,
            img_code: null,
            //点击登录转圈圈 禁止频繁点击
            is_circle: null,
            //图形验证码
            img_code: ''
        },
        //表单正则
        form_RE: {
            phone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            email: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
            password: /^[\w]{6,16}$/
        },
        //表单输入数据 显示清除图标
        form_ico: {
            account: null,
            password: null,
            see: null,
            hide: null,
            img_code: null,
            password_clear: null
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
            img_code: {
                is_open: false,
                text: null
            }
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
        see_or_hide () {
            //切换密码框input的type
            if (this.form_ico.see) {
                this.form.password_type = 'text';
            }else {
                this.form.password_type = 'password';
            };
            this.form_ico.see = !this.form_ico.see;
            this.form_ico.hide = !this.form_ico.hide;
        },
        //input获得焦点
        get_focus (name) {
            //当input获得焦点时 如果其值不为空 也要显示清除图标
            if (this.form[name]) {
                this.form_ico[name] = true;
                //密码框额外处理
                if (name == 'password') {
                    this.form_ico.password_clear = true;
                    this.form_ico.see = this.form_ico.see ? this.form_ico.see : !this.form_ico.hide;
                    this.form_ico.hide = this.form_ico.hide ? this.form_ico.hide : !this.form_ico.see;
                }
            };
        },
        //input输入数据 显示清除图标
        input_data (name) {
            this.form_ico[name] = true;
            //密码框额外处理 显示隐藏/查看图标
            if (name == 'password') {
                this.form_ico.password_clear = true;
                this.form_ico.see = this.form_ico.see ? this.form_ico.see : !this.form_ico.hide;
                this.form_ico.hide = this.form_ico.hide ? this.form_ico.hide : !this.form_ico.see;
            };
        },
        //限制某些input的输入数据格式 设置type为number 在IOS端无效 设置为tel 在PC端无效 所以只能用js限制
        limit_input (name) {
            if (this.form[name]) {
                if (name == 'account' && this.form[name]) {
                    //限制手机号码只能纯数字
                    this.form[name] = this.form[name].replace(/[^\d]/g, '');
                }else {
                    //禁止输入中文
                    this.form[name] = this.form[name].replace(/[\u4e00-\u9fa5]/ig, '');
                };
            };
        },
        //清空input的操作
        clear_input (name) {
            this.form[name] = null;
            //隐藏密码查看图标
            if (name == 'password') {
                this.form_ico[name] = false;
            };
            switch (name) {
                case 'account':
                    this.verify_error('account', '请输入账号/手机号码！');
                    break;
                case 'password':
                    this.verify_error('password', '请输入密码！');
                    break;
                case 'img_code':
                    this.verify_error('img_code', '请输入验证码！');
                    break;
            };
        },
        //失去焦点时 验证input值
        verify_input (name) {
            var that = this;
            switch (name) {
                case 'account':
                    //正则验证
                    if (!this.form_RE.phone.test(this.form.account)) {
                        this.verify_error('account', '请输入正确格式的手机号码！');
                    }else {
                        //储存手机号码 刷新后检测到有的话 则自动填入 更人性化
                        localStorage.setItem('account', this.form.account);
                        this.verify_warn.account.is_open = false;
                    };
                    //隐藏图标 不加延时 则会和点击事件冲突 优先执行失去焦点事件
                    setTimeout(function () {
                        that.form_ico.account = false;
                    }, 200);
                    break;
                case 'password':
                    if (!this.form_RE.password.test(this.form.password)) {
                        this.verify_error('password', '请输入6-16位数字与字母组成的密码！');
                    }else {
                        this.verify_warn.password.is_open = false;
                    };
                    setTimeout(function () {
                        that.form_ico.password_clear = false;
                    }, 200);
                    break;
                case 'img_code':
                    if (!this.form.img_code) {
                        this.verify_error('img_code', '请输入验证码！');
                    }else {
                        this.verify_warn.img_code.is_open = false;
                    };
                    setTimeout(function () {
                        that.form_ico.img_code = false;
                    }, 200);
                    break;
            };
        },
        //获取图形验证码
        get_code () {
            var that = this;
            var account = this.form.account;
            //md5加密规定的字符串
            var time = new Date().getTime();
            var sign = 'accountSign201903' + account + 'H5LOGIN' + time + 'accountSign201903';
            //默认16位加密 可修改为32位
            var sign_md5 = sign.MD5(32);
            //获取图形验证码需要的参数
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
                url: "https://api.technologyle.com/hthapi.php",
                dataType : "json",
                data: JSON.stringify(code_para),
                success: function (response) {
                    console.log(response);
                    // that.form.img_code = response.src;
                }
            });
        },
        //登录
        login (name) {
            //如果上次请求还未完成(在转圈圈) 则不允许继续点击
            if (this.form.is_circle) {
                this.is_dialog('请勿频繁点击！');
                return false;
            };
            //用户按了回车键直接登录的 会跳过失去焦点的正则检验 所以要回去检验一遍
            if (name) {
                this.verify_input(name);
            };
            var that = this;
            var account = this.form.account;
            var password = this.form.password;
            var error_num = this.form.login_error;
            //检测是否有验证码input框
            if (error_num > 2) {
                //验证input值是否有空值
                var is_empty = !account || !password || !this.form.img_code;
                //都不为空值的情况下 继续验证input值是否都符合正则
                var is_RE = is_empty || this.verify_warn.account.is_open || this.verify_warn.password.is_open || this.verify_warn.img_code.is_open;
            }else {
                var is_empty = !account || !password;
                var is_RE = is_empty || this.verify_warn.account.is_open || this.verify_warn.password.is_open;
            };
            if (!is_RE) {
                this.form.login_error ++;
                //存储登陆失败次数 以防刷新丢失
                localStorage.setItem('login_error', this.form.login_error);
                //转圈圈 禁止再继续点击登录
                this.form.is_circle = true;
                //md5加密规定的字符串
                var time = new Date().getTime();
                var sign = 'phoneSign201903' + account + 'H5LOGIN' + time + 'phoneSign201903';
                //默认16位加密 可自行修改
                var sign_md5 = sign.MD5(32);
                var password_md5 = password.MD5(32);
                var register_para = {
                    mobile: account,
                    type: 'H5LOGIN',
                    time: time,
                    sign: sign_md5,
                    password: password_md5,
                    codes: error_num > 2 ? this.form.img_code : '',
                };
                $.ajax({
                    type: "POST",
                    //jq ajax参数API可查看文档 http://www.w3school.com.cn/jquery/ajax_ajax.asp;
                    //不设定这个参数为false 则jq会以Form Data数据类型发送给后端 可能会导致后端无法识别
                    contentType: false,
                    // processData: false,
                    url: "https://mall.xr-network.com/api/sms/sms.php",
                    dataType : "json",
                    data: JSON.stringify(register_para),
                    success: function (response) {
                        console.log(response);
                        if (response.code == 0) {
                            that.form.is_circle = false;
                            //登录成功后 删掉错误次数
                            that.form.login_error = 0;
                            localStorage.removeItem('login_error');
                        }else {
                            that.form.is_circle = false;
                            that.is_dialog(response.start);
                            //错误次数过多 获取图形验证码
                            if (that.form.login_error > 2) {
                                that.get_code();
                            };
                        };
                    },
                    error: function (response) {
                        that.is_dialog(response.start);
                    }

                });
            }else {
                this.is_dialog("请完善登录信息！");
            };
        },
    },
    mounted () {
        var that = this;
        //检查登录失败的次数
        this.form.login_error = localStorage.getItem('login_error') ? parseInt(localStorage.getItem('login_error')) : 0;
        if (this.form.login_error > 2) {
            //获取图形验证码
            // this.get_code();
        };
        //检查是否有存储的手机号码
        this.form.account = localStorage.getItem('account') ? localStorage.getItem('account') : null;
        
        var login_para = {
            username: "admin",
            password: "wsad",
            validation: ""
        };
        // $.ajax({
        //     type: "POST",
        //     //jq ajax参数API可查看文档 http://www.w3school.com.cn/jquery/ajax_ajax.asp;
        //     //不设定这个参数为false 则jq会以Form Data数据类型发送给后端 可能会导致后端无法识别
        //     contentType: false,
        //     // processData: false,
        //     url: "https://manage.technologyle.com/api/login",
        //     dataType : "json",
        //     data: JSON.stringify(login_para),
        //     success: function (response) {
        //         console.log(response);
        //     },
        //     error: function (response) {
        //         that.is_dialog(response.start);
        //     }
        // });
        axios.post("https://manage.technologyle.com/api/login", JSON.stringify(login_para),
            ).then( function (response) {
                console.log(response);
            }).catch( function (error) {
                that.is_dialog(error);
        });
    }
})