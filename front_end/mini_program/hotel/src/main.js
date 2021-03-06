import Vue from 'vue';
import App from './App';

// 时间格式插件
import moment from 'moment';
moment.locale('zh-cn');
Vue.prototype.$moment = moment;

// 阿里图标
import '../static/fonts/iconfont.css';
// 基础样式
import './style/base.css';
import './style/global.scss';

// vuex
import store from './store/store.js';
Vue.prototype.$store = store;

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue({
	...App,
	store
});
app.$mount();
