<template>
  <Header />
  <router-view/>
  <Footer />
</template>
<script lang="ts">

import {Options, Vue} from "vue-class-component";
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";

@Options({
  components: {
    Footer,
    Header,
  }})
export default class App extends Vue {

}
</script>
<style lang="scss">

</style>
