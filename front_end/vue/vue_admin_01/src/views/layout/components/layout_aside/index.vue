<template>
  <div class="layout_aside">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color='#1f2d3d'
      text-color="#bfcbd9"
    >
    <aside_item v-for='item in jurisdiction_routers' :key='item.path' />

    </el-menu>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import aside_item from './aside_item.vue';

import { jurisdiction_routers } from '@/routers/index';

@Component({
  components: {
    aside_item
  }
})
export default class layout_aside extends Vue {
  private jurisdiction_routers: arr = [];
  
  created () {
    this.jurisdiction_routers = jurisdiction_routers;
    console.log(this.jurisdiction_routers);
  };

}
</script>

<style>
    
</style>