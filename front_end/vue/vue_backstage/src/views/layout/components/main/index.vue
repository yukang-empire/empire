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


<style lang='scss'>
    .repeat_div {
        color: #999;
        margin: 20px 0;
        font-size: 0.9rem;
        border-radius: 5px;
        border: 1px solid #ddd;
        padding: 10px 20px 30px 20px;

        &>p {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .icon {
            width: 1rem;
            height: 1rem;
            margin-right: 10px;
        }
    }
    .el-table th>.cell {
        color: #333;
        text-align: center;
    }
    .el-table .cell {
        text-align: center;
    }
    .el-table th>.cell {
        white-space: nowrap;
    }
    .el-pagination {
        text-align: right;
        margin-top: 15px;
    }
</style>
<style lang='scss' scoped>
    .main_component {
        flex-grow: 1;
        overflow-y: scroll;
        padding-bottom: 30px;
        word-break: break-word;
    }

    @media screen and (min-width: 769px) {
        
    }
</style>