<template>
    <div class="c_header flex_between">
        <div class="flex_center">
            <img src="../../../../assets/imgs/logo.png" alt="logo" class="rotation">
        </div>

        <div class="right">
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconyonghu2"></use>
                </svg>
            </div>
            <div class="role">
                <el-tooltip effect="light" placement="top">
                    <div slot="content" class="admin_info flex_center">
                        <img src="../../../../assets/imgs/logo.png" alt="logo">
                        <p>{{ role_name }}</p>
                        <el-button type="text" @click='logout'>退出登录</el-button>
                    </div>
                    <el-button>{{ role_name }}</el-button>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
    components: {
        
    }
})

export default class c_header extends Vue{
    private role_name: any = sessionStorage.getItem('role_name') ? sessionStorage.getItem('role_name') : 'admin';

    mounted () {
        
    };
    //登出
    logout () {
        this.$confirm('确定登出？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
            //删掉临时数据
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('role_name');
            this.$message({ type: 'success', message: '登出成功！请重新登录！', duration: 1500 });
            this.$router.push({ path: '/login' });
        });
    }
}

</script>

<style lang="scss" scoped>
    
    
    @media screen and (min-width: 769px) {

        .rotation{
            width: 45px;
            cursor: pointer;
            animation: rotation 3s linear infinite;
            -moz-animation: rotation 3s linear infinite;
            -webkit-animation: rotation 3s linear infinite;
            -o-animation: rotation 3s linear infinite;
        }
        @-webkit-keyframes rotation{
            from { transform: rotate(0deg);}
            to { transform: rotate(360deg);}
        }

        .right {
            display: flex;

            .icon {
                width: 1.8rem;
                height: 1.8rem;
                margin-right: 8px;
            }

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
        }
        
        .admin_info {
            color: #666;
            flex-direction: column;
            background-color: #fbfbfb;
            border: 1px solid #ccc;
            padding: 20px 50px;
            box-shadow: 0 4px 8px rgba(10,16,20,.24),0 0 8px rgba(10,16,20,.12);
            border-radius: 5px;
            font-size: 1rem;
            margin-top: 8px;

            img {
                width: 55px;
            }

            p {
                margin: 5px 0 10px 0;
            }
        }
    }
</style>