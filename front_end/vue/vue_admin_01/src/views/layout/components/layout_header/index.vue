<template>
  <div class="layout_header">
    <div class="left">
      <img src="@/commons/imgs/logo01.png" alt="logo">
    </div>
    <div class="right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yonghu2"></use>
      </svg>
      <span>{{ user_info.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class layout_header extends Vue {
    @Prop() private user_info!: object;
}
</script>

<style>
    
</style>