
// 纯H5页面不建议使用ES5以上的语法 比如let或箭头函数 axios也不建议用 否则会因为兼容不识别导致整个页面空白无法加载
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
            ticket: false,
        },
        //dialog弹框
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

        
    }
})