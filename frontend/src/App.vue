<template>
  <div class="container" :style="isRecipePage ? 'background:  #ffffff' : 'background:  #fbfbfb'">
    <header-component/>
    <router-view class="app"/>
  </div>
  <footer-component/>
</template>

<script lang="ts" setup>
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import FooterComponent from "@/components/layout/FooterComponent.vue";
import {useRoute} from "vue-router";
import {ref, watch} from "vue";

const route = useRoute();
const isRecipePage = ref(false);

watch(route, () => {
  isRecipePage.value = route.path.indexOf('recipe') > -1;
})
</script>

<style scoped lang="scss">
.container {
  height: auto;
  min-height: 100%;
}

.app {
  padding-top: 140px;
  max-width: 1600px;
  margin: auto;
}

@media screen and (max-width: 767px) {
  .app {
    padding-top: 90px !important;
  }
}

</style>
