import Vue from 'vue';
import App from './App.vue';

//路由
import router from "./routers/index.js";

//状态管理vuex
import store from "./stores/index.js";

//网络请求axios
import axios from './axios/index.js';
Vue.prototype.$axios = axios;

//基础样式、阿里图标
import '@/common/styles/base.css';
// import '@/common/styles/iconfont.js';

//全局变量
import global from './common/api/global';
Vue.prototype.$global = global;

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//转换时间格式的moment插件
import moment from 'moment';
moment.locale('zh-cn');
Vue.prototype.$moment= moment;

//md5加密
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
