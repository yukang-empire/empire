<template>
    <div class="list_filter flex_between">
        <div class="item" v-if="show_filter.is_type == 'domain01' && show_filter.is_state">
            <span>{{ show_filter.state_name }}：</span>
            <el-select v-model="current_state" filterable placeholder="请选择" clearable @clear='clear_select' @change='state_change' class="filter_select">
                <el-option
                    v-for="item in show_filter.all_state"
                    :key="item.state"
                    :label="item.name"
                    :value="item.state">
                </el-option>
            </el-select>
        </div>

        <div class="item" v-if="show_filter.is_type == 'domain02' && show_filter.is_state">
            <span>{{ show_filter.state_name }}：</span>
            <el-select v-model="current_state" filterable placeholder="请选择" clearable @clear='clear_select' @change='state_change' class="filter_select">
                <el-option
                    v-for="item in show_filter.all_state"
                    :key="item.state"
                    :label="item.name"
                    :value="item.state">
                </el-option>
            </el-select>
        </div>

        <div class="item" v-if="show_filter.is_type == 'domain02' && show_filter.is_state && show_filter.name == 'staff'">
            <span>{{ show_filter.state_name02 }}：</span>
            <el-select v-model="current_state_02" filterable placeholder="请选择" clearable @clear='clear_02_select' @change='state_02_change' class="filter_select">
                <el-option
                    v-for="item in show_filter.all_state_02"
                    :key="item.state"
                    :label="item.name"
                    :value="item.state">
                </el-option>
            </el-select>
        </div>
        
        <div class="item" v-if="show_filter.is_type == 'domain02' && show_filter.is_search">
            <span>输入关键词：</span>
            <el-input
                :placeholder="show_filter.placeholder"
                v-model="search_input"
                @clear='clear_search'
                @keyup.native.enter='search'
                clearable>
            </el-input>
            <el-button type="primary" @click='search' icon="el-icon-search">搜索</el-button>
        </div>

        <div class="item" v-if="show_filter.is_type == 'domain01' && show_filter.show_time">
            <span>{{ show_filter.time_name }}：</span>
            <el-date-picker
                v-model="select_time"
                type="datetimerange"
                range-separator="至"
                @change='change_time'
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </div>

        <div class="item" v-if="show_filter.is_type == 'domain01' && show_filter.show_time_02">
            <span>{{ show_filter.time_name }}：</span>
            <el-date-picker
                v-model="select_time"
                type="daterange"
                range-separator="至"
                @change='change_time'
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </div>
        
        <div class="item" v-if="show_filter.is_type == 'domain02' && show_filter.show_time">
            <span>{{ show_filter.time_name }}：</span>
            <el-date-picker
                v-model="select_time"
                type="datetimerange"
                range-separator="至"
                @change='change_time'
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </div>

        <div class="item" v-if="show_filter.is_type == 'domain01' && show_filter.is_search">
            <span>输入关键词：</span>
            <el-input
                :placeholder="show_filter.placeholder"
                v-model="search_input"
                @clear='clear_search'
                @keyup.native.enter='search'
                clearable>
            </el-input>
            <el-button type="primary" @click='search' icon="el-icon-search">搜索</el-button>
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
    private select_time: any = "";
    private current_state: any = "全部";
    private current_state_02: any = "";
    private current_state_03: any = "";

    //初始化数据
    mounted () {
        console.log("send_data", this.send_data);
        var that: any = this;
        var time_arr: any = [];
        if (this.show_filter.is_type == "domain01") {
            time_arr.push(new Date(parseInt(this.send_data.where.stime) * 1000));
            time_arr.push(new Date(parseInt(this.send_data.where.etime) * 1000));
            this.search_input = this.send_data.where.keyword;
        }else {
            time_arr.push(new Date(parseInt(this.send_data.start_time) * 1000));
            time_arr.push(new Date(parseInt(this.send_data.end_time) * 1000));
            this.search_input = this.send_data.search;
        };
        this.select_time = time_arr;
        this.current_state = this.send_data.current_state;
    };

    //选择订单状态
    state_change () {
        this.$emit("state_change", this.current_state);
    };

    state_02_change () {
        this.$emit("state_change_02", this.current_state_02);
    };

    //搜索 重新获取列表数据
    search () {
        this.$emit("search", this.search_input);
    };

    //清空搜索内容
    clear_search () {
        this.$emit("clear_search");
    };

    //清空下拉选择
    clear_select () {
        this.$emit("clear_select");
    };

    //筛选时间
    change_time() {
        if (this.select_time) {
            this.$emit("change_time", this.select_time);
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