import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//拆分模块
import home from './modules/home';
import goods from './modules/goods';
import order from './modules/order';
import address from './modules/address';

const store = new Vuex.Store({
	state: {
		
	},
	mutations: {
		
	},
	actions: {

	},
	modules: {
		home,
		goods,
		order,
		address
	}
});

export default store;