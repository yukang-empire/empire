import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //当前路由
        current_route: null,
        //历史记录的数组汇总
        history_arr: [],

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
            //没有拥有 并且不是首页 才push进去
            if (!is_have && route.path != '/home') {
                state.history_arr.push(route);
            };
            console.log(state.current_route);
        },
        //删除某个历史记录tag
        del_tag (state, index) {
            state.history_arr.splice(index, 1);
        }

    }
});

export default store;