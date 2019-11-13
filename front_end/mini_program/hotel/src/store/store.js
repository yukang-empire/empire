import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 所有的数据请求
import home from "./modules/home";
import hotel from "./modules/hotel";
import my from "./modules/my";

const store = new Vuex.Store({
  state: {
    
  },
  mutations: {
    
  },
  modules: {
	home,
	hotel,
	my
  }
});

export default store;