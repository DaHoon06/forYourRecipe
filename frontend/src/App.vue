<template>
  <loading-spinner v-if="isLoading" />
  <div class="container">
    <Header/>
    <router-view class="app"/>
  </div>
  <Footer/>
</template>
<script lang="ts">

import {Options, Vue} from "vue-class-component";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

@Options({
  components: {
    Footer,
    Header,

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
}

@media screen and (max-width: 767px) {
  .app {
    padding-top: 90px !important;
  }
}

</style>
