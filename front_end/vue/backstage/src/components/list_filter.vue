<template>
    <div class="list_filter flex_between">
        <div class="item" v-if="show_filter.is_search">
            <span>输入关键词：</span>
            <el-input
                placeholder="请输入要搜索的关键词"
                v-model="search_input"
                @clear='clear_search'
                @keyup.native.enter='search'
                clearable>
            </el-input>
            <el-button type="primary" @click='search'>搜索</el-button>
        </div>

        <div class="item" v-if="show_filter.is_login_time">
            <span>最近登录时间：</span>
            <el-date-picker
                v-model="login_time"
                type="datetimerange"
                range-separator="至"
                @change='change_time'
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    components: {
        
    }
})

export default class list_filter extends Vue{
    @Prop () private send_data !: any;
    @Prop () private show_filter !: any;

    private search_input: string = "";
    private login_time: any = "";

    //初始化数据
    mounted () {
        console.log("send_data", this.send_data);
        var that: any = this;
        var time_arr: any = [];
        time_arr.push(new Date(parseInt(this.send_data.where.stime) * 1000));
        time_arr.push(new Date(parseInt(this.send_data.where.etime) * 1000));
        this.login_time = time_arr;
        this.search_input = this.send_data.where.keyword;
    };
    //搜索 重新获取列表数据
    search () {
        this.$emit("search", this.search_input);
    };

    //清空搜索内容
    clear_search () {
        this.$emit("clear_search");
    };

    //筛选时间
    change_time() {
        if (this.login_time) {
            this.$emit("change_time", this.login_time); 
        }else {
            //如果没有值 则代表清空了时间
            this.$emit("clear_time");
        }
    };
}

</script>

<style lang="scss" scoped>

    @media screen and (min-width: 769px) {
        
    }
</style>