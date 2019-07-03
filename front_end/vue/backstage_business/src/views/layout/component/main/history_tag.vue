<template>
    <div class="history_tag">
        <el-tag type="info" :class="{is_select: history_arr.length <= 0 || $store.state.current_route.path == '/home'}">
            <router-link to="/home">首页</router-link>
        </el-tag>
        <el-tag
        v-for="(item, index) in history_arr"
        closable
        type="info"
        :key="item.name"
        :class="{is_select: item.name == $store.state.current_route.name}"
        @close="del_tag(index)">
            <router-link :to="item.path">{{item.meta.title}}</router-link>
        </el-tag>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
    components: {
        
    }
})

export default class history_tag extends Vue{
    private tags: any = [];
    
    get history_arr(): string {
        return this.$store.state.history_arr ? this.$store.state.history_arr : [];
    };

    //删掉tag
    del_tag (index: any) {
        //先拿到没删除前的tag信息
        var path = this.$store.state.history_arr[index].path;
        //发送给vuex 删掉
        this.$store.commit('del_tag', index);
        var current_route = this.$store.state.current_route;
        var history_arr = this.$store.state.history_arr;
        var length = this.$store.state.history_arr.length;
        //删除的时候 如果删的是本页面的tag 就默认跳到历史记录数组里最后的那个tag
        if (length > 0 && path == current_route.path) {
            this.$router.push(history_arr[length-1].path);
        };
        //如果都删完了 那么就回到home页
        if (length <= 0) {
            this.$router.push('/home');
        };
    };
}

</script>

<style lang="scss" scoped>
    
    .el-tag--info.is_select {
        background-color: $succ;
    }

    @media screen and (min-width: 769px) {
        .history_tag {
            padding: 5px 20px 20px 20px;
            border-bottom: 2px solid #d8dce5;
        }
    }
</style>