<template>
	<div class="sign_up_list">
		<div class="repeat_div">
			<p>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#iconfunnel"></use>
				</svg>
				<span>筛选数据</span>
			</p>
			<!-- 列表数据过滤 -->
			<list_filter 
			:send_data="send_data"
			:show_filter="show_filter"
			@search="search"
			@clear_search="clear_search"
			@change_time='change_time'
			@clear_time="clear_time"
			/>
		</div>

		<div class="repeat_div">
			<p class="flex_between">
				<span>
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#iconshitu_gaikuang"></use>
					</svg>
					<span>{{ $store.state.current_route ? $store.state.current_route.meta.title : "列表数据" }}</span>
				</span>
				<router-link to="/game/sign_up_set" tag="span" class="add_btn">
					<el-button size="medium" type="primary" icon="el-icon-setting">参数配置</el-button>
				</router-link>
			</p>
			<!-- 表格和页码 -->
			<table_page 
			:table_data='table_data'
			@change_page='change_page'
			@change_page_size='change_page_size'
			@change_state='change_state'
			@look_up='look_up'
			@edit='edit_person'
			/>
			
		</div>
		
        <dialog_form :dialog_data='dialog_person' @sure='sure_revise' />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import list_filter from "@/components/list_filter.vue";
import table_page from "@/components/table_page.vue";
import dialog_form from "@/components/dialog_form.vue";

@Component({
	components: {
		list_filter,
		table_page,
		dialog_form
	}
})

export default class sign_up_list extends Vue{

	private sign_up_id: any = '';
	//编辑健身卡
    private dialog_person: any = {
        type: 'invent_person',
        is_dialog: false,
        title: '修改虚拟人数',
        sure_name: '确定修改',
        //表单数据
        form_data: {
            person_num: ''
        },
        //表单规则
        form_rules: {
            person_num: [
                { required: true, message: '请输入虚拟人数', trigger: 'blur' },
            ]
        }
    };
	//表格、页码数据
	private table_data: any = {
		//表格
		table: {
			//属于哪个表格
			which: 'sign_up_list',
			//是否多选
			checkbox: true,
			//是否固定表头
			is_height: "auto",
			//表格数据
			lists: [],
		},
		//页码
		page: {
			//是否显示页码
			is_page: true,
			//当前页码
			current_page: sessionStorage.getItem("sign_up_list_p") ? parseInt(sessionStorage.getItem("sign_up_list_p")) : 1,
			//每页显示的数量
			size: sessionStorage.getItem("sign_up_list_size") ? parseInt(sessionStorage.getItem("sign_up_list_size")) : 10,
			sizes: [10, 15, 20],
			//总数量
			total: 0,
		}
	};
	//请求列表数据的参数
	private send_data: any = {
		p: sessionStorage.getItem("sign_up_list_p") ? sessionStorage.getItem("sign_up_list_p") : 1,
		size: sessionStorage.getItem("sign_up_list_size") ? sessionStorage.getItem("sign_up_list_size") : 10,
		search: sessionStorage.getItem("sign_up_list_search") ? sessionStorage.getItem("sign_up_list_search") : "",
		start_time: sessionStorage.getItem("sign_up_list_start_time") ? sessionStorage.getItem("sign_up_list_start_time") : "",
		end_time: sessionStorage.getItem("sign_up_list_end_time") ? sessionStorage.getItem("sign_up_list_end_time") : ""
	};
	//需要展示的筛选功能
	private show_filter: any = {
		is_type: "domain02",
		is_search: false,
		placeholder: "请输入企业名称、手机号(全部)",
		show_time: true,
		time_name: '打卡日期'
	};

	mounted () {
		this.sign_up_list();
	};
	
	//请求sign_up_list数据
	sign_up_list () {
		this.$store.dispatch("sign_up_list", this.send_data).then( (res: any) => {
			console.log("早起打卡列表", res);
			if (res.code == 0 || res.status == 1) {
				this.table_data.table.lists = res.result.reverse();
				//提取长度出来 提高for循环性能
				var lists = this.table_data.table.lists;
				var length = lists.length;
				// //转换时间戳
				for (var i = 0; i < length; i++) {
					//typescript语法严格 不声明会报错
					var that: any = this;
					// lists[i].add_time = lists[i].add_time == 0 ? "" : that.$moment(lists[i].add_time * 1000).format('YYYY-MM-DD HH:mm:ss');
					//拼接省市区
					lists[i].status = lists[i].status == 0 ? '待结算' : '已结算';
				};
				this.table_data.page.total = parseInt(res.count);
			}else {
				//请求失败提示
				this.$message({ message: res.msg, type: "error", duration: 2500 });
			};
		});
	};

