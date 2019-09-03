<template>
    <div class="share_profit_list">

        <div class="repeat_div">
            <p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon48"></use>
                </svg>
                <span>分润情况</span>
            </p>
            <div class="profit">
                <ul class="flex_between">
                    <li class="flex_center" style="background-color: #8693f3;">
                        <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icontable-16"></use>
                            </svg>
                        </div>
                        <div>
                            <p>已分润期数</p>
                            <b>{{ total_num }}</b>
                        </div>
                    </li>
                    <li class="flex_center" style="background-color: #ff9999;">
                        <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconyuezhan"></use>
                            </svg>
                        </div>
                        <div>
                            <p>已分润金额</p>
                            <b>¥ {{ total_money }}</b>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

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
                <router-link to="/share_profit/add" tag="span" class="add_btn">
                    <el-button size="medium" type="primary" icon="el-icon-circle-plus-outline">新增分润</el-button>
                </router-link>
            </p>
            <!-- 表格和页码 -->
            <table_page 
            :table_data='table_data'
            @change_page='change_page'
            @change_page_size='change_page_size'
            @look_up='look_up'
            @to_bonus='to_bonus'
            />
            
		</div>
		
		<dialog_form :dialog_data='dialog_share_profit' @sure='sure_share_profit'></dialog_form>
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

export default class share_profit_list extends Vue{
	//分红弹框
	private dialog_share_profit: any = {
        type: 'share_profit',
        is_dialog: false,
		title: '分红信息',
		sure_name: '确定分红',
        //表单数据
        form_data: {
            phase: '',
            bonus_num: '',
            total_points: '',
            up_time: '',
			total_money: '',
			status: 1
        },
        //表单规则
        form_rules: {
            total_money: [
                { required: true, message: '请输入本期分红总金额', trigger: 'blur' },
            ],
        }
    };
    //表格、页码数据
    private table_data: any = {
        //表格
        table: {
            //属于哪个表格
            which: 'share_profit_list',
            //是否多选
            checkbox: true,
            //是否固定表头
            is_height: "auto",
            //表格数据
            lists: [{num: '康大大'}],
        },
        //页码
        page: {
            //是否显示页码
            is_page: true,
            //当前页码
            current_page: sessionStorage.getItem("share_profit_list_p") ? parseInt(sessionStorage.getItem("share_profit_list_p")) : 1,
            //每页显示的数量
            size: sessionStorage.getItem("share_profit_list_size") ? parseInt(sessionStorage.getItem("share_profit_list_size")) : 10,
            sizes: [10, 15, 20],
            //总数量
            total: 0,
        }
    };
    //请求列表数据的参数
    private send_data: any = {
        p: sessionStorage.getItem("share_profit_list_p") ? sessionStorage.getItem("share_profit_list_p") : 1,
        size: sessionStorage.getItem("share_profit_list_size") ? sessionStorage.getItem("share_profit_list_size") : 10,
        search: sessionStorage.getItem("share_profit_list_search") ? sessionStorage.getItem("share_profit_list_search") : "",
        start_time: sessionStorage.getItem("share_profit_list_start_time") ? sessionStorage.getItem("share_profit_list_start_time") : "",
        end_time: sessionStorage.getItem("share_profit_list_end_time") ? sessionStorage.getItem("share_profit_list_end_time") : ""
    };
    //需要展示的筛选功能
    private show_filter: any = {
        is_type: "domain02",
        is_search: true,
        placeholder: "请输入关键词",
        show_time: true,
        time_name: '申请日期',
        
        is_state: true,
        all_state: [
            {state: 1, name: '全部'},
            {state: 2, name: '待分润'},
            {state: 3, name: '已分润'},
        ]
    };
    private total_num: any = null;
    private total_money: any = null;

    mounted () {
        this.share_profit_list();
    };
    
