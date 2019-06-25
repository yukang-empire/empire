<template>
    <div class="login">
        <header class="flex_center">
            <img src="@/assets/imgs/logo.png" alt="login">
            <h2>轻酷运营总后台-登录</h2>
        </header>

        <article>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账户" prop="account">
                    <el-input v-model="ruleForm.account"></el-input>
                </el-form-item>
            </el-form>
        </article>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    components: {
        
    }
})

export default class login extends Vue {
    private ruleForm: Object = {
        account: '',
    };
    //验证规则
    private rules: Object = {
        account: [
            { required: true, message: '请输入账户', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
    };

    created () {
        //修改body背景色
        // document.getElementsByTagName('body')[0].style.backgroundColor = '#2d3a4b';
    };

};
</script>

<style lang='scss' scoped>
    header {
        color: #fff;
        padding: 7rem 0 0 0;
        flex-direction: column;
        
        h2 {
            letter-spacing: 2px;
            font-size: 1.5rem;
        }

        img {
            width: 80px;
            border-radius: 50%;
            margin-bottom: 10px;
        }
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
    }
</style>