import Vue from 'vue';
import App from './App.vue';
import router from "./routers/index.js";
import store from "./stores/index.js";
import axios from './axios/index.js';
// import axios from 'axios';
Vue.prototype.$axios= axios;

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//基础样式和阿里图标
import '@/common/styles/base.css';
// import '@/common/styles/iconfont.js';

import moment from 'moment';
moment.locale('zh-cn');
Vue.prototype.$moment= moment;

import Cookies from 'js-cookie';
Vue.use(Cookies);

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
