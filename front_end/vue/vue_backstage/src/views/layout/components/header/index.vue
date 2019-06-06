<template>
    <div class="header_component flex_between">
        <div class="flex_center">
            <img src="@/common/imgs/logo02.png" alt="logo">
            <dialog_component :dialog='dialog' @off_dialog='off_dialog' />
        </div>
        <div class="right">
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yonghu2"></use>
                </svg>
            </div>
            <div class="role">
                <el-tooltip effect="light" placement="top">
                    <div slot="content" class="admin_info flex_center">
                        <img src="@/common/imgs/logo.png" alt="log">
                        <p>admin</p>
                        <el-button type="text" @click='logout'>退出登录</el-button>
                    </div>
                    <el-button>admin</el-button>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
import dialog_component from '@/common/components/dialog';

export default {
    name: 'header_component',
    components: {
        dialog_component
    },
    data () {
        return {
            dialog: {
                is_open: false,
                msg: '',
                type: 1,
                is_sure: false
            }
        }
    },
    methods: {
        off_dialog (state) {
            if (state == 'sure') {
                this.$router.push({ path: '/login' });
            };
            this.dialog.is_open = false;
        },
        logout () {
            this.dialog.is_open = true;
            this.dialog.msg = '确定退出登录?';
        }
    }
}
</script>


<style lang="scss">
    .el-tooltip__popper.is-light {
        background: none !important;
        border: none !important;
    }
    .el-tooltip__popper .popper__arrow {
        display: none !important;
    }
</style>
<style lang='scss' scoped>
    .role {

        .el-button {
            border: none;
            background-color: transparent;
            color: #fff;
            letter-spacing: 1px;
            padding: 0;
            margin-left: 5px;
        }
    }
    .header_component {
        color: #fff;
        padding: 0 20px;
        min-height: 60px;
        background-color: $back;
    }
    .header_component img {
        width: 40px;
    }
    .right {
        display: flex;
    }
    .right .icon {
        width: 1.7rem;
        height: 1.7rem;
        margin-right: 8px;
    }
    
    .admin_info {
        color: #666;
        flex-direction: column;
        background-color: #fbfbfb;
        border: 1px solid #ccc;
        padding: 20px 50px;
        box-shadow: 0 8px 8px rgba(10,16,20,.24),0 0 8px rgba(10,16,20,.12);
        border-radius: 10px;
        font-size: 1rem;
        margin-top: 4px;

        img {
            width: 50px;
        }

        p {
            margin: 5px 0 10px 0;
        }
    }
    @media screen and (min-width: 769px) {
        
    }
</style>
