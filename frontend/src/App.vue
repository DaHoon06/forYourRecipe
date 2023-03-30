<template>
  <div class="container">
    <header-component/>
    <router-view class="app"/>
  </div>
  <footer-component/>
</template>

<script lang="ts" setup>
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import FooterComponent from "@/components/layout/FooterComponent.vue";
</script>

<style scoped lang="scss">
.container {
  background-color: #fbfbfb;
  height: auto;
  min-height: 100%;
}

.app {
  padding-top: 136px;
  max-width: 1600px;
  margin: auto;
}

@media screen and (max-width: 767px) {
  .app {
    padding-top: 90px !important;
  }
}

</style>
