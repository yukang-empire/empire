import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import layout from "@/views/layout/index.vue";

import home from './modules/home.js';
import business from './modules/business.js';
import users from './modules/users.js';
// import set from './modules/set.js';

export default new Router({
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
    ]
});