<template>
	<div class="add_cap_treasure">
		<add :add_data='add_cap_treasure_data' @add_submit='add_add_cap_treasure' />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import add from "@/components/add.vue";

@Component({
	components: {
		add
	}
})

export default class add_cap_treasure extends Vue{
	private add_cap_treasure_data: any = {
		name: '新增期数',
		type: 'add_cap_treasure',
		title: '填写基础信息',
		icon: '#iconshezhi',
	};

	mounted () {
		
	};

	//新增
	add_add_cap_treasure (ruleForm) {
		var that = this;
		var goods_price = parseInt(ruleForm.cap_treasure_goods_price);
		var send_data = {
			goods_name: ruleForm.cap_treasure_goods_name,
			goods_price: goods_price,
			goods_points: ruleForm.cap_treasure_kd,
			total_num: ruleForm.cap_treasure_people,
			goods_image: ruleForm.goods_pic,
		};
		console.log(send_data);
		this.$store.dispatch("add_add_cap_treasure", send_data).then( (res: any) => {
			console.log("新增", res);
			if (res.code == 0 || res.status == 1) {
				//新增成功提示
				this.$message({ message: '新增期数成功！', type: "success", duration: 1500 });
				sessionStorage.removeItem('add_form_data');
				setTimeout(() => {
					that.$router.push({ path: '/game/cap_treasure' });
				}, 500);
			}else {
				//失败提示
				this.$message({ message: res.msg, type: "error", duration: 2500 });
			};
		});
	};
}

</script>

<style lang="scss" scoped>

	@media screen and (min-width: 769px) {

	}
</style>