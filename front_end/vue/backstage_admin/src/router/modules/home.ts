import layout from "@/views/layout/index.vue";

const home = {
    path: "/home",
    name: "home",
    component: layout,
    meta: {
        title: "首页",
        icon: "#iconshouye1",
        hidden: false
    },
    children: [
        {
            path: "/home",
            component: () => import('@/views/home/home.vue'),
            meta: {
                title: '首页',
                hidden: true
            },
        }
    ]
};

export default home;