<template>
  <picture class="spinner--wrapper">
    <img src="@/assets/images/icons/spinner.gif" alt='spinner' class="spinner"/>
  </picture>
</template>

<script lang="ts">

import {Vue} from "vue-class-component";

export default class Spinner extends Vue {

}
</script>

<style scoped lang="scss">
.spinner--wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  background: rgba($color: $white, $alpha: 0.9);

  .spinner {
    width: 120px;
  }
}

</style>