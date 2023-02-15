<template>
  <router-view/>
  <modal />
</template>
<script lang="ts">

import {Options, Vue} from "vue-class-component";
import Modal from "@/components/common/Modal.vue";

@Options({
  components: {
    Modal
  }})
export default class App extends Vue {

}
</script>
<style lang="scss">

</style>
