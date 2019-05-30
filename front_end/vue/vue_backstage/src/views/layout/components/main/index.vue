<template>
    <div class="main_component">
        <!-- 面包屑 -->
        <mbx />
        <!-- 历史记录 -->
        <history />
        <!-- 标题 -->
        <h_title />
        <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
// 面包屑导航
import mbx from './mbx.vue';
import history from './history.vue';
import h_title from './h_title.vue';

export default {
    name: 'main_component',
    components: {
        mbx,
        history,
        h_title
    },
    data () {
        return {
            
        }
    },
    mounted () {

    }
}
</script>

<style lang='scss' scoped>
    .main_component {
        flex-grow: 1;
        overflow-y: scroll;
        word-break: break-word;
    }

    @media screen and (min-width: 769px) {
        
    }
</style>