    //请求share_profit_list数据
    share_profit_list () {
        this.$store.dispatch("share_profit_list", this.send_data).then( (res: any) => {
            console.log("分润列表", res);
            if (res.code == 0 || res.status == 1) {
                this.table_data.table.lists = res.result.list;
                //提取长度出来 提高for循环性能
                var lists = this.table_data.table.lists;
                var length = lists.length;
                //转换时间戳
                for (var i = 0; i < length; i++) {
                    //typescript语法严格 不声明会报错
                    var that: any = this;
                    lists[i].up_time = lists[i].up_time == 0 ? "" : that.$moment(lists[i].up_time * 1000).format('YYYY-MM-DD HH:mm:ss');
                    lists[i].status = lists[i].status == 1 ? '未分' : '已分';
                };
                this.table_data.page.total = parseInt(length);
                this.total_money = res.result.total_money;
                this.total_num = res.result.total_num;
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
        sessionStorage.setItem("share_profit_list_p", "1");
        this.send_data.search = val;
        sessionStorage.setItem("share_profit_list_search", val);
        this.share_profit_list();
    };

    //清空搜索内容
    clear_search () {
        this.send_data.search = '';
        sessionStorage.setItem("share_profit_list_search", "");
        this.share_profit_list();
    };

    //筛选时间
    change_time(val: any) {
        //页码不重置为1的话 有可能请求不到数据
        this.table_data.page.current_page = 1;
        this.send_data.p = 1;
        sessionStorage.setItem("share_profit_list_p", "1");
        var that: any = this;
        this.send_data.start_time = val[0] ? that.$moment(val[0]).valueOf() / 1000 : "",
        this.send_data.end_time = val[1] ? that.$moment(val[1]).valueOf() / 1000 : "",
        sessionStorage.setItem("share_profit_list_start_time", this.send_data.start_time);
        sessionStorage.setItem("share_profit_list_end_time", this.send_data.end_time);
        this.share_profit_list();
    };

    //清空时间
    clear_time () {
        var that: any = this;
        this.send_data.start_time = "",
        this.send_data.end_time = "",
        sessionStorage.setItem("share_profit_list_start_time", this.send_data.start_time);
        sessionStorage.setItem("share_profit_list_end_time", this.send_data.end_time);
        this.share_profit_list();
    };
    
    //改变页码
    change_page(val: any) {
        this.table_data.page.current_page = val;
        this.send_data.p = val;
        sessionStorage.setItem("share_profit_list_p", val);
        this.share_profit_list();
    };

    //改变每页的条数
    change_page_size(val: any) {
        this.table_data.page.size = val;
        this.send_data.size = val;
        sessionStorage.setItem("share_profit_list_size", val);
        this.share_profit_list();
    };

    //查看
    look_up (row: any) {
        this.$router.push({ path: '/share_profit/details', query: { id: row.id } });
    };
    //分红确认
    to_bonus (row: any) {
		var that = this;
		this.dialog_share_profit.form_data = row;
		// console.log(this.dialog_share_profit.form_data);
		this.dialog_share_profit.is_dialog = true;
	};
	//确定分红
	sure_share_profit (name, data) {
		this.$store.dispatch("to_bonus", { id: data.id, total_money: data.total_money }).then( (res: any) => {
			if (res.status == 1) {
				console.log("分红", res);
				that.$message({ type: "success", message: "已成功开启期数为 " + data.phase + " 的分红！", duration: 2000 });
				setTimeout( () => {
					that.share_profit_list();
				}, 500);
			}else {
				//登录失败提示
				this.$message({ message: res.msg, type: "error", duration: 2500 });
			};
		})
	}
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        .profit {
            color: #fff;

            .flex_between {
                justify-content: space-around;
            }

            li {
                border-radius: 8px;
                min-width: 15%;
                padding: 15px 20px 15px 15px;
                cursor: pointer;

                .icon {
                    width: 3rem;
                    height: 3rem;
                    margin-right: 15px;
                }

                &>div:nth-of-type(2) {
                    text-align: center;
                }

                p {
                    margin-bottom: 0;
                }

                b {
                    font-size: 1.5rem;
                    white-space: nowrap;
                }
            }
            
            li.flex_center {
                justify-content: unset;
            }
        }
    }
</style>