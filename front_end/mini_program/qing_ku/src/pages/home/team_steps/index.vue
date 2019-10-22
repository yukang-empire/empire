<template>
	<div class="own_steps">
	  <div class="header">
		  <p class="title">今日贡献步数</p>
		  <h3 class="steps">{{ today_steps }}</h3>
		  <div class="exchart">
			  <mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas" />
		  </div>
	  </div>
	  <div class="footer">
		  <h3 class="flex_between footer_h3">
			  <span>步数领取明细</span>
			  <span>酷点</span>
		  </h3>
		  <div class="flex_between footer_li" v-for="(item, index) in details_list" :key='item.id' v-if='details_list.length > 0'>
			  <div class="footer_li_left">
				  <span class="footer_li_left_span_01">{{ item.send_time }}</span>
				  <span>步数{{ item.steps }}步</span>
			  </div>
			  <div class="footer_li_right">+{{ item.give_points }}</div>
		  </div>
		  <div style="text-align: center;color: #ccc;font-size: 14px;padding: 15px 0 15px 0;" v-if='details_list.length <= 0'>
			  暂无数据
		  </div>
	  </div>
	</div>
  </template>
  
  <script>
  import Toast from "../../../../static/vant/toast/toast";
  import echarts from '../../../../static/plugins/echarts.min.js'
  import mpvueEcharts from 'mpvue-echarts'
  
  let chart = null;
  var date_list = [];
  var steps_data_list = [];
  
  function initChart(canvas, width, height) {
	chart = echarts.init(canvas, null, {
	  width: width,
	  height: height
	});
	canvas.setChart(chart);
  
	var option = {
	  tooltip: {
				  
	  },
	  xAxis: {
		  data: date_list,
		  axisLine: {
			  lineStyle: {
				  color: '#666666'
			  }
		  },
		  axisLabel: {
			  interval: 0,
			  margin: 12,
		  }
	  },
	  yAxis: {
		  show: false,
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
			  },
			  show: false
		  }
	  },
	  series: [
		  {   
			  name:'当日步数',
			  type: 'bar',
			  data: steps_data_list,
			  itemStyle: {
				  color: '#31BFAD',
			  },
			  label: {
				  show: true,
				  position: 'top',
			  },
			  barWidth: 30
		  },
	  ],
	};
  
	chart.setOption(option);
  
	return chart; // 返回 chart 后可以自动绑定触摸操作
  }
  
  export default {
	data () {
	  return {
		  echarts,
		  onInit: initChart,
		  details_list: [],
		  today_steps: '0'
	  }
	},
  
	components: {
	  mpvueEcharts
	},
	onLoad (options) {
	  
	},
	launchAppError (e) {
		
	},
	methods: {
	  //获取团队步数领取明细
	  get_personal_steps_details () {
		  var that = this;
		  wx.getStorage({
			  key: 'token',
			  success (res) {
				  that.$store.dispatch("personal_steps_details", {type: 2, p: 1, token: res.data}).then( (res) => {
					  console.log('团队步数领取明细', res);
					  if (res.data.status == 1) {
						  that.details_list = res.data.result;
						  var length = that.details_list.length;
						  for (var i = 0; i < length; i++) {
							  that.details_list[i].send_time = that.$moment(that.details_list[i].send_time * 1000).format('YYYY-MM-DD');
						  };
					  };
				  });
			  }
		  });
	  },
	  //柱形图团队步数
	  get_exchart_steps () {
		  var that = this;
		  wx.getStorage({
			  key: 'token',
			  success (res) {
				  that.$store.dispatch("team_steps", {p: 1, token: res.data}).then( (res) => {
					  console.log('柱形图团队步数', res);
					  if (res.data.status == 1) {
						  var tem_arr = [];
						  var tem_date_list = [];
						  var tem_steps_data_list = [];
						  tem_arr = res.data.result.list;
						  var length = tem_arr.length;
						  for (var i = 0; i < length; i++) {
							  var month = tem_arr[i].up_date.substr(5,2);
							  var day = tem_arr[i].up_date.substr(8,2);
							  tem_date_list[i] = month + '/' + day;
							  tem_steps_data_list[i] = tem_arr[i].steps;
						  };
						  date_list = tem_date_list.reverse();
						  steps_data_list = tem_steps_data_list.reverse();
						  that.today_steps = steps_data_list[steps_data_list.length - 1];
					  };
				  });
			  }
		  });
	  },
	},
  
	created () {
	  this.get_personal_steps_details();
	  this.get_exchart_steps();
	}
  }
  </script>
  
  <style scoped>
	  .header, .footer {
		  background-color: #fff;
	  }
	  .header {
		  padding: 15px 0 10px 0; 
		  text-align: center;
	  }
	  .title {
		  color: #5D5860;
	  }
	  .steps {
		  margin-bottom: 30px;
		  font-weight: 900;
		  font-size: 28px;
	  }
	  .exchart {
		  width: 100%;
			height: 220px;
	  }
	  .footer {
		  margin: 10px 0 25px 0;
	  }
	  .footer_h3 {
		  background-color: #FAFAFA;
		  padding: 10px 20px;
		  color: #333333;
		  font-weight: 900;
	  }
	  .footer_li {
		  color: #31BFAD;
		  padding: 10px 20px;
		  font-size: 14px;
		  border-bottom: 1px solid #E6E6E6;
	  }
	  .footer_li_left {
		  color: #666;
	  }
	  .footer_li_left_span_01 {
		  margin-right: 20px;
	  }
	  .footer_li:last-of-type {
		  border: none;
	  }
  </style>
  