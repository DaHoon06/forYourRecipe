<template>
  <header class="header">
  </header>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class Header extends Vue {

}
</script>

<style scoped lang="scss">
.header {
  border-bottom: 1px solid $line;
  background-color: $pointColor;
  width: 100%;
  height: 64px;
}
</style>