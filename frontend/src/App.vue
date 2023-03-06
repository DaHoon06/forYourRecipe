<template>
  <loading-spinner v-if="isLoading"/>
  <div class="container">
    <header-component/>
    <router-view class="app"/>
  </div>
  <Footer/>
</template>
<script lang="ts">

import {Options, Vue} from "vue-class-component";
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import Footer from "@/components/layout/Footer.vue";

@Options({
  components: {
    Footer,
    HeaderComponent,
  }
})
export default class App extends Vue {
  isLoading = true;

  mounted() {
    this.isLoading = false
  }
}
</script>
<style scoped lang="scss">
.container {
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
