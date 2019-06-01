<template>
    <div class="history">
        <el-tag type="info" :class="{is_select: history_arr.length <= 0 || $store.state.current_route.path == '/home'}">
            <router-link to="/home">首页</router-link>
        </el-tag>
        <el-tag
            v-for="(item, index) in history_arr"
            closable
            type="info"
            :key="item.name"
            :class="{is_select: item.name == $store.state.current_route.name}"
            @close="del_tag(index)"
        >
            <router-link :to="item.path">{{item.meta.title}}</router-link>
        </el-tag>
    </div>
</template>

<script>

export default {
    name: 'history',
    components: {
        
    },
    props: [
        
    ],
    data () {
        return {
            tags: [],
        }
    },
    computed: {
        history_arr () {
            return this.$store.state.history_arr ? this.$store.state.history_arr : [];
        }
    },
    methods: {
        del_tag (index) {
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
        },

    },
    mounted () {

    }
}
</script>


<style lang='scss'>
    .el-tag--info.is_select .el-tag__close {
        width: 15px;
        color: #fff;
    }
</style>
<style lang='scss' scoped>
    .history {
        padding: 5px 20px 20px 20px;
        border-bottom: 2px solid #d8dce5;
    }
    .el-tag--info.is_select {
        background-color: #42b983;
    }
    .el-tag--info a {
        margin-right: 3px;
    }
    .el-tag--info.is_select a {
        color: #fff;
    }
    .el-tag--info {
        height: 28px;
        cursor: pointer;
        line-height: 28px;
        margin-right: 8px;
    }

    @media screen and (min-width: 769px) {
        
    }
</style>
