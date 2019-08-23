import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import { Message } from 'element-ui';
//引入NProgress插件
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import home from './modules/home';
import business from './modules/business';
import user from './modules/user';
import order from './modules/order';
import finance from './modules/finance';
import coupon from './modules/coupon';
import operate from './modules/operate';
import share_profit from './modules/share_profit';
import set from './modules/set';

//三级菜单以上的路由 如果要复用layout的main组件 则必须在其文件夹下新建一个index.vue 用router-view来渲染对应的子组件内容;

//meta的属性解释
  // hidden: 布尔值 表示此路由要不要展现到侧边栏菜单里 比如登录页、404页面等就为true;
  // roles: 数组 表示有足够权限查看此路由的角色集合;

const router = new Router({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: "/login",
      name: "login",
      component: () => import('@/views/login/login.vue'),
      meta: {
          title: '登录',
          hidden: true
      }
    },
    home,
    user,
    business,
    order,
    coupon,
    finance,
    operate,
    share_profit,
    set
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

//全局导航守卫
const white_list = ['/login'];
router.beforeEach((to, from, next) => {
  //进度条开始
  NProgress.start();
  var is_white = white_list.some( item => {
    return item == to.path;
  });
  //如果在白名单内 则放行
  if (is_white) {
    next();
    //进度条结束
    NProgress.done();
  }else {
    //如果不在白名单内 先检查token
    if (!sessionStorage.getItem("token")) {
      //无token 返回登录页面
      Message({ message: '未检测到token, 请重新登录！', type: 'error', duration: 2500 });
      next({ path: "/login" });
      NProgress.done();
    }else {
      //有token 放行
      next();
      //修改对应的标题
      document.title = to.meta.title ? "轻酷运营总后台-" + to.meta.title : "轻酷-运营总后台";
      NProgress.done();
    };
  };
});

export default router;
