<template>
<div class="login_component">
    <form class="form flex_center">
        <!-- 账号/手机号 -->
        <div class="input flex_center">
            <div class="left flex_center">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-denglu"></use>
                </svg>
            </div>
            <div class="middle full">
                <input class="full" type="tel" placeholder="请输入账号/手机号" v-model='form.account' @blur='verify_input("account")' @keyup='input_data("account")' @focus='get_focus("account")' @input='limit_input("account")'>
                <svg class="icon" aria-hidden="true" v-if='form_ico.account' @click='clear_input("account")'>
                    <use xlink:href="#icon-chahao"></use>
                </svg>
            </div>
        </div>
        <transition name="fade"><p class='verify_warn' v-if='verify_warn.account.is_open'><span>{{ verify_warn.account.text }}</span></p></transition>

        <!-- 密码 -->
        <div class="input flex_center" v-if='!(this.send_data.type == "find" && this.send_data.is_verify_code)'>
            <div class="left flex_center">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mima"></use>
                </svg>
            </div>
            <div class="middle full">
                <input class="full" :type="form.password_type" placeholder="请输入密码" v-model='form.password' @blur='verify_input("password")' @keyup='input_data("password")' @focus='get_focus("password")' @input='limit_input("password")' @keyup.enter="login('password')">
                <svg class="icon icon02" aria-hidden="true" v-if='form_ico.password' @click='see_or_hide("password")'>
                    <use v-if='form_ico.see' xlink:href="#icon-yincang"></use>
                    <use v-if='form_ico.hide' xlink:href="#icon-yincang1"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-if='form_ico.password_clear' @click='clear_input("password")'>
                    <use xlink:href="#icon-chahao"></use>
                </svg>
            </div>
        </div>
        <transition name="fade"><p class='verify_warn' v-if='verify_warn.password.is_open'><span>{{ verify_warn.password.text }}</span></p></transition>

        <!-- 再次输入密码 -->
        <div class="input flex_center" v-if='send_data.type == "register"'>
            <div class="left flex_center">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zaicishurumima"></use>
                </svg>
            </div>
            <div class="middle full">
                <input class="full" :type="form.re_password_type" placeholder="请再次输入密码" v-model='form.re_password' @blur='verify_input("re_password")' @keyup='input_data("re_password")' @focus='get_focus("re_password")' @input='limit_input("re_password")'>
                <svg class="icon icon02" aria-hidden="true" v-if='form_ico.re_password' @click='see_or_hide("re_password")'>
                    <use v-if='form_ico.re_see' xlink:href="#icon-yincang"></use>
                    <use v-if='form_ico.re_hide' xlink:href="#icon-yincang1"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-if='form_ico.re_password_clear' @click='clear_input("re_password")'>
                    <use xlink:href="#icon-chahao"></use>
                </svg>
            </div>
        </div>
        <transition name="fade"><p class='verify_warn' v-if='verify_warn.re_password.is_open'><span>{{ verify_warn.re_password.text }}</span></p></transition>

        <!-- 输入新密码 -->
        <div class="input flex_center" v-if='send_data.type == "find"'>
            <div class="left flex_center">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mima"></use>
                </svg>
            </div>
            <div class="middle full">
                <input class="full" :type="form.new_password_type" placeholder="请输入新密码" v-model='form.new_password' @blur='verify_input("new_password")' @keyup='input_data("new_password")' @focus='get_focus("new_password")' @input='limit_input("new_password")' @keyup.enter="find('new_password')">
                <svg class="icon icon02" aria-hidden="true" v-if='form_ico.new_password' @click='see_or_hide("new_password")'>
                    <use v-if='form_ico.new_see' xlink:href="#icon-yincang"></use>
                    <use v-if='form_ico.new_hide' xlink:href="#icon-yincang1"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-if='form_ico.new_password_clear' @click='clear_input("new_password")'>
                    <use xlink:href="#icon-chahao"></use>
                </svg>
            </div>
        </div>
        <transition name="fade"><p class='verify_warn' v-if='verify_warn.new_password.is_open'><span>{{ verify_warn.new_password.text }}</span></p></transition>

        <!-- 手机验证码 -->
        <div class="input flex_center" v-if='send_data.type == "register" || (send_data.type == "find" && send_data.is_verify_code)'>
            <div class="left flex_center">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shouji"></use>
                </svg>
            </div>
            <div class="middle full">
                <input class="full" type="text" placeholder="请输入验证码" v-model='form.verify_code' @blur='verify_input("verify_code")' @keyup='input_data("verify_code")' @focus='get_focus("verify_code")' @input='limit_input("verify_code")' @keyup.enter="register('verify_code')">
                <svg class="icon" aria-hidden="true" v-if='form_ico.verify_code' @click='clear_input("verify_code")'>
                    <use xlink:href="#icon-chahao"></use>
                </svg>
            </div>
            <div class="right flex_center" :class='{disabled: limit_get.is_disabled}'>
                <span @click='get_code'>{{ limit_get.text }}</span>
            </div>
        </div>
        <transition name="fade"><p class='verify_warn' v-if='verify_warn.verify_code.is_open'><span>{{ verify_warn.verify_code.text }}</span></p></transition>

        <!-- 邀请码 -->
        <div class="input flex_center" v-if='send_data.type == "register" && send_data.is_invi'>
            <div class="left flex_center">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yaoqing"></use>
                </svg>
            </div>
            <div class="middle full">
                <input class="full disabled" type="text" v-model='form.invi_code' disabled='disabled'>
            </div>
        </div>

        <!-- 图形验证码 -->
        <div class="input flex_center" v-if='send_data.type == "login" && form.login_error > 2'>
            <div class="left flex_center">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yanzhengyanzhengma"></use>
                </svg>
            </div>
            <div class="middle full">
                <input class="full" type="text" placeholder="请输入验证码" v-model='form.img_code' @blur='verify_input("img_code")' @keyup='input_data("img_code")' @focus='get_focus("img_code")' @input='limit_input("img_code")' @keyup.enter="login('img_code')">
                <svg class="icon" aria-hidden="true" v-if='form_ico.img_code' @click='clear_input("img_code")'>
                    <use xlink:href="#icon-chahao"></use>
                </svg>
            </div>
            <div class="right flex_center">
                <img :src="form.img_code_src" alt="code">
            </div>
        </div>
        <transition name="fade"><p class='verify_warn' v-if='verify_warn.img_code.is_open'><span>{{ verify_warn.img_code.text }}</span></p></transition>

        <div class="agreement" v-if='send_data.type == "register"'>
            <p>点击注册即代表同意<a href="https://shop.technologyle.com/userReg/register_agreement.html" target="_blank">《用户协议》</a></p>
        </div>

        <div class="btn flex_center" @click='login' v-if='send_data.type == "login"'>
            <img src="@/common/imgs/wait.gif" alt="wait" v-if='form.is_circle'>
            <input type="button" value="登录" :class="{is_circle: form.is_circle}">
        </div>

        <div class="btn flex_center" @click='register' v-if='send_data.type == "register"'>
            <img src="@/common/imgs/wait.gif" alt="wait" v-if='form.is_circle'>
            <input type="button" value="注册" :class="{is_circle: form.is_circle}">
        </div>

        <div class="btn flex_center" @click='find' v-if='send_data.type == "find"'>
            <img src="@/common/imgs/wait.gif" alt="wait" v-if='form.is_circle'>
            <input type="button" value="确认修改" :class="{is_circle: form.is_circle}">
        </div>

        <div class="back" @click='go_back' v-if='send_data.type != "login"'>
            <!-- 在表单内的button 如果不声明type="button" 则有些浏览器会默认type="submit" 按回车键会直接刷新提交 -->
            <button type="button">返回</button>
        </div>
        
        <div class="bottom_info flex_between" v-if='send_data.type == "login"'>
            <router-link to='/find'>忘记密码?</router-link>
            <router-link to='/register'>注册账号</router-link>
        </div>

    </form>

    <transition name='fade'>
        <dialog_component :dialog='dialog' @off_dialog='off_dialog' />
    </transition>
