<template>
  <div class="own_steps">
	<div class="header">
		<p class="title">今日步数</p>
		<h3 class="steps">1368 </h3>
		<div class="exchart">

		</div>
	</div>
	<div class="footer">
		<h3 class="flex_between footer_h3">
			<span>步数领取明细</span>
			<span>酷点</span>
		</h3>
		<div class="flex_between footer_li">
			<div class="footer_li_left">
				<span class="footer_li_left_span_01">2019-09-09</span>
				<span>步数3500步</span>
			</div>
			<div>+30</div>
		</div>
		<div class="flex_between footer_li">
			<div class="footer_li_left">
				<span class="footer_li_left_span_01">2019-09-09</span>
				<span>步数3500步</span>
			</div>
			<div>+30</div>
		</div>
	</div>
  </div>
</template>

<script>
import Toast from "../../../../static/vant/toast/toast";

export default {
  data () {
    return {
		
    }
  },

  components: {
	
  },
  onLoad (options) {
	
	
  },
  launchAppError (e) {
	  
  },
  methods: {
	
  },

  mounted () {
	var that = this;
	wx.getStorage({
		key: 'token',
		success (res) {
			
		}
	});
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
		font-size: 25px;
	}
	.exchart {
		width: 100%;
  		height: 200px;
	}
	.footer {
		margin: 10px 0 20px 0;
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
