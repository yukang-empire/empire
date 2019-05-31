<template>
    <div class="home">
        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gaishu"></use>
                </svg>
                <span>经营概况</span>
            </p>
            <div class="profit">
                <ul class="flex_between">
                    <li class="flex_center" style="background-color: #8693f3;">
                        <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-zhuceyaoqing"></use>
                            </svg>
                        </div>
                        <div>
                            <p>今日注册</p>
                            <b>18</b>
                        </div>
                    </li>
                    <li class="flex_center" style="background-color: #ff9999;">
                        <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-48"></use>
                            </svg>
                        </div>
                        <div>
                            <p>今日充值收入</p>
                            <b>¥2330.00</b>
                        </div>
                    </li>
                    <li class="flex_center" style="background-color: #a47bd0;">
                        <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-dingdan1"></use>
                            </svg>
                        </div>
                        <div>
                            <p>今日订单数</p>
                            <b>16</b>
                        </div>
                    </li>
                    <li class="flex_center" style="background-color: #00cc99;">
                        <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-3"></use>
                            </svg>
                        </div>
                        <div>
                            <p>今日订单收入</p>
                            <b>¥1266.00</b>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shitu_gaikuang"></use>
                </svg>
                <span>代办事项</span>
            </p>
            <div class="profit wait">
                <ul class="flex_between">
                    <li class="flex_center">
                        <div class="flex_center" style="background-color: #8693f3;">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-3tixian"></use>
                            </svg>
                        </div>
                        <div>
                            <b>6</b>
                            <p>提现申请</p>
                        </div>
                    </li>
                    <li class="flex_center">
                        <div class="flex_center" style="background-color: #ff9999;">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-qia"></use>
                            </svg>
                        </div>
                        <div>
                            <b>8</b>
                            <p>转让卡待审</p>
                        </div>
                    </li>
                    <li class="flex_center">
                        <div class="flex_center" style="background-color: #a47bd0;">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-ruzhuchenggongdapx"></use>
                            </svg>
                        </div>
                        <div>
                            <b>12</b>
                            <p>商家入驻审核</p>
                        </div>
                    </li>
                    <li class="flex_center">
                        <div class="flex_center" style="background-color: #00cc99;">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-yijianfankui"></use>
                            </svg>
                        </div>
                        <div>
                            <b>14</b>
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

<script>
import echart from '@/common/components/echart.vue';

export default {
    name: 'home',
    components: {
        echart
    },
    data () {
        return {
            //API可查看官网文档 https://www.echartsjs.com/option.html#title;
            //周图表数据
            echarts_data_week: {
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
            },
            //月图表数据
            echarts_data_mon: {
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
            },
        }
    },
    methods: {
        //格式化时间为月-日
        init_time (time) {
            //获取月份 index从0开始算的 所以加1
            var mon = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
            //获取日
            var day = time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate();
            return mon + '-' + day;
        }
    },
    created () {
        //获取最近一周和最近一月的日期
        var time = new Date();
        for (var i = 0; i < 31; i++) {
            var prev_time = new Date(time.getTime() - i*24*60*60*1000);
            var final_time = this.init_time(prev_time);
            if (i < 7) {
                this.echarts_data_week.xAxis.data.unshift(final_time);
            };
            this.echarts_data_mon.xAxis.data.unshift(final_time);
        };
        this.echarts_data_week.series[0].data = [5000, 22000, 18000, 28000, 30000, 18000, 22000];
        this.echarts_data_mon.series[0].data = [
            5000, 22000, 18000, 28000, 30000, 18000, 22000,18000, 28000,18000,
            5000, 22000, 18000, 28000, 30000, 18000, 22000,18000, 28000,18000,
            5000, 22000, 18000, 28000, 30000, 18000, 22000,18000, 28000,18000,18000,
        ];
    }
}
</script>


<style lang='scss' scoped>
    .home {
        padding: 0 20px;
    }
    
    .profit {
        color: #fff;

        .flex_between {
            justify-content: space-around;
        }

        li {
            border-radius: 8px;
            min-width: 15%;
            padding: 15px 20px 15px 15px;

            .icon {
                width: 3rem;
                height: 3rem;
                margin-right: 15px;
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
    
    @media screen and (min-width: 769px) {
        
    }
</style>