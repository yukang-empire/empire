<template>
    <div class="store_add">
        <add :add_data='store_add_data' @add_submit='add_store' />
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
    private store_add_data: any = {
        name: '门店',
        type: 'store',
        title: '填写门店信息',
        icon: '#iconruzhuchenggongdapx',
        select_name: '商家'
    };

    mounted () {
        
    };

    //新增门店
    add_store (ruleForm) {
        // this.$store.dispatch("add_business", ruleForm).then( (res: any) => {
        //     console.log("新增门店", res);
        //     if (res.code == 0 || res.status == 1) {
        //         sessionStorage.removeItem('show_license');
        //         sessionStorage.removeItem('show_store');
        //         sessionStorage.removeItem('add_form_data');
        //         //新增成功提示
        //         this.$message({ message: '新增成功！', type: "success", duration: 1500 });
        //         this.$router.push({ path: '/business/store/list' });
        //     }else {
        //         //失败提示
        //         this.$message({ message: res.msg, type: "error", duration: 2500 });
        //     };
        // });
    };
    
}

</script>

<style lang="scss" scoped>

    @media screen and (min-width: 769px) {
        
    }
</style>