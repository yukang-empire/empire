<template>
    <div class="share_profit_details">
        <!-- 基本信息 -->
        <base_info :base_info="base_info" :base_info_type='base_info_type' />
        <!-- 统计信息 -->
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconshitu_gaikuang"></use>
                </svg>
                <span>统计信息</span>
            </p>
            <ul class="copy_table">
                <li class="flex_between">
                    <span>本期分润酷点</span>
                    <span>本期分润人数</span>
                </li>
                <li class="flex_between">
                    <span>2566.00</span>
                    <span>10</span>
                </li>
            </ul>
        </div>
        <!-- 本期分润记录 -->
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconyijianfankui"></use>
                </svg>
                <span>本期分润记录</span>
            </p>
            <table_page :table_data='table_data_record' />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import base_info from "@/components/base_info.vue";
import table_page from "@/components/table_page.vue";

@Component({
    components: {
        base_info,
        table_page
    }
})

export default class share_profit_details extends Vue{
    private base_info: any = {
        title: '基本信息',
        icon: '#iconqita'
    };
    private base_info_type: string = "share_profit";
    
    //本期分润记录
    private table_data_record: any = {
        //表格
        table: {
            //属于哪个表格
            which: 'share_profit_record',
            //是否多选
            checkbox: false,
            //是否固定表头
            is_height: "auto",
            //表格数据
            lists: [{num: '康大大'}],
        },
        //页码
        page: {
            //是否显示页码
            is_page: true,
            //当前页码
            current_page: 1,
            //每页显示的数量
            size: 5,
            sizes: [5, 10],
            //总数量
            total: 0,
        }
    };

    mounted () {
        //请求分润记录
        this.$store.dispatch("share_profit_details", { club_id: this.$route.query.club_id}).then( res => {
            console.log("分润记录", res);
            var that: any = this;
            if (res.code == 0 || res.status == 1) {
                
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

        .copy_table {
            margin-left: 50px;
        }

        .copy_table li span:last-of-type {
            text-align: center;
        }

        .copy_table .flex_between {
            justify-content: unset;
            margin-right: 25px;
        }
        .copy_table li span {
            margin-right: 40px;
        }
    }
</style>