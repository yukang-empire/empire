<template>
    <div class="c_aside">
        <el-menu
            :default-active="current_route"
            :router='true'
            class="el-menu-vertical-demo"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#409eff">
            
            <li v-for="(item, index) in routers.show">
                <el-menu-item :index="item.path" v-if='!item.children || (item.children.length < 2)'>
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="item.meta.icon"></use>
                    </svg>
                    <span slot="title">{{ item.meta.title }}</span>
                </el-menu-item>

                <el-submenu :index="item.path" v-else>
                    <template slot="title">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="item.meta.icon"></use>
                        </svg>
                        <span>{{ item.meta.title }}</span>
                    </template>
                    
                    <li v-for="(item01, index) in item.children">
                        <el-menu-item :index="item01.path" v-if="(!item01.children || (item01.children.length < 2)) && !item01.meta.hidden && (arr_power.includes(item01.meta.roles))">
                            {{ item01.meta.title }}
                        </el-menu-item>
        
                        <el-submenu :index="item01.path" v-if="(item01.children && item01.children.length >= 2) && !item01.meta.hidden">
                            <template slot="title">
                                {{ item01.meta.title }}
                            </template>

                            <li v-for="(item02, index) in item01.children">
                                <el-menu-item :index="item02.path" v-if='(!item02.children || (item02.children.length < 2)) && !item02.meta.hidden'>
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

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component({
    components: {
        
    }
})

export default class c_aside extends Vue{
    private routers: any = {
        //最终展示的路由页面
        show: [],
    };

    //此账号的所有权限
    private arr_power: any = sessionStorage.getItem('Permission').split(',') || [];

    // 计算属性的get
    get current_route(): string {
        return this.$store.state.current_route ? this.$store.state.current_route.path : this.$route.path;
    };

    //路由一有变化就发送给vuex
    @Watch('$route', { immediate: true })
    private get_route(to: any, from: any){
        this.$store.commit('get_route', to);
    };

    mounted () {
        //筛选权限路由
        var tem_router: any = this.$router
        var routers: any = tem_router.options.routes;

        for (var i = 0; i < routers.length; i++) {
            if (routers[i].meta && !routers[i].meta.hidden && this.arr_power.includes(routers[i].meta.roles)) {
                this.routers.show.push(routers[i]);
            };
        };
        console.log('自身权限能查看到的所有路由页面',this.routers.show);
    };
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        
    }
</style>