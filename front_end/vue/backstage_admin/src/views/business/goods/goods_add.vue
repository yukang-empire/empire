<template>
    <div class="store_add">
        <add :add_data='goods_add_data' @add_submit='add_store' />
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

export default class store_add extends Vue{
    private goods_add_data: any = {
        name: '商品',
        type: 'goods',
        title: '填写商品信息',
        icon: '#iconshangpin'
    };

    mounted () {
        //获取所有门店
        this.$store.dispatch("get_all_store").then( (res: any) => {
            console.log("所有门店", res);
            if (res.code == 0 || res.status == 1) {
                sessionStorage.setItem('all_store', res.result);
            }else {
                //获取失败提示
                this.$message({ message: res.msg, type: "error", duration: 2500 });
            };
        });
    };

    //新增门店
    add_store (ruleForm) {
        this.$store.dispatch("add_business", ruleForm).then( (res: any) => {
            console.log("新增门店", res);
            if (res.code == 0 || res.status == 1) {
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