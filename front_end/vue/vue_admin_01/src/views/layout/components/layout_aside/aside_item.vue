<template>
  <div class="aside_item" v-if='item.meta && item.meta.icon'>
      <el-submenu index='1'>

        <template slot="title" v-if='item.name'>
          <svg class="icon" aria-hidden="true">
					  <use :xlink:href="item.meta.icon"></use>
				  </svg>
          <span>{{ item.name }}</span>
        </template>

        <el-submenu v-for='children01 in item.children' index='2'>

          <template slot="title">
            {{ children01.name }}
          </template>

          <el-menu-item v-for='children02 in children01.children' index='3'>
            {{ children02.name }}
          </el-menu-item>

        </el-submenu>

        <!-- <el-menu-item v-for='children01 in item.children' index='2'>
          {{ children01.name }}
        </el-menu-item> -->

      </el-submenu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class aside_item extends Vue {
  @Prop () private item!: [];

  created () {
    
  }
}
</script>

<style>
    
</style>