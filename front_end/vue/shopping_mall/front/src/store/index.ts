import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//拆分模块
import home from './modules/home';

const store = new Vuex.Store({
	state: {
		
	},
	mutations: {
		
	},
	actions: {

	},
	modules: {
		home
	}
});

export default store;