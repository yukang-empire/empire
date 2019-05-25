<template>
    <div class="find">
        <header class="flex_center">
            <h2>找回密码</h2>
        </header>
        <login_component :send_data='send_data' />
    </div>
</template>

<script>
import login_component from '@/common/components/login.vue';

export default {
    name: 'find',
    components: {
        login_component
    },
    data () {
        return {
            send_data: {
                type: 'find',
                //找回密码页面是用原密码还是用验证码
                is_verify_code: true
            }
        }
    }
}
</script>

<style lang='scss' scoped>
    header {
        color: #fff;
        padding: 6rem 0 0 0;
        flex-direction: column;
    }
    header h2 {
        font-size: 1.25rem;
        letter-spacing: 2px;
    }
    @media screen and (min-width: 769px) {
        header {
            padding: 14rem 0 1rem 0;
        }
        header h2 {
            font-size: 1.8rem;
        }
    }
</style>