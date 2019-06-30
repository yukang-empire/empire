<template>
    <div class="c_main">
        <!-- 面包屑 -->
        <bread_crumb />
        <!-- 历史记录标签 -->
        <history_tag />
        <!-- 标题 -->
        <c_title />
        <transition name="fade-transform" mode="out-in">
            <router-view class="main_content"></router-view>
        </transition>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import bread_crumb from './bread_crumb.vue';
import history_tag from './history_tag.vue';
import c_title from './c_title.vue';

@Component({
    components: {
        bread_crumb,
        history_tag,
        c_title
    }
})

export default class c_main extends Vue{
    
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        
    }
</style>