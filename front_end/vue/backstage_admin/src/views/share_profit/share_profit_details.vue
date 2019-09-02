<template>
    <div class="share_profit_details">
        <!-- 基本信息 -->
        <base_info :base_info="base_info.need_data" :base_info_type='base_info_type' />
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
                    <span>{{ base_info.total_points }}</span>
                    <span>{{ base_info.bonus_num }}</span>
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
        icon: '#iconqita',
        need_data: {},
        total_points: '',
        bonus_num: ''
    };
    private base_info_type: string = "share_profit";
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
            lists: [],
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
        //请求分润详情
        var that: any = this;
        this.$store.dispatch("share_profit_details", { id: this.$route.query.id}).then( res => {
            console.log("分润详情", res);
            if (res.code == 0 || res.status == 1) {
                that.table_data_record.table.lists = res.result.list;
                //提取长度出来 提高for循环性能
                var lists = that.table_data_record.table.lists || [];
                var length = lists.length;
                //转换时间戳
                for (var i = 0; i < length; i++) {
                    switch (lists[i].bonus_status) {
                        case 1: 
                            lists[i].bonus_status = '是';
                            break;
                        case 0: 
                            lists[i].bonus_status = '否';
                            break;
                    };
                };
                that.base_info.need_data = res.result.bonus;
                that.base_info.need_data.status = that.base_info.need_data.status == 1 ? '未分' : '已分';
                var time = that.base_info.need_data.up_time * 1000 || '';
                that.base_info.need_data.up_time = that.$moment(time).format('YYYY-MM-DD HH:mm:ss');
                that.base_info.total_points = res.result.bonus.total_points;
                that.base_info.bonus_num = res.result.bonus.bonus_num;
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