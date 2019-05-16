import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./routers/index";
import store from "./stores/index";
// import axios from 'axios';

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入NProgress进度条及样式
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//引入全局css
import '@/common/styles/index.scss';

Vue.config.productionTip = false;
//全局使用element-ui
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
