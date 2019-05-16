<template>
    <div class="login fixed_top">
        <register :is_register = "is_register" />
    </div>
</template>

<script lang="ts">
    //必须先引入全局组件
    import { Component, Vue, Prop } from "vue-property-decorator";

    //typescript语法不能省略后缀.vue
    import register from '@/common/components/register.vue';

    //typescript装饰器语法 要引入的组件
    @Component({
        components: {
            register
        }
    })

    export default class login extends Vue {
        private is_register: any = false;
    }
</script>

<style lang='scss' scoped>
    .login {
        height: 100%;
    }
</style>