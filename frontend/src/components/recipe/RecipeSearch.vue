<template>
  TEST
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {ins} from "@/lib/axios";

export default class RecipeSearch extends Vue {
  keyword = '';

  created() {
    this.keyword = this.$route.params.keyword as string;
    this.load();
  }

  private async load() {
    try {
      const {data} = await ins.get(`/recipes/search/${this.keyword}`)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">

</style>