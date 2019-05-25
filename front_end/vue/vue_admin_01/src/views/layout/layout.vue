<template>
  <div class="layout">
    <el-container>
        <el-header>
            <layout_header :user_info='user_info' />
        </el-header>

        <el-container>
            <el-aside width="200px">
                <layout_aside />
            </el-aside>

            <el-main>
                <layout_main />
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
//要导入文件夹 须创建一个index.js文件 在里面注入vue组件
import { layout_header, layout_aside, layout_main } from './components/index';


@Component({
  components: {
    layout_header,
    layout_aside,
    layout_main
  }
})

export default class layout extends Vue {
  private user_info: object = {
      name: 'admin'
  };

  created () {
    
  }
    
}
</script>

<style>
    
</style>