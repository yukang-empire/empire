import Vue from "vue";
import Router from "vue-router";

//typescript语法 不能省略后缀.vue
import login from "@/views/login/index.vue";
import layout from "@/views/layout/index.vue";

Vue.use(Router);

export default new Router({
    // mode: "history",
    // base: process.env.BASE_URL,
    routes: [
        {
            path: "/login",
            name: "登录",
            component: login
        },
        {
            path: "/home",
            name: "首页",
            component: layout
        },
        {
        path: "/business",
        name: "商家管理",
        component: () =>
                import("@/views/business/shops.vue")
        }
    ]
});