	//搜索 重新获取列表数据
	search (val: any) {
		//页码不重置为1的话 有可能请求不到数据
		this.table_data.page.current_page = 1;
		this.send_data.p = 1;
		sessionStorage.setItem("sign_up_list_p", "1");
		this.send_data.search = val;
		sessionStorage.setItem("sign_up_list_search", val);
		this.sign_up_list();
	};

	//清空搜索内容
	clear_search () {
		this.send_data.search = '';
		sessionStorage.setItem("sign_up_list_search", "");
		this.sign_up_list();
	};

	//编辑虚拟人数
	edit_person (val: any) {
		console.log(val);
		this.sign_up_id = val.id;
		this.dialog_person.form_data.person_num = val.add_num;
		this.dialog_person.is_dialog = true;
	};
	//确定编辑虚拟人数
	sure_revise () {
		var that = this;
		var send_data = {
			id: this.sign_up_id,
			num: this.dialog_person.form_data.person_num
		};
		console.log('send_data', send_data);
		this.$store.dispatch("revise_person", send_data).then( (res: any) => {
			console.log("确定编辑虚拟人数", res);
			if (res.status == 1) {
				this.$message({ message: res.msg, type: "success", duration: 2500 });
				this.dialog_person.is_dialog = false;
				setTimeout(() => {
					that.sign_up_list();
				}, 500);
			};
		});
	};

	//筛选时间
	change_time(val: any) {
		//页码不重置为1的话 有可能请求不到数据
		this.table_data.page.current_page = 1;
		this.send_data.p = 1;
		sessionStorage.setItem("sign_up_list_p", "1");
		var that: any = this;
		this.send_data.start_time = val[0] ? that.$moment(val[0]).valueOf() / 1000 : "",
		this.send_data.end_time = val[1] ? that.$moment(val[1]).valueOf() / 1000 : "",
		sessionStorage.setItem("sign_up_list_start_time", this.send_data.start_time);
		sessionStorage.setItem("sign_up_list_end_time", this.send_data.end_time);
		this.sign_up_list();
	};

	//清空时间
	clear_time () {
		var that: any = this;
		this.send_data.start_time = "",
		this.send_data.end_time = "",
		sessionStorage.setItem("sign_up_list_start_time", this.send_data.start_time);
		sessionStorage.setItem("sign_up_list_end_time", this.send_data.end_time);
		this.sign_up_list();
	};
	
	//改变页码
	change_page(val: any) {
		this.table_data.page.current_page = val;
		this.send_data.p = val;
		sessionStorage.setItem("sign_up_list_p", val);
		this.sign_up_list();
	};

	//改变每页的条数
	change_page_size(val: any) {
		this.table_data.page.size = val;
		this.send_data.size = val;
		sessionStorage.setItem("sign_up_list_size", val);
		this.sign_up_list();
	};

	//改变状态
	change_state (index: any, row: any) {
		var that: any = this;
		if (row.status == 1) {
			that.$confirm("确定禁用ID为 " + row.id +  " 的商家？", "提示", { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then( () => {
				this.$store.dispatch("change_state_user", { userSN: row.user_sn, isLock: '1' }).then( (res: any) => {
					if (res.code == 0) {
						console.log("改变状态", res);
						this.table_data.table.lists[index].status = 2;
						that.$message({ type: "success", message: "已成功禁用ID为 " + row.id + " 的商家！", duration: 2000 });
					}else {
						//登录失败提示
						this.$message({ message: res.msg, type: "error", duration: 2500 });
					};
				})
			});
		}else {
			that.$confirm("确定开启ID为 " + row.id +  " 的商家？", "提示", { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then( () => {
				this.$store.dispatch("change_state_user", { userSN: row.user_sn, isLock: '0' }).then( (res: any) => {
					if (res.code == 0) {
						console.log("改变状态", res);
						this.table_data.table.lists[index].status = 1;
						that.$message({ type: "success", message: "已成功开启ID为 " + row.id + " 的商家！", duration: 2000 });
					}else {
						//登录失败提示
						this.$message({ message: res.msg, type: "error", duration: 2500 });
					};
				})
			});
		};
	};

	//查看
	look_up (row: any) {
		this.$router.push({ path: '/business/details', query: { club_id: row.id } });
	};
}

</script>

<style lang="scss">

	@media screen and (min-width: 769px) {
		
	}
</style>