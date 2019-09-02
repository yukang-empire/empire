<template>
    <div class="c_header flex_between">
        <div class="flex_center">
            <img src="../../../../assets/imgs/logo.png" alt="logo" class="rotation">
            <img src="../../../../assets/imgs/logo_text.png" alt="logo_text" class="logo_text">
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
                        <div class="flex_center">
                            <el-button type="text" @click='dialog_password.is_dialog = true'>修改密码</el-button>
                            <el-button type="text" @click='logout'>退出登录</el-button>
                        </div>
                    </div>
                    <el-button>{{ role_name }}</el-button>
                </el-tooltip>
            </div>
        </div>
        <!-- 修改密码 -->
        <dialog_form :dialog_data='dialog_password' @sure='revise_password' />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import dialog_form from "@/components/dialog_form.vue";

@Component({
    components: {
        dialog_form
    }
})

export default class c_header extends Vue{
    private role_name: any = sessionStorage.getItem('role_name') ? sessionStorage.getItem('role_name') : 'admin';

    //验证再次输入密码
    private re_pass: any = (rule, value, callback) => {
        if (sessionStorage.getItem('newPwd')) { this.dialog_password.form_data.newPwd = JSON.parse(sessionStorage.getItem('newPwd')) };
        if (value !== this.dialog_password.form_data.newPwd) {
            callback(new Error('两次输入的密码不一致'));
        }else {
            callback();
        };
    };

    //修改密码
    private dialog_password: any = {
        type: 'password',
        is_dialog: false,
        title: '修改密码',
        sure_name: '确定修改',
        //表单数据
        form_data: {
            newPwd: '',
            password: '',
            re_newPwd: ''
        },
        //表单规则
        form_rules: {
            password: [
                { required: true, message: '请输入原密码', trigger: 'blur' },
            ],
            newPwd: [
                { required: true, message: '请输入新密码', trigger: 'blur' },
            ],
            re_newPwd: [
                { required: true, message: '请再次输入新密码', trigger: 'blur' },
                { validator: this.re_pass, trigger: "change" }
            ],
        }
    };

    mounted () {
        
    };

    //修改密码
    revise_password () {
        var that = this;
        this.$store.dispatch("revise_password", { password: this.dialog_password.form_data.password, newPwd: this.dialog_password.form_data.newPwd }).then( (res: any) => {
            console.log("修改密码", res);
            if (res.code == 0 || res.status == 1) {
                this.$message({ type: 'success', message: '修改成功！请重新登录！', duration: 1500 });
                setTimeout(() => {
                    that.$router.push({ path: '/login' });
                }, 500);
            }else {
                //请求失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
    };

    //登出
    logout () {
        this.$confirm('确定登出？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
            //删掉临时数据
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('role_name');
            sessionStorage.removeItem('Permission');
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

        .logo_text {
            width: 70px;
            margin-left: 13px;
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
            padding: 20px 30px;
            box-shadow: 0 4px 8px rgba(10,16,20,.24),0 0 8px rgba(10,16,20,.12);
            border-radius: 5px;
            font-size: 1rem;
            margin-top: 6px;


            img {
                width: 80px;
                border-radius: 50%;
            }

            .el-button {
                letter-spacing: 0;
                font-size: 0.95rem;
                margin: 0 10px;
            }

            p {
                margin: 5px 0 15px 0;
                font-weight: 900;
            }
        }
    }
</style>