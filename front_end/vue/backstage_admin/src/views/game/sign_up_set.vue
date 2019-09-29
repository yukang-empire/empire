<template>
	<div class="sign_up_set">
		<add :add_data='sign_up_set_data' @add_submit='add_business' />
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

	beforeRouteLeave (to: any, from: any, next: () => void): void {
		if (sessionStorage.getItem('add_form_data')) {
			this.$confirm("表单数据将会被全部清空，是否继续离开？", "提示", { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then( () => {
				sessionStorage.removeItem('show_license');
				sessionStorage.removeItem('show_store');
				sessionStorage.removeItem('checkbox_checked');
				sessionStorage.removeItem('add_form_data');
				next();
			}).catch(() => {
				next(false);
			});
		}else {
			next();
		};
	};

	//新增配置
	add_sign_up_set (ruleForm) {
		this.$store.dispatch("add_sign_up_set", ruleForm).then( (res: any) => {
			console.log("新增商家", res);
			if (res.code == 0 || res.status == 1) {
				//新增成功提示
				this.$message({ message: '新增成功！', type: "success", duration: 1500 });
				this.$router.push({ path: '/game/sign_up' });
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