</div>
</template>

<script>
import dialog_component from './dialog.vue';

export default {
    name: 'login_component',
    components: {
        dialog_component
    },
    props: [
        //判断需要加载那些input框
        'send_data'
    ],
    data () {
        return {
            //弹框相关
            dialog: {
                is_open: false,
                msg: null,
                type: 0
            },
            //表单数据
            form: {
                account: null,
                password: null,
                //初始密码框input类型
                password_type: 'password',
                re_password: null,
                re_password_type: 'password',
                new_password: null,
                new_password_type: 'password',
                //登录失败次数过多 则显示验证码input
                login_error: 0,
                //图形验证码
                img_code: '',
                //图形验证码的src值
                img_code_src: '',
                //手机验证码
                verify_code: null,
                //点击登录转圈圈 禁止频繁点击
                is_circle: null,
            },
            //表单正则
            form_RE: {
                phone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
                email: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
                password: /^[\w]{6,16}$/,
                verify_code: /^\d{6}$/
            },
            //表单输入数据 显示图标
            form_ico: {
                account: null,
                password: null,
                //密码框有2个图标 一个查看 一个清除
                see: null,
                hide: null,
                password_clear: null,
                re_password: null,
                re_see: null,
                re_hide: null,
                re_password_clear: null,
                new_password: null,
                new_see: null,
                new_hide: null,
                new_password_clear: null,
                img_code: null,
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
                new_password: {
                    is_open: false,
                    text: null
                },
                img_code: {
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
        //返回上一页
        go_back () {
            this.$router.go(-1);
        },
        //接收子组件事件 关闭dialog弹框
        off_dialog () {
            this.dialog.is_open = false;
        },
        //打开dialog弹框
        is_dialog (info) {
            //打开遮罩
            this.dialog.is_open = true;
            this.dialog.msg = info;
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
            }else if (name == 're_password'){
                if (this.form_ico.re_see) {
                    this.form.re_password_type = 'text';
                }else {
                    this.form.re_password_type = 'password';
                };
                this.form_ico.re_see = !this.form_ico.re_see;
                this.form_ico.re_hide = !this.form_ico.re_hide;
            }else if (name == 'new_password') {
                if (this.form_ico.new_see) {
                    this.form.new_password_type = 'text';
                }else {
                    this.form.new_password_type = 'password';
                };
                this.form_ico.new_see = !this.form_ico.new_see;
                this.form_ico.new_hide = !this.form_ico.new_hide;
            };
        },
        //input获得焦点
        get_focus (name) {
            //当input获得焦点时 如果有值 则要显示清除图标
            if (this.form[name]) {
                this.form_ico[name] = true;
                //密码框额外处理
                if (name == 'password') {
                    this.form_ico.password_clear = true;
                    this.form_ico.see = this.form_ico.see ? this.form_ico.see : !this.form_ico.hide;
                    this.form_ico.hide = this.form_ico.hide ? this.form_ico.hide : !this.form_ico.see;
                }else if (name == 're_password') {
                    this.form_ico.re_password_clear = true;
                    this.form_ico.re_see = this.form_ico.re_see ? this.form_ico.re_see : !this.form_ico.re_hide;
                    this.form_ico.re_hide = this.form_ico.re_hide ? this.form_ico.re_hide : !this.form_ico.re_see;
                }else if (name == 'new_password') {
                    this.form_ico.new_password_clear = true;
                    this.form_ico.new_see = this.form_ico.new_see ? this.form_ico.new_see : !this.form_ico.new_hide;
                    this.form_ico.new_hide = this.form_ico.new_hide ? this.form_ico.new_hide : !this.form_ico.new_see;
                };
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
            }else if (name == 're_password') {
                this.form_ico.re_password_clear = true;
                this.form_ico.re_see = this.form_ico.re_see ? this.form_ico.re_see : !this.form_ico.re_hide;
                this.form_ico.re_hide = this.form_ico.re_hide ? this.form_ico.re_hide : !this.form_ico.re_see;
            }else if (name == 'new_password') {
                this.form_ico.new_password_clear = true;
                this.form_ico.new_see = this.form_ico.new_see ? this.form_ico.new_see : !this.form_ico.new_hide;
                this.form_ico.new_hide = this.form_ico.new_hide ? this.form_ico.new_hide : !this.form_ico.new_see;
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
        //验证失败的提示操作
        verify_error (which, text) {
            //打开提示段落
            this.verify_warn[which].is_open = true;
            this.verify_warn[which].text = text;
        },
        //清空input的操作
        clear_input (name) {
            this.form[name] = null;
            //隐藏密码查看图标
            if (name == 'password' || name == 're_password' || name == 'new_password' ) {
                this.form_ico[name] = false;
            };
            switch (name) {
                case 'account':
                    this.verify_error('account', '请输入账号/手机号码！');
                    break;
                case 'password':
                    this.verify_error('password', '请输入密码！');
                    break;
                case 're_password':
                    this.verify_error('re_password', '请再次输入密码！');
                    break;
                case 'new_password':
                    this.verify_error('new_password', '请输入新密码！');
                    break;
                case 'img_code':
                    this.verify_error('img_code', '请输入验证码！');
                    break;
                case 'verify_code':
                    this.verify_error('verify_code', '请输入验证码！');
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
                    //密码框额外处理 隐藏 隐藏/查看图标
                    if (!this.form_RE.password.test(this.form.password)) {
                        this.verify_error('password', '请输入6-16位数字与字母组成的密码！');
                    }else if (this.send_data.type == 'find' && this.form.password == this.form.new_password){
                        this.verify_error('password', '新密码不能与原密码一致！');
                    }else {
                        this.verify_warn.password.is_open = false;
                    };
                    setTimeout(function () {
                        that.form_ico.password_clear = false;
                    }, 200);
                    break;
                case 're_password':
                    if (!this.form.re_password) {
                        this.verify_error('re_password', '请再次输入密码！');
                    }else if (this.send_data.type == 'register' && this.form.re_password !== this.form.password) {
                        this.verify_error('re_password', '两次输入的密码不一致！');
                    }else {
                        this.verify_warn.re_password.is_open = false;
                    };
                    setTimeout(function () {
                        that.form_ico.re_password_clear = false;
                    }, 200);
                    break;
                case 'new_password':
                    if (!this.form_RE.password.test(this.form.new_password)) {
                        this.verify_error('new_password', '请输入6-16位数字与字母组成的新密码！');
                    }else if (this.send_data.type == 'find' && this.form.new_password == this.form.password){
                        this.verify_error('new_password', '新密码不能与原密码一致！');
                    }else {
                        this.verify_warn.new_password.is_open = false;
                    };
                    setTimeout(function () {
                        that.form_ico.new_password_clear = false;
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
                case 'verify_code':
                    if (!this.form.verify_code) {
                        this.verify_error('verify_code', '请输入验证码！');
                    }else {
                        this.verify_warn.verify_code.is_open = false;
                    };
                    setTimeout(function () {
                        that.form_ico.verify_code = false;
                    }, 200);
                    break;
            };
        },
        //获取图形验证码
        get_img_code () {
            var that = this;
            var account = this.form.account;
            //md5加密规定的字符串
            var time = new Date().getTime();
            var sign = 'accountSign201903' + account + 'H5LOGIN' + time + 'accountSign201903';
            //默认16位加密 可修改为32位
            var sign_md5 = this.$md5(sign, 32);
            //获取图形验证码需要的参数
            var code_para = {
                mobile: account,
                type: 'H5LOGIN',
                time: time,
                sign: sign_md5
            };
            this.$axios.post("https://mall.xr-network.com/api/sms/sms.php", code_para,
                ).then( function (response) {
                    console.log(response);
                }).catch( function (error) {
                    that.is_dialog(error);
            },"json");
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
                    var sign_md5 = this.$md5(sign, 32);
                    //获取验证码需要的参数
                    var code_para = {
                        mobile: account,
                        type: 'H5LOGIN',
                        time: time,
                        sign: sign_md5
                    };
                    this.$axios.post("https://mall.xr-network.com/api/sms/sms.php", code_para,
                        ).then( function (response) {
                            console.log(response);
                        }).catch( function (error) {
                            that.is_dialog(error);
                    },"json");
                }else {
                    this.is_dialog('请勿频繁获取！');
                };
                
            };
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
                var sign_md5 = this.$md5(sign, 32);
                var password_md5 = this.$md5(password, 32);
                var login_para = {
                    mobile: account,
                    type: 'H5LOGIN',
                    time: time,
                    sign: sign_md5,
                    password: password_md5,
                    codes: error_num > 2 ? this.form.img_code : '',
                };
                this.$axios.post("https://mall.xr-network.com/api/sms/sms.php", login_para,
                    ).then( function (response) {
                        console.log(response);
                        var response = that.is_JSON(response.data);
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
                                that.get_img_code();
                            };
                        };
                    }).catch( function (error) {
                        that.is_dialog(error);
                },"json");
            }else {
                this.is_dialog("请完善登录信息！");
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
                var sign_md5 = this.$md5(sign, 32);
                var password_md5 = this.$md5(password, 32);
                var register_para = {
                    mobile: account,
                    type: 'H5LOGIN',
                    time: time,
                    sign: sign_md5,
                    password: password_md5,
                    codes: this.form.verify_code,
                    invited: this.form.invi_code,
                };
                this.$axios.post("https://mall.xr-network.com/api/sms/sms.php", register_para,
                    ).then( function (response) {
                        console.log(response);
                        if (response.code == 0) {
                            that.is_dialog("注册成功！请前往登录！");
                            that.form.is_circle = false;
                            setTimeout(function () {
                                that.$router.push('/login');
                            }, 2000);
                        }else {
                            that.form.is_circle = false;
                            that.is_dialog(response.start);
                        };
                    }).catch( function (error) {
                        that.is_dialog(error);
                },"json");
            }else {
                this.is_dialog("请完善注册信息！");
            };
        },
        //找回密码
        find (name) {
            //如果上次请求还未完成(在转圈圈) 则不允许继续点击
            if (this.form.is_circle) {
                this.is_dialog('请勿频繁点击！');
                return false;
            };
            //用户按了回车键直接找回的 会跳过失去焦点的正则检验 所以要回去检验一遍
            if (name) {
                this.verify_input(name);
            };
            var that = this;
            var account = this.form.account;
            var password = this.form.password;
            var new_password = this.form.new_password;
            //如果只需要验证码不需要输入原密码
            if (this.send_data.is_verify_code) {
                //验证input值是否有空值
                var is_empty = !account || !new_password || !this.form.verify_code;
                //都不为空值的情况下 继续验证input值是否都符合正则
                var is_RE = is_empty || this.verify_warn.account.is_open || this.verify_warn.new_password.is_open || this.verify_warn.verify_code.is_open;
            }else {
                var is_empty = !account || !password || !new_password;
                //都不为空值的情况下 继续验证input值是否都符合正则
                var is_RE = is_empty || this.verify_warn.account.is_open || this.verify_warn.password.is_open || this.verify_warn.new_password.is_open;
            };
            if (!is_RE) {
                //转圈圈 禁止再继续点击找回
                this.form.is_circle = true;
                //md5加密规定的字符串
                var time = new Date().getTime();
                var sign = 'phoneSign201903' + account + 'H5LOGIN' + time + 'phoneSign201903';
                //默认16位加密 可自行修改
                var sign_md5 = this.$md5(sign, 32);
                var password_md5 = this.$md5(new_password, 32);
                console.log('MD5(32位):', sign_md5);
                var find_para = {
                    mobile: account,
                    type: 'H5LOGIN',
                    time: time,
                    sign: sign_md5,
                    password: password_md5,
                    codes: this.form.verify_code
                };
                this.$axios.post("https://mall.xr-network.com/api/sms/sms.php", find_para,
                    ).then( function (response) {
                        console.log(response);
                        if (response.code == 0) {
                            that.is_dialog("找回密码成功！请前往登录！");
                            that.form.is_circle = false;
                            setTimeout(function () {
                                that.$router.push('/login');
                            }, 2000);
                        }else {
                            that.form.is_circle = false;
                            that.is_dialog(response.start);
                        };
                    }).catch( function (error) {
                        that.is_dialog(error);
                },"json");
            }else {
                this.is_dialog("请完善信息！");
            };
        },
    },
    mounted () {
        var that = this;
        //修改body背景色
        document.getElementsByTagName('body')[0].style.backgroundColor = '#2d3a4b';
        //检查登录失败的次数
        this.form.login_error = localStorage.getItem('login_error') ? parseInt(localStorage.getItem('login_error')) : 0;
        if (this.send_data.type == 'login' && this.form.login_error > 2) {
            //获取图形验证码
            this.get_img_code();
        };
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
}
</script>

<style lang='scss' scoped>
    .form {
        padding-top: 25px;
        flex-direction: column;
    }
    .form .icon {
        width: 1.5rem;
        height: 1.5rem;
        color: #fff;
    }
    .form .input {
        width: 80%;
        height: 43px;
        margin-bottom: 15px;
        justify-content: unset;
        border-bottom: 1px solid #999;
    }
    .form .left {
        margin-right: 15px;
        padding: 0 8px 0 5px;
        border-right: 1px solid #999;
    }
    .form .middle {
        position: relative;
    }
    .form .middle .icon {
        right: 8px;
        top: 50%;
        color: #ddd;
        width: 0.8rem;
        height: 0.8rem;
        position: absolute;
        transform: translate(-50%,-50%);
    }
    .form .middle .icon02 {
        width: 1.1rem;
        height: 1.1rem;
        right: 30px;
    }
    .form .right {
        height: 100%;
        width: 155px;
        color: #409eff;
        font-size: 0.95rem;
        position: relative;
        white-space: nowrap;
    }
    .form .right.disabled {
        color: #999;
    }
    .form .right span {
        margin: -3px 0 0 0;
    }
    .form .right img {
        right: 0;
        bottom: 0;
        width: 80px;
        height: 85%;
        position: absolute;
    }
    .form .verify_warn {
        width: 80%;
        color: #ff0000;
        font-size: 0.8rem;
        margin: -12px 0 0 0;
        white-space: nowrap;
    }
    .form .verify_warn span {
        padding-left: 53px;
    }
    .form .btn {
        width: 80%;
        height: 50px;
        margin-top: 20px;
        border-radius: 8px;
        background-color: #409EFF;
    }
    .form .btn .icon {
        width: 1.3rem;
        height: 1.3rem;
    }
    .form .btn img {
        width: 16px;
        margin-top: 3px;
        margin-right: 8px;
    }
    .form .btn input[type='submit'] {
        margin-left: 10px;
        letter-spacing: 3px;
    }
    .form .btn .is_circle {
        color: rgba(255, 255, 255, 0.5);
    }
    .form .bottom_info {
        width: 80%;
        margin: 10px 10%;
        font-size: 0.95rem;
    }
    .form .bottom_info a {
        outline: none;
        color: #409EFF;
    }
    .form .bottom_info a:hover {
        color: #fff;
    }
    
    .form .agreement {
        margin-top: 15px;
        margin-bottom: -15px;
        color: #fff;
        font-size: 0.9rem;
    }
    .form .agreement a {
        color: #409EFF;
    }
    
    .back {
        width: 80%;
        margin-top: 15px;
    }
    .back button {
        width: 100%;
        height: 50px;
        font-size: 1rem;
        color: #409EFF;
        border: 1px solid #409EFF;
        background-color: transparent;
    }
    @media screen and (min-width: 769px) {
        .form .input, .form .verify_warn, .back, .form .bottom_info, .form .btn {
            width: 370px;
        }
    }
</style>