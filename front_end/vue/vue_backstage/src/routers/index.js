import Vue from "vue";
import Router from "vue-router";

import login from "@/views/login/index.vue";
import layout from "@/views/layout/index.vue";

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
            component: () => import('@/views/login/register.vue')
        },
        {
            path: "/find",
            name: "找回密码",
            component: () => import('@/views/login/find.vue')
        },
        {
            path: "/home",
            name: "首页",
            component: layout,
            meta: {
                title: '首页',
                icon: '#icon-shouye1'
            }
        },
        {
            path: "/business",
            name: "商家管理",
            component: layout,
            meta: {
                title: '商家管理',
                icon: '#icon-shangjia',
                roles: ['admin']
            },
            children: [
                {
                    path: 'add',
                    name: '新增商家',
                    children: [
                        {
                            path: 'business',
                            name: '填写商家信息',
                            component: () => import('@/views/business/add/business_info.vue')
                        },
                        {
                            path: 'stores',
                            name: '填写门店信息',
                            component: () => import('@/views/business/add/stores_info.vue')
                        }
                    ]
                },
                {
                    path: 'list',
                    name: '商家列表',
                    children: [
                        {
                            path: 'details',
                            name: '商家详情',
                            component: () => import('@/views/business/business/details.vue')
                        },
                        {
                            path: 'info',
                            name: '列表详情',
                            component: () => import('@/views/business/business/list.vue')
                        }
                    ]
                },
                {
                    path: 'goods',
                    name: '商品列表',
                    children: [
                        {
                            path: 'add',
                            name: '新增商品',
                            component: () => import('@/views/business/goods/add.vue')
                        },
                        {
                            path: 'list',
                            name: '商品详情',
                            component: () => import('@/views/business/goods/list.vue')
                        }
                    ]
                },
                {
                    path: 'stores',
                    name: '门店列表',
                    component: () => import('@/views/business/stores.vue')
                },
                {
                    path: 'check',
                    name: '入驻审核',
                    component: () => import('@/views/business/check.vue')
                },
                
            ]
        },
        {
            path: "/set",
            name: "设置",
            component: layout,
            meta: {
                title: '设置',
                icon: '#icon-shezhi'
            }
        },
    ]
});