
import Vue from 'vue';
import App from './App.vue';
import router from './routers/index';
import store from './stores/index';
import './registerServiceWorker';

//引入全局css
import '@/commons/styles/index.scss';

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入NProgress进度条及样式
// import NProgress from 'nprogress.js'; 
// import 'nprogress/nprogress.css';

//阿里图标 symbol引用方式
import '@/commons/styles/fonts/iconfont.js';

Vue.config.productionTip = false;

//全局使用element-ui
Vue.use(ElementUI);


//跳转路由时相关改变
// router.beforeEach( (to, from, next) => {
// 	NProgress.start();
// 	if (to.meta.title) {
// 		document.title = to.meta.title;
// 	};
// 	next();
// 	NProgress.done();
// });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
