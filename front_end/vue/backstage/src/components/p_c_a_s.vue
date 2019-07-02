<template>
    <div class="p_c_a_s">
        <el-select v-model="form.province" filterable placeholder="请选择省份" class="pcas" @change='change_p'>
            <el-option
                v-for="item in pcas.p"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
        </el-select>
        <el-select v-model="form.city" filterable placeholder="请选择城市" class="pcas" @change='change_c'>
            <el-option
                v-for="item in pcas.c"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
        </el-select>
        <el-select v-model="form.area" filterable placeholder="请选择区" class="pcas" @change='change_a'>
            <el-option
                v-for="item in pcas.a"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
        </el-select>
        <el-select v-model="form.street" filterable placeholder="请选择街道" class="pcas" @change='change_s'>
            <el-option
                v-for="item in pcas.s"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
        </el-select>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
//省-市-区-街道数据
import pcas from '@/assets/plugin/pcas.js';

@Component({
    components: {
        
    }
})

export default class p_c_a_s extends Vue{
    @Prop () private form !: any;

    //省-市-区-街道数据
    private pcas: any = {
        p: [],
        c: [],
        a: [],
        s: []
    };

    mounted () {
        //初始化省
        this.pcas.p = pcas;
    };
    
    //改变省份 筛选市
    change_p () {
        //改变前先清空
        this.form.city = '';
        this.pcas.c = [];
        this.form.area = '';
        this.pcas.a = [];
        this.form.street = '';
        this.pcas.s = [];
        //提取长度出来 提高性能
        var p_length = this.pcas.p.length;
        for (var i = 0; i < p_length; i ++) {
            //匹配省份
            if (this.pcas.p[i].name == this.form.province) {
                this.pcas.c = this.pcas.p[i].children;
            };
        };
        this.$emit("change_p", this.form.province);
    };
    //改变市 筛选区
    change_c () {
        this.form.area = '';
        this.pcas.a = [];
        this.form.street = '';
        this.pcas.s = [];
        var c_length = this.pcas.c.length;
        for (var i = 0; i < c_length; i ++) {
            if (this.pcas.c[i].name == this.form.city) {
                this.pcas.a = this.pcas.c[i].children;
            };
        };
        this.$emit("change_c", this.form.city);
    };
    //改变区 筛选街道
    change_a () {
        this.form.street = '';
        this.pcas.s = [];
        var a_length = this.pcas.a.length;
        for (var i = 0; i < a_length; i ++) {
            if (this.pcas.a[i].name == this.form.area) {
                this.pcas.s = this.pcas.a[i].children;
            };
        };
        this.$emit("change_a", this.form.area);
    };
    //选择街道
    change_s () {
        this.$emit("change_s", this.form.street);
    };
}

</script>

<style lang="scss">

    @media screen and (min-width: 769px) {
        
    }
</style>