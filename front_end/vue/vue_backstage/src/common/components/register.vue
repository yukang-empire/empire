<template>
    <div class="register form flex_center">
        <el-input
            clearable
            placeholder="请输入账号"
            type='number'
            @blur='blur_verify("phone")'
            @clear='clear_input("phone")'
            v-model="form_data.phone">
            <svg slot="prefix" class="icon password" aria-hidden="true">
                <use xlink:href="#icon-shouji"></use>
            </svg>
        </el-input>
        <transition name="fade"><p class='verify_tip' v-if='tip.phone.is_open'><span>{{ tip.phone.text }}</span></p></transition>
        <el-input
            clearable
            show-password
            placeholder="请输入密码"
            @blur='blur_verify("password")'
            @clear='clear_input("password")'
            v-model="form_data.password">
            <svg slot="prefix" class="icon" aria-hidden="true">
                <use xlink:href="#icon-mima"></use>
            </svg>
        </el-input>
        <transition name="fade"><p class='verify_tip' v-if='tip.password.is_open'><span>{{ tip.password.text }}</span></p></transition>
        <el-input
            clearable
            show-password
            placeholder="请再次输入密码"
            @blur='blur_verify("re_password")'
            @clear='clear_input("re_password")'
            v-model="form_data.re_password"
            v-if='is_register'
            >
            <svg slot="prefix" class="icon" aria-hidden="true">
                <use xlink:href="#icon-zaicishurumima"></use>
            </svg>
        </el-input>
        <transition name="fade"><p class='verify_tip' v-if='tip.re_password.is_open'><span>{{ tip.re_password.text }}</span></p></transition>
        <div class="verify">
            <el-input
                placeholder="请输入验证码"
                type='number'
                @blur='blur_verify("verify_code")'
                @clear='clear_input("verify_code")'
                v-model="form_data.verify_code">
                <svg slot="prefix" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yanzhengyanzhengma"></use>
                </svg>
            </el-input>
            <transition name="fade"><p class='verify_tip' v-if='tip.verify_code.is_open'><span>{{ tip.verify_code.text }}</span></p></transition>
            <span v-if='is_register' class="get_code" :class="{'disabled': !limit_get.is_disabled}" @click='get_code'>{{ limit_get.text }}</span>
        </div>
        <el-button type="success" :loading="form_data.login" @click='login'>登录</el-button>

    </div>
</template>

<script lang="ts">
    //必须先引入全局组件
    import { Component, Vue, Prop } from "vue-property-decorator";

    //typescript装饰器语法 要引入的组件
    @Component({
        components: {
            
        }
    })

    export default class register extends Vue {
        @Prop() private is_register !: any;

        //弹框信息
        private dialog: any = {
            is_open: false,
            msg: ''
        };
        //表单数据
        private form_data: any = {
            phone: '',
            password: '',
            re_password: '',
            verify_code: '',
            login: false
        };
        //表单正则
        private rules_RE: any = {
            phone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            password: /^[\w]{6,16}$/,
            verify_code: /^\d{6}$/
        };
        //验证错误时的提示
        private tip: any = {
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
        };
        //限制频繁获取验证码
        private limit_get: any = {
            sec: 60,
            set_sec: 60,
            timer: null,
            text: '获取验证码',
            is_disabled: true
        };


        //错误时的操作
            //typescript中 如果函数参数不声明类型 编译时就会报错
        if_error (error: any) {
            //打开遮罩
            this.dialog.is_open = true;
            this.dialog.msg = error;
        };
        //验证失败的提示操作
        open_tip (which: any, text: any) {
            //打开提示段落
            this.tip[which].is_open = true;
            this.tip[which].text = text;
        };
        //清除input
        clear_input (name: any) {
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
        };
        //验证input值
        blur_verify (name: any) {
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
        };
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
                    // sign_md5 = sign.MD5(32);
                    // console.log('MD5(32位):', sign_md5);
                    //获取验证码需要的参数
                    let code_para = {
                        mobile: phone,
                        type: 'H5LOGIN',
                        time: time,
                        // sign: sign_md5
                    }
                    // this.axios.post("https://mall.xr-network.com/api/sms/sms.php", code_para, 
                    //     // 设定请求头
                    //     // {headers: 
                    //     // 	{
                    //     // 	'X-Requested-With': 'XMLHttpRequest',
                    //     // 	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    //     // 	}
                    //     // }
                    //     ).then( (response) => {
                    //         // var res = this.is_JSON(response.data);
                    //         // console.log(res);
                    //     }).catch( (error) => {
                    //         this.if_error(error);
                    // },"json");
                }else {
                    this.if_error('请勿频繁获取！');
                }
                
            };
        };
        //登录
        login () {
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
        };


        mounted() {
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
        };
    }
</script>