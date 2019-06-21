<template>
    <div class="dialog_component">
        <section class="dialog flex_center fixed_top" v-if='dialog.is_open' @click.self='off_dialog'>
            <div class="main">
                <h3>提示</h3>
                <div class="content">
                    <span>{{ dialog.msg ? dialog.msg : '网络错误' }}</span>
                </div>
                <div class="no_cancel flex_center" v-if='dialog.type == 0'>
                    <button @click='off_dialog'>确定</button>
                </div>
                <div class="normal flex_between" v-if='dialog.type == 1'>
                    <button class="cancel" @click='off_dialog("cancel")'>取消</button>
                    <button @click='off_dialog("sure")'>确定</button>
                </div>
                <!-- 二维码展示 -->
                <div class="QR_code" v-if='dialog.type == 2'>
                    <img class="full_width" src="imgs/QR_code.jpg" alt="QR_code">
                    <p>扫描/长按识别二维码</p>
                </div>
                <!-- 叉号 -->
                <svg class="icon" aria-hidden="true" @click='off_dialog'>
                    <use xlink:href="#icon-chahao"></use>
                </svg>
            </div>
        </section>
    </div>
</template>

<script>

export default {
    name: 'dialog_component',
    props: [
        'dialog'
    ],
    methods: {
        off_dialog (state) {
            this.$emit('off_dialog', state);
        }
    }
}
</script>