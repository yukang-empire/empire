import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//所有模块的数据请求
import home from "./modules/home";
import user from "./modules/user";
import business from "./modules/business";
import order from "./modules/order";
import coupon from "./modules/coupon";
import finance from "./modules/finance";
import operate from "./modules/operate";
import set from "./modules/set";
import share_profit from "./modules/share_profit";
import game from "./modules/game";

const store = new Vuex.Store({
  state: {
    //当前路由
    current_route: null,
    //历史记录的数组汇总
    history_arr: [],
    //地图需要的响应式数据
    map_data: '',
    //提现excel表格
    cash_out_excel: []
  },
  mutations: {
    change_map_data (state, data) {
      state.map_data = data.province + data.city + data.area + data.street + data.address;
    },
    //进入页面 先发送路由给vuex 存到历史记录数组里 state参数别忘了写上
    get_route (state, route ) {
      state.current_route = route;
      //检查历史记录里是否已经存在这个路由
      //some是遍历数组检查是否有满足条件的一个方法 注入函数和参数 一旦有一个满足条件 就直接返回true
      var is_have = state.history_arr.some((item: any, index) => {
          //path相同就判定已经拥有了这个路由
          if (item.path == route.path) {
              return true;
          };
      });
      //没有拥有 && 不是首页 && hidden为false 才push进去
      if (!is_have && route.path != '/home' && !route.meta.hidden) {
          //不这样写 ts会报错 很无奈！
          var arr: any = state.history_arr;
          arr.push(route);
          state.history_arr = arr;
      };
      //如果长度大于7个 则删掉最前面一个(太长了会导致左边导航栏缩短bug)
      var length = state.history_arr.length;
      if (length > 7) {
          state.history_arr.shift();
      };
      // console.log('当前路由信息', state.current_route);
    },
    //删除某个历史记录tag
    del_tag (state, index) {
      state.history_arr.splice(index, 1);
    },
    //修改excel表格数据
    change_cash_out_excel (state, data) {
      state.cash_out_excel = JSON.parse(data);
    }
  },
  modules: {
    //所有的数据请求都在这里
    home,
    user,
    business,
    order,
    coupon,
    finance,
    operate,
    set,
	share_profit,
	game
  }
});
export default store;
