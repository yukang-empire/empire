
new Vue({
    el:'#app',
    data: {
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
        //邀请记录详情列表
        user_list: [],

    },
    methods: {
        
    },
    mounted: function () {
        if (localStorage.getItem('user_list')) {
            this.user_list = JSON.parse(localStorage.getItem('user_list'));
            for (var i = 0; i < this.user_list.length; i++) {
                switch (this.user_list[i].distribut_level) {
                    case 0:
                        this.user_list[i].distribut_level = '普通会员';
                        break;
                    case 1:
                        this.user_list[i].distribut_level = '银卡';
                        break;
                    case 2:
                        this.user_list[i].distribut_level = '金卡';
                        break;
                    case 3:
                        this.user_list[i].distribut_level = '合伙人';
                        break;
                    case 4:
                        this.user_list[i].distribut_level = '商家';
                        break;
                    default:
                        this.user_list[i].distribut_level = '暂未开通';
                };
                if (this.user_list[i].distribut_time > 0 && this.user_list[i].distribut_level != 0) {
                    this.user_list[i].last_login = new Date(this.user_list[i].distribut_time * 1000).toLocaleDateString().replace(/\//g, "-");
                }else {
                    this.user_list[i].last_login = '';
                }
            }
        };
    }
})