<template>
    <div class="goods_add">
        <add :add_data='goods_add_data' @add_submit='add_goods' />
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

export default class goods_add extends Vue{
    private goods_add_data: any = {
        name: '商品',
        type: 'goods',
        title: '填写商品信息',
        icon: '#iconshangpin',
        select_name: '门店'
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

    //新增/编辑商品
    add_goods (ruleForm) {
        if (this.$route.query.goods_id) {
            this.$store.dispatch("edit_goods", ruleForm).then( (res: any) => {
                console.log("编辑商品", res);
                if (res.code == 0 || res.status == 1) {
                    sessionStorage.removeItem('add_form_data');
                    //编辑成功提示
                    this.$message({ message: '编辑商品成功！', type: "success", duration: 1500 });
                    this.$router.push({ path: '/business/goods/list' });
                }else {
                    //失败提示
                    this.$message({ message: res.msg, type: "error", duration: 2500 });
                };
            });
        }else {
            this.$store.dispatch("add_goods", ruleForm).then( (res: any) => {
                console.log("新增商品", res);
                if (res.code == 0 || res.status == 1) {
                    sessionStorage.removeItem('add_form_data');
                    //新增成功提示
                    this.$message({ message: '新增商品成功！', type: "success", duration: 1500 });
                    this.$router.push({ path: '/business/goods/list' });
                }else {
                    //失败提示
                    this.$message({ message: res.msg, type: "error", duration: 2500 });
                };
            });
        }
    };
    
}

</script>

<style lang="scss" scoped>

    @media screen and (min-width: 769px) {
        
    }
</style>