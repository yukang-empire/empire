<template>
    <div class="layout full">
        <header_component />
        <div class='footer full'>
            <aside_component />
            <main_component />
        </div>
    </div>
</template>

<script>
//引入文件夹的话 需要此文件夹里有一个js文件 注入所有需要引入的vue组件
import { header_component, aside_component, main_component } from './components';

export default {
    name: 'layout',
    components: {
        header_component,
        aside_component,
        main_component
    },
    data () {
        return {

        }
    },
    methods: {

    },
    mounted () {
        //修改body背景色
        document.getElementsByTagName('body')[0].style.backgroundColor = '#fff';
    }
}
</script>

<style lang="scss">
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 14px;
        margin-bottom: 20px;
    }
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
        margin-top: 20px;
    }
</style>
<style lang='scss' scoped>
    .layout {
        display: flex;
        flex-direction: column;
    }
    .footer {
        display: flex;
        overflow: hidden;
    }
    
    @media screen and (min-width: 769px) {
        
    }
</style>