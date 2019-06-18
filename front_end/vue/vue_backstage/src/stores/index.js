import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios/index.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //域名
        domain: 'https://manage.technologyle.com',
        //当前路由
        current_route: null,
        //历史记录的数组汇总
        history_arr: [],
        table_data_self: {
            table: {
                is_height: 'auto',
                lists: []
            },
            page: {
                is_page: true
            }
        },
    },
    mutations: {
        //进入页面 先发送路由给vuex 存到历史记录数组里 state参数别忘了写上
        get_route (state, route) {
            state.current_route = route;
            //检查历史记录里是否已经存在这个路由
            //some是遍历数组检查是否有满足条件的一个方法 注入函数和参数 一旦有一个满足条件 就直接返回true
            var is_have = state.history_arr.some((item, index) => {
                //path相同就判定已经拥有了这个路由
                if (item.path == route.path) {
                    return true;
                };
            });
            //没有拥有 且不是首页 才push进去
            if (!is_have && route.path != '/home') {
                state.history_arr.push(route);
            };
            //如果长度大于10个 则删掉最前面一个(太长了会导致左边导航栏缩短)
            var length = state.history_arr.length;
            if (length > 7) {
                state.history_arr.shift();
            };
            console.log('当前路由信息', state.current_route);
        },
        //删除某个历史记录tag
        del_tag (state, index) {
            state.history_arr.splice(index, 1);
        },
        // //请求用户列表数据
        // get_user_list () {
        //     axios.post('/api/getUserList', JSON.stringify(params)).then(response => {
        //         console.log('用户列表', response);
        //         var res = response.data;
        //         this.table_data.table.lists = res.data;
        //         this.table_data.page.total = parseInt(res.count);
        //     })
        // },
    }
});

export default store;