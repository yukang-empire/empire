<template>
	<div class="cap_treasure_info">
		<order_info :order_data='cap_treasure_data' />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import order_info from '@/components/order_info.vue';

@Component({
	components: {
		order_info
	}
})

export default class cap_treasure_info extends Vue{
	private cap_treasure_data: any = {
		main_type: 'game',
		type: 'cap_treasure',
		current_state: '已确定',
		title01: '用户信息',
		title02: '私教课',
	}
}

</script>

<style lang="scss">

	@media screen and (min-width: 769px) {
		
	}
</style>