<template>
    <div class="register">
        <header class="flex_center">
            <h2>注册轻酷账号</h2>
        </header>
        <login_component :send_data='send_data' />
    </div>
</template>

<script>
import login_component from '@/common/components/login.vue';

export default {
    name: 'register',
    components: {
        login_component
    },
    data () {
        return {
            send_data: {
                type: 'register',
                is_invi: false,
            }
        }
    }
}
</script>

<style lang='scss' scoped>
    header {
        color: #fff;
        padding: 4.5rem 0 0 0;
        flex-direction: column;
    }
    header h2 {
        font-size: 1.25rem;
        letter-spacing: 2px;
    }
    @media screen and (min-width: 769px) {
        header {
            padding: 13.5rem 0 1rem 0;
        }
        header h2 {
            font-size: 1.8rem;
        }
    }
</style>