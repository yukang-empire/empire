<template>
  <div class="login">
    <h1>良乐科技-管理后台</h1>
    <div class="main">
        <img src="@/commons/imgs/logo01.png" alt="">
        <div class="form">
            <el-input
                clearable
                placeholder="请输入账号"
                v-model="form_data.account">
                <svg slot="prefix" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-denglu"></use>
                </svg>
            </el-input>
            <el-input
                clearable
                show-password
                placeholder="请输入密码"
                v-model="form_data.password">
                <svg slot="prefix" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mima"></use>
                </svg>
            </el-input>
            <el-button type="success" :loading="form_data.login" @click='login'>登录</el-button>
        </div>
        <div class="bottom">
            <el-button type="text">找回密码</el-button>
            <el-button type="text">注册账号</el-button>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

//TypeScript装饰器语法
@Component({
  components: {
      
  },
})

export default class login extends Vue {
    private form_data: object = {
        account: '',
        password: '',
        login: false
    };
    //登录
    login () {
        this.form_data.login = true;
        this.$router.push({ path: 'home' });
    }
}
</script>

<style>
    
</style>