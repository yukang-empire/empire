<template>
    <div class="base_info">
        <!-- 图片放大 -->
        <el-dialog class="enlarge_img" :title="'查看' + base_info.title + '图片'" :visible.sync="dialog_img.is_enlarge" width="800px" center>
            <img :src="base_info.image" alt="img">
        </el-dialog>
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="base_info.icon"></use>
                </svg>
                <span>{{ base_info.title }}</span>
            </p>
            <div class="info">
                <ul class="flex_between" v-if='base_info_type == "user"'>
                    <li><img class="head_img" :src="base_info.image" alt="head_img"></li>
                    <li>
                        <p><span>昵称：</span><i>{{ base_info.nickname }}</i></p>
                        <p><span>生日：</span><i>{{ base_info.birthday }}</i></p>
                        <p><span>地区：</span><i>{{ base_info.province + base_info.city }}</i></p>
                        <p><span>注册时间：</span><i>{{ base_info.reg_time }}</i></p>
                    </li>
                    <li>
                        <p><span>性别：</span><i>{{ base_info.sex }}</i></p>
                        <p><span>手机号：</span><i>{{ base_info.mobile }}</i></p>
                        <p><span>实名认证：</span><i>{{ base_info.idcard > 0 ? '已认证' : '未认证' }}</i></p>
                        <p><span>详细地址：</span><i>{{ base_info.address ? base_info.address : base_info.province + base_info.city + base_info.district }}</i></p>
                    </li>
                </ul>

                <ul class="flex_between" v-if='base_info_type == "business"'>
                    <li><img @click='dialog_img.is_enlarge = true' :src="base_info.image" title="点击放大" alt="license"></li>
                    <li>
                        <p><span>商家名称：</span><i>{{ base_info.club_name }}</i></p>
                        <p><span>商家电话：</span><i>{{ base_info.tel }}</i></p>
                        <p><span>商家地址：</span><i>{{ base_info.province + base_info.city + base_info.area + base_info.street + base_info.address }}</i></p>
                    </li>
                    <li>
                        <p><span>联系人：</span><i>{{ base_info.nickname }}</i></p>
                        <p><span>手机号：</span><i>{{ base_info.mobile }}</i></p>
                        <p><span>入驻时间：</span><i>{{ base_info.add_time }}</i></p>
                    </li>
                </ul>

                <ul class="flex_between" v-if='base_info_type == "store"'>
                    <li><img @click='dialog_img.is_enlarge = true' :src="base_info.image" title="点击放大" alt="store_img"></li>
                    <li>
                        <p><span>门店名称：</span><i>{{ base_info.club_name }}</i></p>
                        <p><span>门店电话：</span><i>{{ base_info.tel }}</i></p>
                        <p><span>门店地址：</span><i>{{ base_info.province + base_info.city + base_info.area + base_info.street + base_info.address }}</i></p>
                    </li>
                    <li>
                        <p><span>联系人：</span><i>{{ base_info.nickname }}</i></p>
                        <p><span>手机号：</span><i>{{ base_info.mobile }}</i></p>
                        <p><span>营业时间：</span><i>{{ base_info.open_time }}</i></p>
                    </li>
                </ul>

                <ul class="flex_between" v-if='base_info_type == "goods"'>
                    <li><img @click='dialog_img.is_enlarge = true' :src="base_info.original_img" title="点击放大" alt="goods_img"></li>
                    <li>
                        <p><span>商品名称：</span><i>{{ base_info.goods_name }}</i></p>
                        <p><span>销售价格：</span><i>{{ base_info.shop_price }}元</i></p>
                        <p><span>结算价格：</span><i>{{ base_info.cost_price }}元</i></p>
                    </li>
                    <li>
                        <p><span>销量：</span><i>{{ base_info.sales_sum }}</i></p>
                        <p><span>所属门店：</span><i>{{ base_info.club_name }}</i></p>
                        <p><span>购买须知：</span><i>{{ base_info.card_info }}</i></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    components: {
        
    }
})

export default class base_info extends Vue{
    @Prop() private base_info !: any;
    @Prop() private base_info_type !: any;

    //放大图片
    private dialog_img: any = {
        is_enlarge: false,
    };
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        
    }
</style>