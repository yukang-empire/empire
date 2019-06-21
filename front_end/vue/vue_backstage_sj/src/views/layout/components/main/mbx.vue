<template>
    <!-- 导航面包屑(百度了下 面包屑这词居然是来源于一个童话故事 瞬间有了特殊意义) -->
    <div class="mbx">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mianbaoxie"></use>
        </svg>
        <el-breadcrumb separator="/">
            <!-- transition-group必须要有一个key值 -->
            <transition-group name="breadcrumb">
                <el-breadcrumb-item key="/home" to="/home">首页</el-breadcrumb-item>
                <el-breadcrumb-item :key="item.path" :to="item.path" v-if='mbx_lists[0].name != "home"' v-for='item in mbx_lists'>
                    {{ item.meta.title }}
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
    computed: {
        mbx_lists () {
            return this.$store.state.current_route ? this.$store.state.current_route.matched : []
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