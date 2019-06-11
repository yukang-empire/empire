import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

//引入NProgress进度条及样式
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
Vue.use(NProgress);

import layout from "@/views/layout/index.vue";

import home from './modules/home.js';
import business from './modules/business.js';
import users from './modules/users.js';
// import set from './modules/set.js';

const routers = new Router({
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
            component: () => import('@/views/login/index.vue'),
            meta: {
                title: '登录'
            }
        },
        {
            path: "/register",
            name: "register",
            component: () => import('@/views/login/register.vue'),
            meta: {
                title: '登录'
            }
        },
        {
            path: "/find",
            name: "find",
            component: () => import('@/views/login/find.vue'),
            meta: {
                title: "找回密码"
            }
        },
        home,
        business,
        users,
        // set,
    ],
    //所有页面自动滚动到顶部
    // scrollBehavior: () => ({ y: 0 }),
});

//全局导航守卫
routers.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.path == '/login') {
        next();
        NProgress.done();
    }else {
        if (!sessionStorage.getItem('token')) {
            next({ path: '/login' });
            NProgress.done();
        }else {
            next();
            document.title = to.meta.title ? '轻酷后台-' +  to.meta.title : '轻酷-后台管理';
            NProgress.done();
        };
    }
});

export default routers;