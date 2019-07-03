import Vue from "vue";
import App from "./App.vue";

//路由
import router from "./router/router";

//状态管理vuex
import store from "./store/store";

//离线缓存相关
import "./registerServiceWorker";

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//转换时间格式的moment插件
import moment from 'moment';
moment.locale('zh-cn');
Vue.prototype.$moment= moment;

//基础样式、阿里图标
import '@/assets/style/base.css';
// import '@/assets/style/iconfont.js';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
