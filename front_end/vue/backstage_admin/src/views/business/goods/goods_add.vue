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

    //新增商品
    add_goods (ruleForm) {
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
    };
    
}

</script>

<style lang="scss" scoped>

    @media screen and (min-width: 769px) {
        
    }
</style>