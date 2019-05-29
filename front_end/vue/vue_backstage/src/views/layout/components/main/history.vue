<template>
    <div class="history">
        <el-tag type="info" :class="{is_select: select_idex == -1}" @click='select(-1)'>
            <router-link to="/home">首页</router-link>
        </el-tag>
        <el-tag
            v-for="(tag, index) in $store.state.router_history"
            :key="tag.name"
            closable
            type="info"
            :class="{is_select: select_idex == index}"
            @close="del_tag(index)"
            @click='select(index)'
        >
            <router-link :to="tag.path">{{tag.name}}</router-link>
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
        select_idex () {
            return this.$store.state.select_idex;
        }
    },
    methods: {
        
    },
    methods: {
        select (index) {
            this.$store.commit('revise_idex', index);
        },
        del_tag(index) {
            this.$store.commit('del_history', index);
            //删掉最后一个的时候
            if (this.$store.state.router_history.length == 0) {
                this.$router.push('/home');
            };
        },
    },
    mounted () {

    }
}
</script>

<style lang='scss' scoped>
    .history {
        padding: 5px 20px 15px 20px;
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

<style lang='scss'>
    .el-tag--info.is_select .el-tag__close {
        width: 15px;
        color: #fff;
    }
</style>