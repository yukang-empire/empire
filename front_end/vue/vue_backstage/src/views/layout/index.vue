<template>
    <div class="layout">
        <div>
            layout
        </div>
    </div>
</template>

<script lang="ts">
    //必须先引入全局组件
    import { Component, Vue, Prop } from "vue-property-decorator";

    //typescript装饰器语法 要引入的组件
    @Component({
        components: {
            
        }
    })

    export default class layout extends Vue {
        //从父组件获取数据
        @Prop() private father !: object;
        //数据(如果不清楚要创建什么类型的数据 就声明为any)
        private data: object = {

        };
        //方法
        methods () {

        };
    }
</script>

<style lang='scss' scoped>
    
</style>