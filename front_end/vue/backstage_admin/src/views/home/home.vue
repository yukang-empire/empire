<template>
    <div class="home">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icongaishu"></use>
                </svg>
                <span>经营概况</span>
            </p>
            <div class="profit">
                <ul class="flex_between">
                    <li class="flex_center" style="background-color: #8693f3;">
                        <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconzhuceyaoqing"></use>
                            </svg>
                        </div>
                        <router-link tag="div" to="/user/list">
                            <p>今日注册</p>
                            <b>{{ home_data.regUser }}</b>
                        </router-link>
                    </li>
                    <li class="flex_center" style="background-color: #ff9999;">
                        <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon48"></use>
                            </svg>
                        </div>
                        <div>
                            <p>今日充值收入</p>
                            <b>¥ {{ home_data.recharge }}</b>
                        </div>
                    </li>
                    <li class="flex_center" style="background-color: #a47bd0;">
                        <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icondingdan1"></use>
                            </svg>
                        </div>
                        <div>
                            <p>今日订单数</p>
                            <b>{{ home_data.day_order.num }}</b>
                        </div>
                    </li>
                    <li class="flex_center" style="background-color: #00cc99;">
                        <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon3"></use>
                            </svg>
                        </div>
                        <div>
                            <p>今日订单收入</p>
                            <b>¥ {{ home_data.day_order.total_amount }}</b>
                        </div>
                    </li>
                </ul>
                <ul class="flex_between" style="margin-top: 30px;">
                    <li class="flex_center" style="background-color: #00a9cc;">
                        <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconshuliang"></use>
                            </svg>
                        </div>
                        <div>
                            <p>开通会籍数</p>
                            <b>{{ home_data.distribut.distribut }}</b>
                        </div>
                    </li>
                    <li class="flex_center" style="background-color: #9e9e9e;">
                        <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconshouruliushui"></use>
                            </svg>
                        </div>
                        <div>
                            <p>会籍收入</p>
                            <b>¥ {{ home_data.distribut.day_order.total_amount }}</b>
                        </div>
                    </li>
                    <li class="flex_center" style="background-color: transparent">
                        
                    </li>
                    <li class="flex_center" style="background-color: transparent">
                        
                    </li>
                </ul>
            </div>
        </div>

        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconshitu_gaikuang"></use>
                </svg>
                <span>待办事项</span>
            </p>
            <div class="profit wait">
                <ul class="flex_between">
                    <li class="flex_center">
                        <div class="flex_center" style="background-color: #8693f3;">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon3tixian"></use>
                            </svg>
                        </div>
                        <router-link tag="div" to="/finance/cash_out">
                            <b>{{ home_data.store_withdrawals }}</b>
                            <p>提现申请</p>
                        </router-link>
                    </li>
                    <li class="flex_center">
                        <div class="flex_center" style="background-color: #ff9999;">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconqia"></use>
                            </svg>
                        </div>
                        <router-link tag="div" to="/order/transfer/list">
                            <b>{{ home_data.card_out }}</b>
                            <p>转让卡待审</p>
                        </router-link>
                    </li>
                    <li class="flex_center">
                        <div class="flex_center" style="background-color: #a47bd0;">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconruzhuchenggongdapx"></use>
                            </svg>
                        </div>
                        <div>
                            <b>{{ home_data.store_apply }}</b>
                            <p>商家入驻审核</p>
                        </div>
                    </li>
                    <li class="flex_center">
                        <div class="flex_center" style="background-color: #00cc99;">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconyijianfankui"></use>
                            </svg>
                        </div>
                        <div>
                            <b>{{ home_data.feedback }}</b>
                            <p>意见反馈</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 图表echarts -->
        <echart :echarts_data_week='echarts_data_week' :echarts_data_mon='echarts_data_mon' />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import echart from "@/components/echart.vue";

@Component({
    components: {
        echart
    }
})

