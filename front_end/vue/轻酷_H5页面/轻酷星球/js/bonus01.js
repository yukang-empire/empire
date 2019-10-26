
// 纯H5页面不建议使用ES5以上的语法 比如let或箭头函数 axios也不建议用 否则会因为兼容不识别导致整个页面空白无法加载
new Vue({
    el:'#app',
    data: {
      //检测浏览器类型
      browser: {
        height: null,
        width: null
      },
      stitch_nav: '0',
      navs: [],
      bonus_data: [],
      timer: [],
      bonus_points: sessionStorage.getItem('bonus_points') || '',
      frozen_points: sessionStorage.getItem('frozen_points') || '',
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
      stitch(tab, event) {
        console.log(tab, event);
      },
      jump_history () {
        location.href='./history.html';
      }
    },
    mounted () {
      var that = this;
      moment.locale('zh-cn');
      //判断浏览器终端类型
      this.browser.width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
      this.browser.height = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
      //请求数据
      var send_data = new FormData();
      send_data.append("token", sessionStorage.getItem('token'));
      $.ajax({
          type: "POST",
          contentType: false,
          processData: false,
          url: "https://shop.technologyle.com/index.php?m=Api&c=Bonus&a=my_bonus_list",
          dataType: "json",
          data: send_data,
          success: function (response) {
              console.log('分红数据', response);
              if (response.status == 1) {
                that.bonus_data = response.result;
                var length = that.bonus_data.length;
                for (let i = 0; i < length; i++) {
                    var up_time = JSON.parse(JSON.stringify(that.bonus_data[i].up_time));
                    switch (that.bonus_data[i].status) {
                      case 1: 
                          that.bonus_data[i].status_02 = '未发放';
                          break;
                      case 2: 
                          that.bonus_data[i].status_02 = '已发放';
						  break;
                    };
                    that.bonus_data[i].progress_time = moment(up_time * 1000).format('YYYY-MM-DD');
                    // console.log(that.bonus_data[i].up_time, up_time, that.bonus_data[i].progress_time);
                    that.bonus_data[i].deadline_time = parseInt(up_time) * 1000 - new Date().getTime();
                    //倒计时
                    if (that.bonus_data[i].deadline_time > 0 && that.bonus_data[i].status == 1) {
                      // console.log(that.bonus_data[i].deadline_time);
                      that.bonus_data[i].up_time = moment(that.bonus_data[i].deadline_time).format('DD 天 HH:mm:ss');
                      that.timer[i] = setInterval(() => {
                        that.bonus_data[i].tem_time = that.bonus_data[i].deadline_time;
                        that.bonus_data[i].deadline_time = that.bonus_data[i].deadline_time - 1000;
                        that.bonus_data[i].up_time = moment(that.bonus_data[i].deadline_time).format('DD 天 HH:mm:ss');
                        if (that.bonus_data[i].deadline_time < 1000) {
                          clearInterval(that.timer[i]);
                          that.timer[i] = null;
                          that.bonus_data[i].up_time = '即将分红';
                        };
                      }, 1000);
                    }else if (that.bonus_data[i].deadline_time <= 0 && that.bonus_data[i].status == 1) {
                      that.bonus_data[i].up_time = '即将分红';
                    };
                    sessionStorage.setItem('history_list', JSON.stringify(that.bonus_data));
                };
              };
          }
      });
    }
})