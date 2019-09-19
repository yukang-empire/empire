import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//所有模块的数据请求
import gym from "./modules/gym";
import my from "./modules/my";
import order from "./modules/order";
import home from "./modules/home";

const store = new Vuex.Store({
  state: {
    
  },
  mutations: {
    
  },
  modules: {
    //所有的数据请求都在这里
	gym,
	my,
	order,
	home
  }
});
export default store;