export default class home extends Vue{
    //首页数据
    private home_data: object = {
        regUser: 0,
        recharge: 0,
        day_order: {
            num: 0,
            total_amount: 0
        },
        distribut: {
            day_order: {
                num: '',
                total_amount: ''
            }, 
            distribut: ''
        },
        store_withdrawals: 0,
        card_out: 0,
        store_apply: 0,
        feedback: 0,
    };
    //周图表数据 API可查看官网文档 https://www.echartsjs.com/option.html#title;
    private echarts_data_week: any = {
        tooltip: {},
        xAxis: {
            name: '日期',
            data: [],
            axisLabel: {
                lineHeight: '30'
            }
        },
        yAxis: {
            name: '收入(元)',
            nameGap: '20',
        },
        series: [{
            name: '收入',
            type: 'line',
            data: []
        }],
        itemStyle: {
            color: '#409EFF',
            borderColor: 'rgb(164, 123, 208)',
            borderWidth: '2',
        },
        weeks_order: {
            num: 0,
            total_amount: 0
        },
        chart_weeks_order: {}
    };
    //月图表
    private echarts_data_mon: any = {
        tooltip: {},
        xAxis: {
            name: '日期',
            data: [],
            axisLabel: {
                lineHeight: '30'
            }
        },
        yAxis: {
            name: '收入(元)',
            nameGap: '20',
        },
        series: [{
            name: '收入',
            type: 'line',
            data: []
        }],
        itemStyle: {
            color: '#409EFF',
            borderColor: 'rgb(164, 123, 208)',
            borderWidth: '2',
        },
        month_order: {
            num: 0,
            total_amount: 0
        },
        chart_month_order: {}
    };

    //格式化时间为月-日
    init_time (time: any) {
        //获取月份 index从0开始算的 所以加1
        var mon = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
        //获取日
        var day = time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate();
        return mon + '-' + day;
    };

    mounted () {
        //获取首页数据
        this.$store.dispatch("home_data").then( (response: any) => {
            console.log("首页数据", response);
            if (response.code == 0) {
                var res = response.data;
                this.home_data = res;
                this.echarts_data_week.weeks_order = res.weeks_order;
                this.echarts_data_mon.month_order = res.month_order;
                this.echarts_data_week.chart_weeks_order = res.chart_weeks_order;
                this.echarts_data_mon.chart_month_order = res.chart_month_order;

                //获取最近一周和最近一月X轴的日期 以及对应Y轴的数据
                var time = new Date();
                var week_value = this.echarts_data_week.chart_weeks_order;
                var mon_value = this.echarts_data_mon.chart_month_order;
                var is_week = week_value.length > 0;
                for (var i = 0; i < 30; i++) {
                    var prev_time = new Date(time.getTime() - i*24*60*60*1000);
                    var final_time = this.init_time(prev_time);
                    if (i < 7) {
                        this.echarts_data_week.xAxis.data.unshift(final_time);
                        if (is_week) {
                            var week_days = week_value[i] ? week_value[i].total_amount : 0;
                            //注入周图表Y轴收入数据
                            this.echarts_data_week.series[0].data.push(week_days);
                        };
                    };
                    this.echarts_data_mon.xAxis.data.unshift(final_time);
                    var mon_days = mon_value[i] ? mon_value[i].total_amount : 0;
                    //注入月图表Y轴收入数据
                    this.echarts_data_mon.series[0].data.push(mon_days);
                };
            }else {
                //获取失败
                this.$message({ message: response.msg, type: "error", duration: 2500 });
            };
        });
    };
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        .home {
            padding: 0 20px;

            .profit {
                color: #fff;

                .flex_between {
                    justify-content: space-around;
                }

                li {
                    border-radius: 8px;
                    min-width: 15%;
                    padding: 15px 20px 15px 15px;
                    cursor: pointer;

                    .icon {
                        width: 3rem;
                        height: 3rem;
                        margin-right: 15px;
                    }

                    &>div:nth-of-type(2) {
                        text-align: center;
                    }

                    p {
                        margin-bottom: 0;
                    }

                    b {
                        font-size: 1.5rem;
                        white-space: nowrap;
                    }
                }
                
                li.flex_center {
                    justify-content: unset;
                }
            }

            .profit.wait {
                color: #666;

                li {
                    min-width: 8%;

                    &>div:first-of-type {
                        width: 4rem;
                        height: 4rem;
                        margin-right: 10px;
                        border-radius: 50%;
                        background-color: #ccc;
                    }
                    
                    &>div:nth-of-type(2) {
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        justify-content: center;
                    }

                    .icon {
                        color: #fff;
                        width: 2.5rem;
                        height: 2.5rem;
                        margin: 0;
                    }

                    b {
                        font-size: 1.2rem;
                        color: #333;
                    }
                }
                
            }
        }
    }
</style>