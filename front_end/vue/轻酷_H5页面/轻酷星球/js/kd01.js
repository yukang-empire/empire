
// 纯H5页面不建议使用ES5以上的语法 比如let或箭头函数 axios也不建议用 否则会因为兼容不识别导致整个页面空白无法加载
new Vue({
    el:'#app',
    data: {
      //检测浏览器类型
      browser: {
        height: null,
        width: null
      },
      pours: [],
      //dialog弹框
      dialog: {
        is_open: false,
        msg: null
      },
      kd_data: {},
      input_kd: '',
      is_show_kd: false
    },
    methods: {
      //判断返回的数据是否为JSON格式 如果不是 则转换成JSON格式
      is_JSON (data) {
        if(typeof(data) === 'string') {
          return JSON.parse(data);
        }else {
          return data;
        };
      },
      //限制输入
      limit_input () {
        this.input_kd = this.input_kd.replace(/[^\d]/g, '');
      },
      //注入酷点
      in_kd () {
        if (parseInt(this.input_kd) > 0 && (parseInt(this.input_kd) <= this.kd_data.user_points)) {
          var send_data = new FormData();
          send_data.append("user_points", this.input_kd);
          send_data.append("token", sessionStorage.getItem('token'));
          $.ajax({
              type: "POST",
              contentType: false,
              processData: false,
              url: "https://shop.technologyle.com/index.php?m=Api&c=Bonus&a=add_bonus",
              dataType: "json",
              data: send_data,
              success: function (response) {
                  console.log('我的酷点', response);
                  if (response.status == 1) {
                    location.reload();
                  };
              }
          });
        }else {
          this.is_show_kd = true;
        };
      }
      
    },
    mounted () {
      var that = this;
      //判断浏览器终端类型
      this.browser.width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
      this.browser.height = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
      //请求酷点数据
      var send_data = new FormData();
      send_data.append("token", sessionStorage.getItem('token'));
      $.ajax({
          type: "POST",
          contentType: false,
          processData: false,
          url: "https://shop.technologyle.com/index.php?m=Api&c=Bonus&a=my_points",
          dataType: "json",
          data: send_data,
          success: function (response) {
              console.log('我的酷点', response);
              if (response.status == 1) {
                that.kd_data = response.result;
                that.pours = response.result.bonus_int;
                var length = that.pours.length;
                for (var i = 0; i < length; i++) {
                  that.pours[i].add_time = that.pours[i].add_time > 1000 ? moment(that.pours[i].add_time * 1000).format('YYYY-MM-DD HH:mm:ss') : '';
                };
              };
          }
      });
    }
})