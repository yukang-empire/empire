<template>
	<div class="sign_up_set">
		<add :add_data='sign_up_set_data' @add_submit='add_sign_up_set' />
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

export default class sign_up_set extends Vue{
	private sign_up_set_data: any = {
		name: '参数配置',
		type: 'sign_up_set',
		title: '填写基础参数',
		icon: '#iconshezhi',
	};

	mounted () {
		
	};

	//编辑配置
	add_sign_up_set (ruleForm) {
		var that = this;
		var start_clock = this.$moment(ruleForm.sign_up_s_time).format('HH:mm');
		var end_clock = this.$moment(ruleForm.sign_up_e_time).format('HH:mm');
		var entered_end = this.$moment(ruleForm.sign_up_deadline).format('HH:mm');
		var send_data = {
			start_clock: start_clock,
			end_clock: end_clock,
			entered_end: entered_end,
			clock_cut: ruleForm.sign_up_deduct,
			one_price: ruleForm.sign_up_price + '.00',
		};
		this.$store.dispatch("add_sign_up_set", send_data).then( (res: any) => {
			console.log("编辑配置", res);
			if (res.code == 0 || res.status == 1) {
				//新增成功提示
				this.$message({ message: '修改成功！', type: "success", duration: 1500 });
				sessionStorage.removeItem('add_form_data');
				setTimeout(() => {
					that.$router.push({ path: '/game/sign_up' });
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