import Vue from 'vue';
import App from './App.vue';
import router from "./routers/index.js";
import store from "./stores/index.js";
import axios from 'axios';
Vue.prototype.$axios= axios;

//基础样式和阿里图标
import '@/common/styles/base.css';
// import '@/common/styles/iconfont.js';

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入NProgress进度条及样式
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
Vue.use(NProgress);

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

import Cookies from 'js-cookie';
Vue.use(Cookies);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
