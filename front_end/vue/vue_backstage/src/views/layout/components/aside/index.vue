<template>
    <div class="aside_component" id="aside_component">
        <el-menu
            :default-active="current_route"
            :router='is_router_mode'
            class="el-menu-vertical-demo"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#409eff">
            
            <li v-for="(item, index) in routers.show">
                <!-- 没有子菜单 -->
                <el-menu-item :index="item.path" v-if='!item.children || (item.children.length < 2)'>
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="item.meta.icon"></use>
                    </svg>
                    <span slot="title">{{ item.meta.title }}</span>
                </el-menu-item>

                <!-- 有子菜单 -->
                <el-submenu :index="item.path" v-else>
                    <template slot="title">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="item.meta.icon"></use>
                        </svg>
                        <span>{{ item.meta.title }}</span>
                    </template>
                    
                    <li v-for="(item01, index) in item.children">
                        <el-menu-item :index="item01.path" v-if='!item01.children || (item01.children.length < 2)'>
                            {{ item01.meta.title }}
                        </el-menu-item>
        
                        <el-submenu :index="item01.path" v-else>
                            <template slot="title">
                                {{ item01.meta.title }}
                            </template>

                            <li v-for="(item02, index) in item01.children">
                                <el-menu-item :index="item02.path" v-if='!item02.children || (item02.children.length < 2)'>
                                    {{ item02.meta.title }}
                                </el-menu-item>
                            </li>
                        </el-submenu>
                    </li>
                </el-submenu>
            </li>
        </el-menu>
    </div>
</template>

<script>

export default {
    name: 'aside_component',
    components: {
        
    },
    props: [
        
    ],
    data () {
        return {
            //侧边栏是否开启路由模式
            is_router_mode: true,
            //路由权限
            routers: {
                all: [],
                //普通用户都能看的
                user: [],
                //最终展示的路由页面
                show: [],
            }
        }
    },
    computed: {
        current_route () {
            return this.$store.state.current_route ? this.$store.state.current_route.path : this.$route.path;
        }
    },
    methods: {
        
    },
    watch: {
        '$route' (to, from) {
            //路由一有变化就发送给vuex
            this.$store.commit('get_route', to);
        }
    },
    mounted () {
        //刷新页面的时候 路由没有发生变化 就获取当前路由 发送给vuex
        this.$store.commit('get_route', this.$route);
        //筛选权限路由
        var routers = this.$router.options.routes;
        for (var i = 0; i < routers.length; i++) {
            if (routers[i].meta && routers[i].meta.is_aside) {
                this.routers.all.push(routers[i]);
                this.routers.user.push(routers[i]);
                //遍历meta里的roles 进行筛选
                if (routers[i].meta.roles) {
                    var roles = routers[i].meta.roles;
                    for (var j = 0; j < roles.length; j++) {
                        if (roles[j] == 'admin') {
                            //删掉需要权限才能看的
                            this.routers.user.pop(routers[i]);
                        };
                    };
                };
            };
        };
        var role = sessionStorage.getItem('role') ? sessionStorage.getItem('role') : '';
        if (role == 'admin') {
            this.routers.show = this.routers.all;
        }else {
            console.log(222);
            this.routers.show = this.routers.user;
        };
        console.log('show_routers',this.routers.show);
    }
}
</script>

<style lang='scss' scoped>
    .aside_component {
        width: 210px;
        overflow-y: scroll;
        padding-bottom: 25px;
        background-color: $aside;
    }
    .icon {
        margin-right: 8px;
    }
    .el-menu {
        border: none;
    }
    

    @media screen and (min-width: 769px) {
        
    }
</style>