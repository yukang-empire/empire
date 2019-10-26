
new Vue({
    el:'#app',
    data: {
        domain: 'https://shop.technologyle.com',
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
            width: null,
            wx_tip: null,
        },
        //默认用户信息
        user_info: {
            userName: 'qingku_user',
            userPic: 'imgs/no_pic.png',
            inviCode: 'lsHUX6',
            phone: ''
        },

    },
    methods: {
        
        register () {
            window.location.href = "https://shop.technologyle.com/userReg/register.html?first_leader=" + this.user_info.inviCode;
        },
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
        //邀请下载
        invi_download (device) {
            if (device == 'android') {
                console.log(this.device_rele);
                if (this.device_rele.is_wx) {
                    this.modules.is_tip = true;
                }else if (this.device_rele.is_android){
                    window.location.href = 'https://shop.technologyle.com/public/upload/appfile/qingku-1.0.1.2.apk';
                };
            }else if (device == 'ios') {
                // if (this.device_rele.is_wx) {
                //     this.modules.is_tip = true;
                // }else if (this.device_rele.is_ios){
                //     window.location.href = 'https://shop.technologyle.com/public/upload/appfile/qingku-1.0.1.2.apk';
                // };
                this.if_error('IOS端正在审核中...敬请期待！');
            }
        },
        //复制文字
        copy_text () {
            var that = this;
            var clipboard = new ClipboardJS('.copy');
            //复制成功后的回调
            clipboard.on('success', function(e) {
                that.modules.is_copy_tip = true;
                setTimeout( function () {
                    that.modules.is_copy_tip = false;
                },1500);
                e.clearSelection();
            });
        },
    },
    mounted: function () {
        var that = this;
        //判断浏览器终端类型
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

        //截图url里的邀请码
        var url = location.href;
        this.user_info.inviCode = url.substring(url.indexOf('first_leader=') + 13, url.indexOf('first_leader=') + 19);
        // this.user_info.inviCode = 'lsHUX6';
        //请求数据
        axios.get(this.domain + "/index.php?m=Api&c=user&a=user_invite&invite_code=" + this.user_info.inviCode, 
            ).then( function (response) {
                console.log(response);
                if (response.data) {
                    var res = that.is_JSON(response.data.result);
                    //隐藏手机号码中间4位
                    var phone = res.mobile;
                    phone = phone.replace(/^(\w{3})(\w*)(\w{4})$/, function (all,u1,u2,u3){
                        return u1 + new Array(u2.length+1).join('*') + u3;
                    });
                    that.user_info.userName = res.nickname ? res.nickname : phone;
                    that.user_info.userPic = that.domain + res.head_pic;
                    that.user_info.phone = res.mobile;
                }
            }).catch( function (error) {
                alert(error);
        },"json");
    }
})