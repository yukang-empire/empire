<template>
    <!-- 导航面包屑(百度了下 面包屑这词居然是来源于一个童话故事 瞬间有了不一样的感觉) -->
    <div class="bread_crumb">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconmianbaoxie"></use>
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

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
    components: {
        
    }
})

export default class bread_crumb extends Vue{
    // 计算属性的get
    get mbx_lists(): string {
        return this.$store.state.current_route ? this.$store.state.current_route.matched : []
    };
}

</script>

<style lang="scss" scoped>

    @media screen and (min-width: 769px) {
        .bread_crumb {
            display: flex;
            align-items: center;
            padding: 18px 20px 18px 20px;

            .icon {
                width: 1rem;
                height: 1rem;
                margin-right: 10px;
            }
        }
    }
</style>