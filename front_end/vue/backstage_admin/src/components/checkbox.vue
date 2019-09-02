<template>
    <div class="checkbox">
        <el-form-item :label="data.name + ':'" prop="checkbox_modules">
            <el-checkbox :indeterminate="is_all_select" v-model="check_all" @change="click_all_select">全选</el-checkbox>
            <el-checkbox-group v-model="checked_option_children" @change="click_option_select">
                <el-checkbox v-for="item in data.options" :label="item.id" :key="item.id" border>{{ item.name }}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    components: {
        
    }
})

export default class checkbox extends Vue{
    @Prop() private data!: any;
    @Prop() private checked_option!: any;

    private check_all: any = false;
    private is_all_select: any = true;
    private checked_option_children: any = [];

    //全选
    click_all_select(val) {
        var send_data = [];
        if (val) {
            for (var i = 0; i < this.data.options.length; i++) {
                send_data.push(this.data.options[i].id);
            };
        }else {
            send_data = [];
        };
        this.checked_option_children = send_data;
        this.is_all_select = false;
        this.$emit('click_all', send_data);

    };
    //单点
    click_option_select(value) {
        let checkedCount = value.length;
        this.check_all = checkedCount === this.data.options.length;
        this.is_all_select = checkedCount > 0 && checkedCount < this.data.options.length;
        this.$emit('click_option', value);
    };
    mounted () {
        this.checked_option_children = this.checked_option;
    };
    
}

</script>

<style lang="scss" scoped>

    @media screen and (min-width: 769px) {
        
    }
</style>