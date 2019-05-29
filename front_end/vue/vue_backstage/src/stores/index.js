import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// console.log(this.$route);

const store = new Vuex.Store({
    state: {
        //用于面包屑
        router_matched: null,
        //用于面包屑下面的历史记录
        router_history: localStorage.getItem('router_history') ? [JSON.parse(localStorage.getItem('router_history'))] : [],
        //选中某个面包屑
        select_idex: localStorage.getItem('router_history') ? 0 : -1,
        //删除后 自动选择末尾的面包屑
        now_path: '/home',
    },
    mutations: {
        get_matched: (state, to) => {
            state.router_matched = to.matched;
        },
        revise_history: (state, history) => {
            //判断此路由是否已经存在了
            var is_push = state.router_history.some( (item, index) => {
                if (item.name == history.name) {
                    state.select_idex = index;
                    localStorage.setItem('router_history', JSON.stringify(state.router_history[index]));
                };
                return item.name == history.name;
            });
            if (!is_push) {
                state.router_history.push(history);
                var length = state.router_history.length - 1;
                state.select_idex = length;
                localStorage.setItem('router_history', JSON.stringify(state.router_history[length]));
            };
        },
        revise_idex (state, index) {
            state.select_idex = index;
            state.now_path = state.router_history[state.select_idex].path;
        },
        del_history(state, index) {
            state.router_history.splice(index, 1);
            //删掉最后一个的时候
            if (state.router_history.length == 0) {
                state.select_idex = -1;
                state.now_path = '/home';
            };
            if (index == state.select_idex) {
                var length = state.router_history.length - 1;
                state.select_idex = length;
                state.now_path = state.router_history[state.select_idex].path;
            }else if (index < state.select_idex) {
                state.select_idex --;
            };
        },
    }
});

export default store;