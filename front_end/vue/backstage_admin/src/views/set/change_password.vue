<template>
    <div class="change_password">
        <add :add_data='change_password_data' @add_submit='change_password' />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import add from "@/components/add.vue";

@Component({
    components: {
        add
    }
})

export default class change_password extends Vue{
    private change_password_data: any = {
        name: '修改密码',
        type: 'change_password',
        title: '填写密码相关信息',
        icon: '#iconmima'
    };

    mounted () {
        
    };

    beforeRouteLeave (to: any, from: any, next: () => void): void {
        if (sessionStorage.getItem('add_form_data')) {
            this.$confirm("表单数据将会被全部清空，是否继续离开？", "提示", { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then( () => {
                sessionStorage.removeItem('show_license');
                sessionStorage.removeItem('show_store');
                sessionStorage.removeItem('checkbox_checked');
                sessionStorage.removeItem('add_form_data');
                next();
            }).catch(() => {
                next(false);
            });
        }else {
            next();
        };
    };

    //修改密码
    change_password (ruleForm) {
        var that = this;
        this.$store.dispatch("change_password", ruleForm).then( (res: any) => {
            console.log("修改密码", res);
            if (res.code == 0 || res.status == 1) {
                sessionStorage.removeItem('add_form_data');
                //修改成功提示
                this.$message({ message: '修改员工密码成功！', type: "success", duration: 1500 });
            }else {
                //失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
    };
    
}

</script>

<style lang="scss" scoped>

    @media screen and (min-width: 769px) {
        
    }
</style>