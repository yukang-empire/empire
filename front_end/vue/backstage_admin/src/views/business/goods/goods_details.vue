<template>
    <div class="goods_details">
        <!-- 基本信息 -->
        <base_info :base_info="base_info" :base_info_type='base_info_type' />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import base_info from "@/components/base_info.vue";

@Component({
    components: {
        base_info
    }
})

export default class goods_details extends Vue{
    private base_info: any = {};
    private base_info_type: string = "goods";

    mounted () {
        var that: any = this;
        //请求商品的基本信息
        this.$store.dispatch("goods_details", { goods_id: this.$route.query.goods_id}).then( res => {
            console.log("商品详情", res);
            if (res.code == 0 || res.status == 1) {
                this.base_info = res.result;
                this.base_info.icon = "#iconshangpin";
                this.base_info.title = "商品信息";
            }else {
                //获取失败提示
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