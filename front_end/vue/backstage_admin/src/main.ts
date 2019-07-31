import Vue from "vue";
import App from "./App.vue";

//路由
import router from "./router/router";

//状态管理vuex
import store from "./store/store";

//离线缓存相关
import "./registerServiceWorker";

Vue.config.productionTip = false;

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//转换时间格式的moment插件
import moment from 'moment';
moment.locale('zh-cn');
Vue.prototype.$moment= moment;

//导出excel
import JsonExcel from 'vue-json-excel';
Vue.component('downloadExcel', JsonExcel);

//基础样式、阿里图标
import '@/assets/style/base.css';
// import '@/assets/style/iconfont.js';

//组件的路由钩子函数
import { Component } from 'vue-property-decorator';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
