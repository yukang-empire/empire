<template>
        <div class="stores_list">
            <div class="repeat_div">
                <p>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-funnel"></use>
                    </svg>
                    <span>筛选数据</span>
                </p>
                <div class="search_input">
                   <span>输入关键词：</span>
                   <el-input
                        placeholder="请输入要搜索的关键词"
                        v-model="search_input"
                        clearable>
                    </el-input>
                    <el-button type="primary">搜索</el-button>
                </div>
            </div>
    
            <div class="repeat_div">
                <p>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shitu_gaikuang"></use>
                    </svg>
                    <span>{{ $store.state.current_route ? $store.state.current_route.meta.title : '' }}</span>
                </p>
                <!-- 表格和页码 -->
                <table_page 
                :table_data='table_data'
                @change_page='change_page'
                @change_page_size='change_page_size'
                @change_ban='change_ban'
                @look_up='look_up'
                />
                
            </div>
    
            <!-- 弹框 -->
            <dialog_component :dialog='dialog' @off_dialog='off_dialog' />
        </div>
    </template>
    
    <script>
    import dialog_component from '@/common/components/dialog.vue';
    import table_page from '@/common/components/table_page.vue';
    
    export default {
        name: 'stores_list',
        components: {
            dialog_component,
            table_page
        },
        data () {
            return {
                //弹框数据
                dialog: {
                    is_open: false,
                    msg: '',
                    type: '1',
                },
                //表格和页码的数据
                table_data: {
                    //表格
                    table: {
                        //要展示哪些行
                        select: 'mdlb',
                        //是否固定表头
                        is_height: false,
                        //表格数据
                        lists: [
                            {id: '6',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 10,ban: 1},
                            {id: '7',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 9,ban: 1},
                            {id: '8',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 8,ban: 1},
                            {id: '9',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 7,ban: 1},
                            {id: '10',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 6,ban: 1},
                            {id: '11',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 5,ban: 1},
                            {id: '12',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 4,ban: 1},
                            {id: '13',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 3,ban: 1},
                            {id: '14',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 2,ban: 1},
                            {id: '15',name: '百得利健身会所',sssj: '百得利',ssqy: '深圳龙华',xxdz: '清湖地铁站',num: 1,ban: 1},
                        ],
                        //需要改变的行开关状态
                        switch: {
                            index: null,
                            ban: null
                        },
                    },
                    //页码
                    page: {
                        //当前页码
                        current_page: 1,
                        //总数量
                        total: 30,
                    }
                },
                //搜索的内容
                search_input: null,
    
            }
        },
        methods: {
            //关闭弹框
            off_dialog (state) {
                //确定则修改此行的ban状态
                if (state == 'sure') {
                    this.table_data.table.lists[this.table_data.table.switch.index].ban = this.table_data.table.switch.ban;
                };
                this.dialog.is_open = false;
            },
            //改变页码页数
            change_page(val) {
                console.log(`当前页: ${val}`);
            },
            //改变每页的条数
            change_page_size(val) {
                console.log(`每页 ${val} 条`);
            },
            //点击禁用/开启账户
            change_ban (index, val) {
                this.dialog.is_open = true;
                if (val == 1) {
                    this.dialog.msg = '是否禁用?';
                    //改为禁用 提交给弹框处理
                    this.table_data.table.switch.ban = 0;
                }else {
                    this.dialog.msg = '是否开启?';
                    //改为开启 交接给弹框处理
                    this.table_data.table.switch.ban = 1;
                };
                this.table_data.table.switch.index = index;
            },
            //查看详情
            look_up (row) {
                this.$router.push({ path: '/business/mdlb/mdxq', query: { id: row.id } });
            }
        }
    }
    </script>
    
    <style lang='scss'>
        input::-webkit-input-placeholder{
            font-size: 0.85rem;
        }
        input::-moz-input-placeholder{
            font-size: 0.85rem;
        }
        input::-ms-input-placeholder{
            font-size: 0.85rem;
        }
    </style>
    <style lang='scss' scoped>
        .stores_list {
            padding: 0 20px;
    
            .el-input {
                width: 250px;
                margin: 0 15px;
            }
    
        }
        .search_input {
            display: flex;
            align-items: center;
        }
        @media screen and (min-width: 769px) {
            
        }
    </style>