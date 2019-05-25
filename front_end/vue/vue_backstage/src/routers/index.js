import Vue from "vue";
import Router from "vue-router";

import login from "@/views/login/index.vue";
import register from "@/views/login/register.vue";
import find from "@/views/login/find.vue";
// import layout from "@/views/layout/index.vue";

Vue.use(Router);

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
            name: "登录",
            component: login
        },
        {
            path: "/register",
            name: "注册",
            component: register
        },
        {
            path: "/find",
            name: "找回密码",
            component: find
        },
        // {
        //     path: "/home",
        //     name: "首页",
        //     component: layout
        // },
        // {
        // path: "/business",
        // name: "商家管理",
        // component: () =>
        //     import("@/views/business/shops.vue")
        // }
    ]
});