<template>
    <div class="repeat_div">
        <p>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-qushi"></use>
            </svg>
            <span>收入趋势</span>
        </p>
        <div class="echart_title flex_between">
            <h4 v-if='is_select'>
                <span>本周订单总数: {{ echarts_data_week.weeks_order.num }}</span>
                <span>本周订单总额: ¥{{ echarts_data_week.weeks_order.total_amount }}</span>
            </h4>
            <h4 v-show='!is_select'>
                <span>本月订单总数: {{ echarts_data_mon.month_order.num }}</span>
                <span>本月订单总额: ¥{{ echarts_data_mon.month_order.total_amount }}</span>
            </h4>
            <div>
                <span :class="{select: is_select}" @click='switch_select(0)'>本周</span>
                <span :class="{select: !is_select}" @click='switch_select(1)'>本月</span>
            </div>
        </div>
        <!-- 一个页面多个图表的情况下 请勿使用v-if切换 会报错 -->
        <!-- 本周图表 -->
        <div class="echarts" ref='echarts_week' v-show='is_select'></div>
        <!-- 本月图表 -->
        <div class="echarts" ref='echarts_mon' v-show='!is_select'></div>
    </div>
</template>

<script>
//ECharts
import Echarts_week from 'echarts';
import Echarts_mon from 'echarts';

export default {
    name: 'echart',
    props: [
        'echarts_data_week',
        'echarts_data_mon',
    ],
    data () {
        return {
            is_select: true
        }
    },
    methods: {
        switch_select (num) {
            if (num == 0) {
                this.is_select = true;
            }else {
                //如果不硬性指定宽度 则css的100%宽度无效
                this.$refs.echarts_mon.style.width = this.$refs.echarts_week.offsetWidth + 'px';
                //不要在mounted钩子函数中就加载 否则宽度会失效
                Echarts_mon.init(this.$refs.echarts_mon).setOption(this.echarts_data_mon);
                this.is_select = false;
            };
        },
        //格式化时间为月-日
        init_time (time) {
            //获取月份 index从0开始算的 所以加1
            var mon = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
            //获取日
            var day = time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate();
            return mon + '-' + day;
        },
    },
    mounted () {
        //只加载周图表(需要异步 因为数据是请求后台得来的) 月图表不要一起加载 否则宽度会有问题
        setTimeout(() => {
            Echarts_week.init(this.$refs.echarts_week).setOption(this.echarts_data_week);
        }, 300);
    }
}
</script>

<style lang='scss' scoped>
    .echarts {
        width: 100%;
        height: 400px;
    }
    .repeat_div {
        padding-bottom: 0;

        .echart_title {
            color: #333;

            &>div {
                margin-right: 5%;

                span {
                    margin-left: 15px;
                    cursor: pointer;
                }

                span:first-of-type {
                    padding-right: 15px;
                    border-right: 1px solid $main;
                }

                span.select {
                    color: $main;
                    font-weight: 900;
                }
            }
            
            h4 {
                margin-left: 5%;

                span {
                    margin-right: 50px;
                }
            }

        }
    }
    @media screen and (min-width: 769px) {
        
    }
</style>