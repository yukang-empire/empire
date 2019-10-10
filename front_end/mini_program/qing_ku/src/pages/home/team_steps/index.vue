<template>
	<div class="team_steps">
	  
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
	  
  </style>
  