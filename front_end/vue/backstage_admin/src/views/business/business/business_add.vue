<template>
    <div class="business_add">
        <add :add_data='business_add_data' @add_submit='add_business' />
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

export default class business_add extends Vue{
    private business_add_data: any = {
        name: '商家',
        type: 'business',
        title: '填写商家信息',
        icon: '#iconzhuceyaoqing',
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

    //新增商家
    add_business (ruleForm) {
        this.$store.dispatch("add_business", ruleForm).then( (res: any) => {
            console.log("新增商家", res);
            if (res.code == 0 || res.status == 1) {
                sessionStorage.removeItem('show_license');
                sessionStorage.removeItem('show_store');
                sessionStorage.removeItem('add_form_data');
                //新增成功提示
                this.$message({ message: '新增成功！', type: "success", duration: 1500 });
                this.$router.push({ path: '/business/list' });
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