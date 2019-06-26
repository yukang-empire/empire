import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import https from "./modules/https";

const store = new Vuex.Store({
  modules: {
    https
  }
});
export default store;
