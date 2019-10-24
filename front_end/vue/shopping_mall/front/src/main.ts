import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//时间格式插件moment.js
import moment from 'moment';
moment.locale('zh-cn');
Vue.prototype.$moment = moment;


//数据请求axios
import axios from './assets/api/axios';
Vue.prototype.$axios = axios;

//基础样式、阿里图标
import '@/assets/style/base.css';
// import '@/assets/style/iconfont.js';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
