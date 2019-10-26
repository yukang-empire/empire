
new Vue({
    el:'#app',
    data: {
        //请求域名
        domain: 'https://shop.technologyle.com',
        //弹框信息
        dialog: {
            is_open: false,
            msg: ''
        },
        //检测设备
        device_rele: {
            is_android: null,
            is_ios: null,
            is_wx: null,
            height: null,
            width: null
        },
        //首页数据
        home_data: {
            regUser: '',
            club: '',
            clubArea: [],
            regUserArea: [],
            regUserAge: {},
            regUserSex: {}
        },
        //年龄分布图表数据
        echarts_age_data: {
            tooltip: {
                
            },
            xAxis: {
                data: ["18岁以下", "19-28岁", "29-38岁", "39-48岁", "49-58岁", "58岁以上"],
                axisLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                },
            },
            yAxis: {
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#444'
                    }
                }
            },
            series: [
                {   
                    name:'男性人数',
                    type: 'bar',
                    data: [0, 0, 0, 0, 0, 0],
                    itemStyle: {
                        color: '#22FEFD',
                        
                    },
                    label: {
                        show: true,
                        position: 'top',
                    }
                },
                {
                    name:'女性人数',
                    type: 'bar',
                    data: [0, 0, 0, 0, 0, 0],
                    itemStyle: {
                        color: '#F2659A'
                    },
                    label: {
                        show: true,
                        position: 'top',
                    },
                    barGap: '0%'
                }
            ],
        },
        //性别分布图表数据
        echarts_sex_data: {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name:'性别占比',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    data: [
                        { value: 0, name: '女性', itemStyle:{ color : '#F2659A'} },
                        { value: 0, name: '男性', itemStyle:{ color : '#22FEFD'} },
                        { value: 0, name: '未知', itemStyle:{ color : '#FDC161'} },
                    ],
                    label: {
                        normal: {
                            show: true,
                            formatter: [
                                '{b}：{d}%'
                            ].join('\n'),
                            fontSize: '16',
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '25',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                }
            ],
        },
        //会员区域分布图表数据(饼状)
        echarts_area_number_data: {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                data: ['宝安区', '坪山区', '罗湖区', '龙岗区', '南山区', '福田区', '龙华区'],
                top: 30,
                bottom: 20,
                width: 300,
                left: 60,
                textStyle: {
		        	color: '#fff'
		        },
            },
            series: [
                {
                    name:'区域分布(深圳)',
                    type: 'pie',
                    radius : '50%',
                    center: ['50%', '60%'],
                    data: [
                        { value: 0, name: '宝安区', itemStyle:{ color : '#F2659A'} },
                        { value: 0, name: '坪山区', itemStyle:{ color : '#FDC161'} },
                        { value: 0, name: '罗湖区', itemStyle:{ color : '#9D6FCB'} },
                        { value: 0, name: '龙岗区', itemStyle:{ color : '#CCFE44'} },
                        { value: 0, name: '南山区', itemStyle:{ color : '#3AD2F2'} },
                        { value: 0, name: '福田区', itemStyle:{ color : '#71E46B'} },
                        { value: 0, name: '龙华区', itemStyle:{ color : '#3062BE'} },
                    ],
                    label: {
                        normal: {
                            show: false,
                            formatter: [
                                '{d}%'
                            ].join('\n'),
                            fontSize: '16',
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '11',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                }
            ],
        },
        //会员区域分布图表数据(柱状)
        echarts_area_number_data_02: {
            tooltip: {
                
            },
            xAxis: {
                data: ['宝安区', '坪山区', '罗湖区', '龙岗区', '南山区', '福田区', '龙华区'],
                axisLine: {
                    lineStyle: {
                        color: '#FFE324'
                    }
                },
                axisLabel: {
                    interval: 0,
                    rotate: 45,
                    margin: 12,
                }
            },
            yAxis: {
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#444'
                    }
                }
            },
            series: [
                {   
                    name:'此区域会员数',
                    type: 'bar',
                    data: [0,0,0,0,0,0,0],
                    itemStyle: {
                        color: '#FFE324',
                    },
                    label: {
                        show: true,
                        position: 'top',
                    }
                },
            ],
        },
        //会所区域分布图表数据
        echarts_area_club_data: {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                data: ['宝安区', '坪山区', '罗湖区', '龙岗区', '南山区', '福田区', '光明区', '龙华区'],
                top: 30,
                bottom: 20,
                width: 300,
                left: 50,
                textStyle: {
		        	color: '#fff'
		        },
            },
            series: [
                {
                    name:'区域分布(深圳)',
                    type: 'pie',
                    radius : '50%',
                    center: ['45%', '60%'],
                    data: [
                        { value: 0, name: '宝安区', itemStyle:{ color : '#F2659A'} },
                        { value: 0, name: '坪山区', itemStyle:{ color : '#FDC161'} },
                        { value: 0, name: '罗湖区', itemStyle:{ color : '#9D6FCB'} },
                        { value: 0, name: '龙岗区', itemStyle:{ color : '#CCFE44'} },
                        { value: 0, name: '南山区', itemStyle:{ color : '#3AD2F2'} },
                        { value: 0, name: '福田区', itemStyle:{ color : '#71E46B'} },
                        { value: 0, name: '光明区', itemStyle:{ color : '#6b886a'} },
                        { value: 0, name: '龙华区', itemStyle:{ color : '#3062BE'} },
                    ],
                    label: {
                        normal: {
                            show: false,
                            formatter: [
                                '{d}%'
                            ].join('\n'),
                            fontSize: '16',
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '11',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                }
            ],
        },
        //会所区域分布图表数据(柱状)
        echarts_area_club_data_02: {
            tooltip: {
                
            },
            xAxis: {
                data: ['宝安区', '坪山区', '罗湖区', '龙岗区', '南山区', '福田区', '光明区' ,'龙华区'],
                axisLine: {
                    lineStyle: {
                        color: '#22FEFD'
                    }
                },
                axisLabel: {
                    interval: 0,
                    rotate: 45,
                    margin: 12,
                }
            },
            yAxis: {
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#444'
                    }
                }
            },
            series: [
                {   
                    name:'此区域会所数',
                    type: 'bar',
                    data: [0,0,0,0,0,0,0,0],
                    itemStyle: {
                        color: '#22FEFD',
                    },
                    label: {
                        show: true,
                        position: 'top',
                    }
                },
            ],
        },
    },
    methods: {
        //判断返回的数据是否为JSON格式 如果不是 则转换成JSON格式
        is_JSON (data) {
            if( typeof(data) == 'string') {
                return JSON.parse(data);
            }else {
                return data;
            }
        },
        
        // 混合开发的h5与原生APP交互
        getInfo: function () {
            var that = this;
            //要发送的数据
            var data = {
                
            };
            //ios终端
            if (this.device_rele.is_ios) {
                this.setupWebViewJavascriptBridge( function(bridge) {
                    //getInfo为事先与ios开发人员约好的函数名 data为发送过去的数据 response为ios那边返回的数据
                    bridge.callHandler('getInfo', data, function(response) {
                        that.response = response;
                        localStorage.setItem('user_info', JSON.stringify(response));
                        that.peop.inviCode = response.inviCode;
                        //获取邀请码和二维码 请求后端数据
                        that.get_code(response.inviCode);
                    });
                });
            }
            //android终端
            else if (this.device_rele.is_android) {
                //getInfo为事先与android终端开发人员约好的函数名 data为发送过去的数据(一般建议转成JSON.stringify字符串)
                // var data_ = JSON.stringify(data);
                // window.jsInterface.getInfo(data_);
                //把安卓返回的数据装起来
                var res = window.jsInterface.getInfo();
                var response = JSON.parse(res);
                localStorage.setItem('user_info', JSON.stringify(response));
                this.peop.inviCode = response.inviCode;
                //获取邀请码和二维码 请求后端数据
                that.get_code(response.inviCode);
            }else {
                return false;
            };
        },
        
        // 与IOS原生APP交互相关 必须要有
        setupWebViewJavascriptBridge: function (callback) {
            if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
            if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
        },
    },
    mounted: function () {
        // 判断浏览器终端类型
        var agent = navigator.userAgent;
        //Android终端
        this.device_rele.is_android = agent.indexOf('Android') != -1 || agent.indexOf('Adr') != -1 || agent.indexOf('Linux') != -1;
        //IOS终端
        this.device_rele.is_ios = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        //微信终端
        this.device_rele.is_wx = agent.toLowerCase().indexOf('micromessenger') != -1;
        //兼容获取页面高宽
        this.device_rele.width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
        this.device_rele.height = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;

        var that = this;
        
        var echarts_age = echarts.init(that.$refs.echarts_age);
        var echarts_sex = echarts.init(that.$refs.echarts_sex);
        var echarts_area_number = echarts.init(that.$refs.echarts_area_number);
        var echarts_area_number_02 = echarts.init(that.$refs.echarts_area_number_02);
        var echarts_area_club = echarts.init(that.$refs.echarts_area_club);
        var echarts_area_club_02 = echarts.init(that.$refs.echarts_area_club_02);

        // echarts_age.showLoading();
        // echarts_sex.showLoading();
        // echarts_area_number.showLoading();
        // echarts_area_number_02.showLoading();
        // echarts_area_club.showLoading();
        // echarts_area_club_02.showLoading();
        //请求数据
        $.ajax({
            type: "POST",
            // contentType: false,
            // processData: false,
            url: "https://manage.technologyle.com/api/PanelData",
            dataType : "json",
            data: '',
            success: function (res) {
                console.log(res);
                that.home_data = res.data;
                //会员年龄情况(分男女)
                that.echarts_age_data.series[0].data[0] = that.home_data.regUserAge.age18.male;
                that.echarts_age_data.series[0].data[1] = that.home_data.regUserAge.age19.male;
                that.echarts_age_data.series[0].data[2] = that.home_data.regUserAge.age29.male;
                that.echarts_age_data.series[0].data[3] = that.home_data.regUserAge.age39.male;
                that.echarts_age_data.series[0].data[4] = that.home_data.regUserAge.age49.male;
                that.echarts_age_data.series[0].data[5] = that.home_data.regUserAge.age58.male;

                that.echarts_age_data.series[1].data[0] = that.home_data.regUserAge.age18.female;
                that.echarts_age_data.series[1].data[1] = that.home_data.regUserAge.age19.female;
                that.echarts_age_data.series[1].data[2] = that.home_data.regUserAge.age29.female;
                that.echarts_age_data.series[1].data[3] = that.home_data.regUserAge.age39.female;
                that.echarts_age_data.series[1].data[4] = that.home_data.regUserAge.age49.female;
                that.echarts_age_data.series[1].data[5] = that.home_data.regUserAge.age58.female;
                //会员性别情况
                that.echarts_sex_data.series[0].data[0].value = that.home_data.regUserSex.female;
                that.echarts_sex_data.series[0].data[1].value = that.home_data.regUserSex.male;
                that.echarts_sex_data.series[0].data[2].value = that.home_data.regUserSex.secret;
                //深圳的会员分布区域情况
                var shenzhen_city = [];
                var length01 = that.home_data.regUserArea.length;
                for (var i = 0; i < length01; i++) {
                    if (that.home_data.regUserArea[i].city == '深圳市') {
                        shenzhen_city.push(that.home_data.regUserArea[i]);
                    };
                };
                console.log(shenzhen_city);
                var length02 = shenzhen_city.length;
                for (var j = 0; j < length02; j++) {
                    switch (shenzhen_city[j].district) {
                        case '宝安区': 
                            that.echarts_area_number_data.series[0].data[0].value = shenzhen_city[j].area_sum;
                            that.echarts_area_number_data_02.series[0].data[0] = shenzhen_city[j].area_sum;
                            break;
                        case '坪山新区': 
                            that.echarts_area_number_data.series[0].data[1].value = shenzhen_city[j].area_sum;
                            that.echarts_area_number_data_02.series[0].data[1] = shenzhen_city[j].area_sum;
                            break;
                        case '罗湖区': 
                            that.echarts_area_number_data.series[0].data[2].value = shenzhen_city[j].area_sum;
                            that.echarts_area_number_data_02.series[0].data[2] = shenzhen_city[j].area_sum;
                            break;
                        case '龙岗区': 
                            that.echarts_area_number_data.series[0].data[3].value = shenzhen_city[j].area_sum;
                            that.echarts_area_number_data_02.series[0].data[3] = shenzhen_city[j].area_sum;
                            break;
                        case '南山区': 
                            that.echarts_area_number_data.series[0].data[4].value = shenzhen_city[j].area_sum;
                            that.echarts_area_number_data_02.series[0].data[4] = shenzhen_city[j].area_sum;
                            break;
                        case '福田区': 
                            that.echarts_area_number_data.series[0].data[5].value = shenzhen_city[j].area_sum;
                            that.echarts_area_number_data_02.series[0].data[5] = shenzhen_city[j].area_sum;
                            break;
                        case '龙华区': 
                            that.echarts_area_number_data.series[0].data[6].value = parseInt(that.echarts_area_number_data.series[0].data[6].value) > 0 ? (parseInt(that.echarts_area_number_data.series[0].data[6].value) + parseInt(shenzhen_city[j].area_sum)) : shenzhen_city[j].area_sum;
                            that.echarts_area_number_data_02.series[0].data[6] = parseInt(that.echarts_area_number_data_02.series[0].data[6]) > 0 ? (parseInt(that.echarts_area_number_data_02.series[0].data[6]) + parseInt(shenzhen_city[j].area_sum)) : shenzhen_city[j].area_sum;
                            break;
                        case '龙华新区': 
                            that.echarts_area_number_data.series[0].data[6].value = parseInt(that.echarts_area_number_data.series[0].data[6].value) > 0 ? (parseInt(that.echarts_area_number_data.series[0].data[6].value) + parseInt(shenzhen_city[j].area_sum)) : shenzhen_city[j].area_sum;
                            that.echarts_area_number_data_02.series[0].data[6] = parseInt(that.echarts_area_number_data_02.series[0].data[6]) > 0 ? (parseInt(that.echarts_area_number_data_02.series[0].data[6]) + parseInt(shenzhen_city[j].area_sum)) : shenzhen_city[j].area_sum;
                            break;
                    };
                };
                //深圳的会所分布区域情况
                var shenzhen_city_02 = [];
                var length03 = that.home_data.clubArea.length;
                for (var i = 0; i < length03; i++) {
                    if (that.home_data.clubArea[i].city == '深圳市') {
                        shenzhen_city_02.push(that.home_data.clubArea[i]);
                    };
                };
                console.log(shenzhen_city_02);
                var length04 = shenzhen_city_02.length;
                for (var j = 0; j < length04; j++) {
                    switch (shenzhen_city_02[j].area) {
                        case '宝安区': 
                            that.echarts_area_club_data.series[0].data[0].value = shenzhen_city_02[j].area_sum;
                            that.echarts_area_club_data_02.series[0].data[0] = shenzhen_city_02[j].area_sum;
                            break;
                        case '坪山新区': 
                            that.echarts_area_club_data.series[0].data[1].value = shenzhen_city_02[j].area_sum;
                            that.echarts_area_club_data_02.series[0].data[1] = shenzhen_city_02[j].area_sum;
                            break;
                        case '罗湖区': 
                            that.echarts_area_club_data.series[0].data[2].value = shenzhen_city_02[j].area_sum;
                            that.echarts_area_club_data_02.series[0].data[2] = shenzhen_city_02[j].area_sum;
                            break;
                        case '龙岗区': 
                            that.echarts_area_club_data.series[0].data[3].value = shenzhen_city_02[j].area_sum;
                            that.echarts_area_club_data_02.series[0].data[3] = shenzhen_city_02[j].area_sum;
                            break;
                        case '南山区': 
                            that.echarts_area_club_data.series[0].data[4].value = shenzhen_city_02[j].area_sum;
                            that.echarts_area_club_data_02.series[0].data[4] = shenzhen_city_02[j].area_sum;
                            break;
                        case '福田区': 
                            that.echarts_area_club_data.series[0].data[5].value = shenzhen_city_02[j].area_sum;
                            that.echarts_area_club_data_02.series[0].data[5] = shenzhen_city_02[j].area_sum;
                            break;
                        case '光明新区': 
                            that.echarts_area_club_data.series[0].data[6].value = shenzhen_city_02[j].area_sum;
                            that.echarts_area_club_data_02.series[0].data[6] = shenzhen_city_02[j].area_sum;
                            break;
                        case '龙华区': 
                            that.echarts_area_club_data.series[0].data[7].value = parseInt(that.echarts_area_club_data.series[0].data[7].value) > 0 ? (parseInt(that.echarts_area_club_data.series[0].data[7].value) + parseInt(shenzhen_city_02[j].area_sum)) : shenzhen_city_02[j].area_sum;
                            that.echarts_area_club_data_02.series[0].data[7] = parseInt(that.echarts_area_club_data_02.series[0].data[7]) > 0 ? (parseInt(that.echarts_area_club_data_02.series[0].data[7]) + parseInt(shenzhen_city_02[j].area_sum)) : shenzhen_city_02[j].area_sum;
                            break;
                    };
                };
                
                //加载图表
                // echarts_age.hideLoading();
                // echarts_sex.hideLoading();
                // echarts_area_number.hideLoading();
                // echarts_area_number_02.hideLoading();
                // echarts_area_club.hideLoading();
                // echarts_area_club_02.hideLoading();

                echarts_age.setOption(that.echarts_age_data);  //年龄分布图表
                echarts_sex.setOption(that.echarts_sex_data);  //性别分布图表
                echarts_area_number.setOption(that.echarts_area_number_data);  //会员区域分布图表(饼状)
                echarts_area_number_02.setOption(that.echarts_area_number_data_02);  //会员区域分布图表(柱状)
                echarts_area_club.setOption(that.echarts_area_club_data);  //会所区域分布图表(饼状)
                echarts_area_club_02.setOption(that.echarts_area_club_data_02);  //会所区域分布图表(柱状)
            }
        });
    }
})