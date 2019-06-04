
Vue.use(window['vue-cropper']);
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

        model: false,
        modelSrc: '',
        crap: false,
        previews: {},
        lists: [
          {
            img: 'https://qn-qn-kibey-static-cdn.app-echo.com/goodboy-weixin.PNG'
          },
          {
            img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4'
          }
        ],
        option: {
          img: 'https://qn-qn-kibey-static-cdn.app-echo.com/goodboy-weixin.PNG',
          size: 1,
          full: false,
          outputType: 'png',
          canMove: true,
          fixedBox: false,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 200,
          autoCropHeight: 150,
          centerBox: false,
          high: true
        },
        show: true
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

        changeImg() {
            this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
          },
          startCrop() {
            // start
            this.crap = true
            this.$refs.cropper.startCrop()
          },
          stopCrop() {
            //  stop
            this.crap = false
            this.$refs.cropper.stopCrop()
          },
          clearCrop() {
            // clear
            this.$refs.cropper.clearCrop()
          },
          refreshCrop() {
            // clear
            this.$refs.cropper.refresh()
          },
          changeScale(num) {
            num = num || 1
            this.$refs.cropper.changeScale(num)
          },
          rotateLeft() {
            this.$refs.cropper.rotateLeft()
          },
          rotateRight() {
            this.$refs.cropper.rotateRight()
          },
          finish(type) {
            // 输出
            // var test = window.open('about:blank')
            // test.document.body.innerHTML = '图片生成中..'
            if (type === 'blob') {
              this.$refs.cropper.getCropBlob((data) => {
                console.log(data);
                var img = window.URL.createObjectURL(data)
                this.model = true
                this.modelSrc = img
              })
            } else {
              this.$refs.cropper.getCropData((data) => {
                this.model = true
                this.modelSrc = data
              })
            }
          },
          // 实时预览函数
          realTime(data) {
            this.previews = data
            console.log(data)
          },
  
          finish2(type) {
            this.$refs.cropper2.getCropData((data) => {
              this.model = true
              this.modelSrc = data
            })
          },
          finish3(type) {
            this.$refs.cropper3.getCropData((data) => {
              this.model = true
              this.modelSrc = data
            })
          },
          down(type) {
            // event.preventDefault()
            var aLink = document.createElement('a')
            aLink.download = 'demo'
            // 输出
            if (type === 'blob') {
              this.$refs.cropper.getCropBlob((data) => {
                this.downImg = window.URL.createObjectURL(data)
                aLink.href = window.URL.createObjectURL(data)
                aLink.click()
              })
            } else {
              this.$refs.cropper.getCropData((data) => {
                this.downImg = data
                aLink.href = data
                aLink.click()
              })
            }
          },
  
          uploadImg(e, num) {
            //上传图片
            // this.option.img
            var file = e.target.files[0]
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
              alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
              return false
            }
            var reader = new FileReader()
            reader.onload = (e) => {
              let data
              if (typeof e.target.result === 'object') {
                // 把Array Buffer转化为blob 如果是base64不需要
                data = window.URL.createObjectURL(new Blob([e.target.result]))
              } else {
                data = e.target.result
              }
              if (num === 1) {
                this.option.img = data
              } else if (num === 2) {
                this.example2.img = data
              }
            }
            // 转化为base64
            // reader.readAsDataURL(file)
            // 转化为blob
            reader.readAsArrayBuffer(file)
          },
          imgLoad(msg) {
            console.log(msg)
          }
    },
    mounted () {
        console.log(window['vue-cropper']);
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