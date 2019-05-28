<template>
    <div class="layout full">
        <header_component />
        <div class='footer full'>
            <aside_component :role='role' />
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
            //登录后的角色信息
            role: {
                status: 'admin',
            }
        }
    },
    methods: {

    },
    mounted () {
        
    }
}
</script>

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