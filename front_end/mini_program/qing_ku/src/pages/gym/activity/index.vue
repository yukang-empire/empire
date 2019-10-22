<template>
  <div class="activity">
	<web-view :src="url" bindmessage=""></web-view>
  </div>
</template>

<script>

export default {
  data () {
    return {
		url: ''
    }
  },

  methods: {
	
  },
  mounted () {
	var that = this;
	wx.getStorage({
		key: 'link',
		success (res) {
			that.url = res.data;
		}
	});
  }
}
</script>
