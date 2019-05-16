<template>
    <div class="dialog flex_center fixed_top" v-if='dialog.is_open' @click.self='dialog.is_open = false'>
        <div class="main">
            <h3>提示</h3>
            <div class="content">
                <span>{{ dialog.msg }}</span>
            </div>
            <div class="normal flex_between">
                <button class="cancel" @click='dialog.is_open = false'>取消</button>
                <button class="sure" @click='dialog.is_open = false'>确定</button>
            </div>
            <!-- <div class="no_cancel">
                <button class="sure" @click='dialog.is_open = false'>确定</button>
            </div> -->

            <!-- <div class="QR_code">
                <img src="imgs/QR_code.png" alt="QR_code">
                <p>长按识别二维码</p>
            </div> -->
            
            <svg class="icon" aria-hidden="true" @click='dialog.is_open = false'>
                <use xlink:href="#icon-chahao"></use>
            </svg>
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

    export default class dialog extends Vue {
        //从父组件获取数据
        @Prop() private dialog !: object;
        
    }
</script>