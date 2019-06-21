<template>
    <div class="login">
        <header class="flex_center">
            <img src="@/common/imgs/logo.png" alt="login">
            <h2>轻酷-商家后台管理</h2>
        </header>
        <login_component :send_data='send_data' />
    </div>
</template>

<script>
import login_component from '@/common/components/login.vue';

export default {
    name: 'login',
    components: {
        login_component
    },
    data () {
        return {
            send_data: {
                type: 'login'
            }
        }
    },
    mounted () {
        //修改body背景色
        document.getElementsByTagName('body')[0].style.backgroundColor = '#2d3a4b';
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
        letter-spacing: 1px;
    }
    header img {
        width: 80px;
        border-radius: 50%;
        margin-bottom: 10px;
    }
    @media screen and (min-width: 769px) {
        header {
            padding: 13.5rem 0 0 0;
        }
        header h2 {
            font-size: 1.8rem;
        }
        header img {
            width: 100px;
            margin-bottom: 15px;
        }
    }
</style>