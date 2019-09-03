import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//所有模块的数据请求
import gym from "./modules/gym";

const store = new Vuex.Store({
  state: {
    
  },
  mutations: {
    
  },
  modules: {
    //所有的数据请求都在这里
    gym
  }
});
export default store;
