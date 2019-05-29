<template>
    <!-- 导航面包屑(百度了下 面包屑这词居然是来源于一个童话故事 瞬间有了特殊意义) -->
    <div class="mbx">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mianbaoxie"></use>
        </svg>
        <el-breadcrumb separator="/">
            <transition-group name="breadcrumb">
                <!-- transition-group必须要有一个key值 -->
                <el-breadcrumb-item key="home" to="/home">首页</el-breadcrumb-item>
                <el-breadcrumb-item :key="item.path" v-if='$store.state.router_matched[0].name != "home"' v-for='item in $store.state.router_matched' :to="item.path">
                    <span>{{ item.meta.title }}</span>
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>

<script>

export default {
    name: 'mbx',
    components: {
        
    },
    props: [
        'mbx'
    ],
    data () {
        return {
            
        }
    },
    methods: {
        
    },
    watch: {
        '$route' (to, from) {
            this.$store.commit('get_matched', to);
        }
    },
    mounted () {
        
    }
}
</script>

<style lang='scss' scoped>
    .mbx {
        display: flex;
        align-items: center;
        padding: 18px 20px 18px 20px;
    }
    .mbx .icon {
        width: 1rem;
        height: 1rem;
        margin-right: 10px;
    }

    @media screen and (min-width: 769px) {
        
    }
</style>