<template>
  <div class="layout_main">
    <p>layout_main</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class layout_main extends Vue {
    @Prop() private main_info!: object;
}
</script>

<style>
    
</style>