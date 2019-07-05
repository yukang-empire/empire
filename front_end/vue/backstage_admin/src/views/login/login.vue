<template>
    <div class="login">
        <header class="flex_center">
            <img src="@/assets/imgs/logo.png" alt="login">
            <h2>轻酷运营总后台-登录</h2>
        </header>

        <article>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="username">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icondenglu"></use>
                    </svg>
                    <el-input v-model="ruleForm.username" placeholder="请输入账户" clearable></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#iconmima"></use>
                    </svg>
                    <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password clearable @keyup.13.native="login('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login" :loading="is_loading">登录</el-button>
                </el-form-item>
            </el-form>
        </article>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from '@/assets/api/axios';

@Component({
    components: {
        
    }
})

export default class login extends Vue {
    private ruleForm: any = {
        username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
        password: ''
    };
    private is_loading: boolean = false;
    //验证规则
    private rules: object = {
        username: [
            { required: true, message: '请输入账户', trigger: 'blur' },
            // { min: 11, max: 11, message: '手机号码长度为11位', trigger: 'blur' },
            // { pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[189])\d{8}$/, message: "请输入正确格式的手机号码", trigger: "blur"}
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4, max: 16, message: '密码长度为4-16位', trigger: 'blur' },
            // { pattern: /^[\w]{6,16}$/, message: "密码由数字和字母构成", trigger: "blur"}
        ]
    };

    created () {
        //修改body背景色
        document.getElementsByTagName('body')[0].style.backgroundColor = '#2d3a4b';
    };
    //登录
    login() {
        //不这样定义any类型 typescript解释器就会报错
        let ref: any = this.$refs.ruleForm;
        ref.validate((valid: boolean) => {
            if (valid) {
                this.is_loading = true;
                //登录
                var send_data = JSON.stringify(this.ruleForm);
                axios.post("/api/login", send_data).then( (res: any) => {
                    if (res.code == 0) {
                        //临时存到sessionStorage里
                        sessionStorage.setItem("token", res.data.token);
                        sessionStorage.setItem("role", res.data.roles[0].RoleId);
                        sessionStorage.setItem("role_name", res.data.roles[0].RoleName);
                        //储存账户 方便用户下次登录
                        localStorage.setItem('username', this.ruleForm.username);
                        //登录成功提示
                        this.$router.push({ path: '/home' });
                        setTimeout( () => {
                            this.$message({ message: '登录成功！', type: "success", duration: 1500 });
                        }, 300);
                    }else {
                        //登录失败提示
                        this.$message({ message: res.msg, type: "error", duration: 2500 });
                    };
                    this.is_loading = false;
                }).catch( error => {
                    console.log("登录error", error.response);
                    this.$message({ message: error.response.data.code + "：" + error.response.data.msg, type: "error", duration: 2500 });
                });
            } else {
                this.$message({ message: "请完善登录信息！", type: 'error', duration: 2500 });
                return false;
            };
        });
    };

};
</script>

<style lang="scss">
    .login {

        .el-input__inner {
            border: none;
            border-radius: 0;
            padding-left: 5px;
            font-size: 1.05rem;
            color: #fff;
            background-color: transparent;
            border-bottom: 1px solid #999;
        }

        .el-button {
            width: 80%;
            height: 50px;
            font-size: 1.15rem;
            margin-top: 15px;
        }
    }

    @media screen and (min-width: 769px) {
        .login {

            .el-button--primary {
                width: 425px;
            }
        }
    }
</style>
<style lang='scss' scoped>
    header {
        color: #fff;
        padding: 7rem 0 0 0;
        flex-direction: column;
        
        h2 {
            letter-spacing: 2px;
            font-size: 1.5rem;
            margin-bottom: 2rem;
        }

        img {
            width: 80px;
            border-radius: 50%;
            margin-bottom: 5px;
        }
    }
    .icon {
        color: #fff;
        height: 25px;
        width: 1.5rem;
        padding: 0 10px 0 0;
        margin: 0 10px 0 0;
        border-right: 1px solid #999;
    }
    .el-input {
        width: 70%;
    }
    
    @media screen and (min-width: 769px) {
        header {
            padding: 14rem 0 0 0;

            h2 {
                font-size: 2rem;
            }

            img {
                width: 100px;
            }
        }

        .el-input {
            width: 380px;
        }

    }
</style>