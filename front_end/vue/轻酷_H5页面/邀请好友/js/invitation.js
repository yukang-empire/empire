
new Vue({
    el:'#app',
    data: {
        //请求域名
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
            width: null
        },
        //开通人数和升级人数
        peop: {
            all: 0,
            level_count: 0,
            QR_code: '',
            img_lists: [],
            inviCode: ''
        },
        response: '',
    },
    methods: {
		//获取url参数
		getQueryVariable (variable) {
			var query = window.location.search.substring(1);
			var vars = query.split("&");
			for (var i=0;i<vars.length;i++) {
				var pair = vars[i].split("=");
				if(pair[0] == variable){return pair[1];}
			}
			return(false);
		},
        //生成邀请卡
        make_card () {
            // window.location.href = 'make_card.html';
			// this.dialog.is_open = true;
			var that = this;
            //要发送的数据
            var data = {
                
            };
            //ios终端
            if (this.device_rele.is_ios) {
                this.setupWebViewJavascriptBridge( function(bridge) {
                    //getQRcode为事先与ios开发人员约好的函数名 data为发送过去的数据 response为ios那边返回的数据
                    bridge.callHandler('getQRcode', data, function(response) {
						
                    });
                });
            }
            //android终端
            else if (this.device_rele.is_android) {
                //getQRcode为事先与android终端开发人员约好的函数名 data为发送过去的数据(一般建议转成JSON.stringify字符串)
                // var data_ = JSON.stringify(data);
                // window.jsInterface.getQRcode(data_);
                //把安卓返回的数据装起来
                var res = window.jsInterface.getQRcode();
            }else {
                return false;
            };
        },
        //邀请记录详情
        jump_details () {
            location.href = 'https://shop.technologyle.com/userReg/invitation_details.html';
        },
        //点击分享
        share () {
            this.modules.is_bottom_share = true;
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
        // if_error (error) {
        //     //打开遮罩
        //     this.dialog.is_open = true;
        //     this.dialog.msg = error;
        // },
        //保存二维码到本地
        preLocal () {
            var that = this;
            //要发送的数据
            var data = that.peop.QR_code;
            //ios终端
            if (this.device_rele.is_ios) {
                this.setupWebViewJavascriptBridge( function(bridge) {
                    bridge.callHandler('preLocal', data, function(response) {
                        
                    });
                });
            }
            //android终端
            else if (this.device_rele.is_android) {
                window.jsInterface.preLocal(data);
                // var state = window.jsInterface.wxShare(data);
            }else {
                return false;
            };
        },
        //分享至微信和朋友圈
        wx_share (where) {
            var that = this;
            //要发送的数据
            var data = where;
            //ios终端
            if (this.device_rele.is_ios) {
                this.setupWebViewJavascriptBridge( function(bridge) {
                    bridge.callHandler('wxShare', data, function(response) {
                        if (response.state == 1) {
                            that.modules.is_bottom_share = false;
                        };
                    });
                });
            }
            //android终端
            else if (this.device_rele.is_android) {
                window.jsInterface.wxShare(data);
                var state = window.jsInterface.wxShare(data);
                if (state == 1) {
                    this.modules.is_bottom_share = false;
                }
            }else {
                return false;
            };

            // var link = 'https://shop.technologyle.com/userReg/invi_download.html?first_leader=' + this.peop.inviCode;
            // if (type == 'friend') {
            //     console.log(1);
            // }else {
            //     console.log(2);
            // }
        },
        // 混合开发的h5与原生APP交互
        getInfo: function () {
            var that = this;
            //要发送的数据
            var data = {
                
            };
            //ios终端
            if (this.device_rele.is_ios) {
                this.setupWebViewJavascriptBridge( function(bridge) {
                    //getInfo为事先与ios开发人员约好的函数名 data为发送过去的数据 response为ios那边返回的数据
                    bridge.callHandler('getInfo', data, function(response) {
                        that.response = response;
                        localStorage.setItem('user_info', JSON.stringify(response));
                        that.peop.inviCode = response.inviCode;
                        //获取邀请码和二维码 请求后端数据
                        that.get_code(response.inviCode);
                    });
                });
            }
            //android终端
            else if (this.device_rele.is_android) {
                //getInfo为事先与android终端开发人员约好的函数名 data为发送过去的数据(一般建议转成JSON.stringify字符串)
                // var data_ = JSON.stringify(data);
                // window.jsInterface.getInfo(data_);
                //把安卓返回的数据装起来
                var res = window.jsInterface.getInfo();
                var response = JSON.parse(res);
                localStorage.setItem('user_info', JSON.stringify(response));
                this.peop.inviCode = response.inviCode;
                //获取邀请码和二维码 请求后端数据
                that.get_code(response.inviCode);
            }else {
                return false;
            };
        },
        //获取邀请码
        get_code (code) {
            //获取邀请的人数详情
            var that = this;
            // var code = 'lsHUX6';
            // var code = 'ikuyR0';
            $.get(that.domain + "/index.php?m=Api&c=user&a=invite_user&invite_code=" + code, function(response){
                var res = that.is_JSON(response).result;
                if (res) {
                    console.log(res);
                    that.peop.all = res.all;
                    that.peop.level_count = res.level_count;
                    // 为图片添加域名
                    for (var i = 0; i < res.list.length; i++) {
                        if (res.list[i].head_pic) {
                            res.list[i].head_pic = that.domain + res.list[i].head_pic;
                        };
                    };
                    that.peop.img_lists = res.list;
                    sessionStorage.setItem('user_list', JSON.stringify(res.list));
                }else {
                    sessionStorage.removeItem('user_list');
                    return false;
                };
            });

            //获取动态二维码
            $.get(that.domain + "/index.php?m=Api&c=user&a=user_invite&invite_code=" + code, function(response){
                var res = that.is_JSON(response).result;
                if (res) {
                    console.log(res);
                    that.peop.QR_code = that.domain + res.invite_ewm;
                    localStorage.setItem('QR_code', that.peop.QR_code);
                }else {
                    return false;
                };
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
    mounted: function () {
		var that = this;
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
        // 原生APP获取数据
        this.getInfo();
		// this.get_code();
		var invite_code = this.getQueryVariable("invite_code");
		if (invite_code) {
			this.get_code(invite_code);
		}else {
			this.getInfo();
		};
    }
})