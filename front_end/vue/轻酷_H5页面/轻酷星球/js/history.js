
// 纯H5页面不建议使用ES5以上的语法 比如let或箭头函数 axios也不建议用 否则会因为兼容不识别导致整个页面空白无法加载
new Vue({
    el:'#app',
    data: {
      //检测浏览器类型
      browser: {
        height: null,
        width: null
      },
      lists: []
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
      
    },
    mounted () {
      var that = this;
      moment.locale('zh-cn');
      //判断浏览器终端类型
      this.browser.width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
      this.browser.height = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
      if (sessionStorage.getItem('history_list')) {
        this.lists = JSON.parse(sessionStorage.getItem('history_list'));
        var length = this.lists.length;
        for (var i = 0; i < length; i++) {
          that.lists[i].up_time = moment(that.lists[i].up_time * 1000).format('YYYY-MM-DD');
        };
        console.log(this.lists);
      };
    }
})