<template>
    <div class="add">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconjibenxinxi"></use>
                </svg>
                <span>填写商家信息</span>
            </p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="联系人" prop="realname">
                    <el-input v-model="ruleForm.realname" placeholder="请输入联系人" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="ruleForm.mobile" placeholder="请输入手机号码" clearable></el-input>
                </el-form-item>
                
                <el-form-item label="门店介绍" prop="content">
                    <el-input v-model="ruleForm.content" placeholder="请输入门店介绍" clearable @keyup.13.native="add_business('ruleForm')"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="add_business" :loading="is_loading">提交</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
    components: {
        
    }
})

export default class add extends Vue{
    private ruleForm: any = {
        realname: sessionStorage.getItem('realname') ? sessionStorage.getItem('realname') : '',
        mobile: ''
    };

    private is_loading: boolean = false;
    //验证规则
    private rules: object = {
        realname: [
            { required: true, message: '请输入账户', trigger: 'blur' },
            // { min: 11, max: 11, message: '手机号码长度为11位', trigger: 'blur' },
            // { pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[189])\d{8}$/, message: "请输入正确格式的手机号码", trigger: "blur"}
        ],
        mobile: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4, max: 16, message: '密码长度为4-16位', trigger: 'blur' },
            // { pattern: /^[\w]{6,16}$/, message: "密码由数字和字母构成", trigger: "blur"}
        ]
    };

    //重置
    resetForm () {
        //不这样定义any类型 typescript解释器就会报错
        let ref: any = this.$refs.ruleForm;
        ref.resetFields();
    };

    //新增商家
    add_business() {
        //不这样定义any类型 typescript解释器就会报错
        let ref: any = this.$refs.ruleForm;
        ref.validate((valid: boolean) => {
            if (valid) {
                this.is_loading = true;
                this.$store.dispatch("add_business", this.ruleForm).then( (res: any) => {
                    console.log("新增商家", res);
                    if (res.code == 0) {
                        //储存账户 方便用户下次登录
                        sessionStorage.setItem('realname', this.ruleForm.realname);
                        //新增成功提示
                        this.$message({ message: '新增成功！', type: "success", duration: 1500 });
                        this.$router.push({ path: '/business/list' });
                    }else {
                        //登录失败提示
                        this.$message({ message: res.msg, type: "error", duration: 2500 });
                    };
                    //取消转圈圈
                    this.is_loading = false;
                });
            } else {
                this.$message({ message: "请完善必填信息(带*号)！", type: 'error', duration: 2500 });
                return false;
            };
        });
    };

}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        
    }
</style>