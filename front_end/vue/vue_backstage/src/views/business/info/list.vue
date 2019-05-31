<template>
    <div class="business_list">
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
        <!-- <dialog_component :dialog='dialog' @off_dialog='off_dialog' /> -->
    </div>
</template>

<script>
// import dialog_component from '@/common/components/dialog.vue';
import table_page from '@/common/components/table_page.vue';

export default {
    name: 'business_list',
    components: {
        // dialog_component,
        table_page
    },
    data () {
        return {
            //弹框数据
            dialog: {
                is_open: false,
                msg: '',
                type: '1',
                is_sure: null,
            },
            //搜索的内容
            search_input: null,
            //表格和页码的数据
            table_data: {
                //表格
                table: {
                    //表格数据
                    lists: [
                        {id: '0126',name: '百得利健身会所',phone: '19928749823',people: '康哥',stores: 12,address: '深圳',time: 1559214576,ban: 0},
                        {id: '0127',name: '百得利健身会所',phone: '19928749823',people: '康哥',stores: 11,address: '深圳',time: 1558214576,ban: 1},
                        {id: '0128',name: '百得利健身会所',phone: '19928749823',people: '康哥',stores: 10,address: '深圳',time: 1557214576,ban: 1},
                        {id: '0129',name: '百得利健身会所',phone: '19928749823',people: '康哥',stores: 9,address: '深圳',time: 1556214576,ban: 1},
                        {id: '0130',name: '百得利健身会所',phone: '19928749823',people: '康哥',stores: 8,address: '深圳',time: 1555214576,ban: 1},
                        {id: '0131',name: '百得利健身会所',phone: '19928749823',people: '康哥',stores: 7,address: '深圳',time: 1554214576,ban: 1},
                        {id: '0132',name: '百得利健身会所',phone: '19928749823',people: '康哥',stores: 6,address: '深圳',time: 1553214576,ban: 1},
                        {id: '0133',name: '百得利健身会所',phone: '19928749823',people: '康哥',stores: 5,address: '深圳',time: 1552214576,ban: 1},
                        {id: '0134',name: '百得利健身会所',phone: '19928749823',people: '康哥',stores: 4,address: '深圳',time: 1551214576,ban: 1},
                        {id: '0135',name: '百得利健身会所',phone: '19928749823',people: '康哥',stores: 3,address: '深圳',time: 1549214576,ban: 1},
                        // {id: '0136',name: '百得利健身会所',phone: '19928749823',people: '康哥',stores: 2,address: '深圳',time: 1539214576,ban: 1},
                    ],
                    //是否禁用账户
                    is_ban: true,
                },
                //页码
                page: {
                    current_page: 1
                }
            }
        }
    },
    methods: {
        //改变页码页数
        change_page(val) {
            console.log(`当前页: ${val}`);
        },
        //改变每页的条数
        change_page_size(val) {
            console.log(`每页 ${val} 条`);
        },
        //点击禁用/开启账户
        change_ban (index) {
            
        },
        //查看详情
        look_up (index, row) {
            console.log(index);
            console.log(row);
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
    .business_list {
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