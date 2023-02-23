<template>
  <loading-spinner v-if="isLoading"/>
  TEST
  {{ recipeList }}
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {ins} from "@/lib/axios";

export default class RecipeSearch extends Vue {
  keyword = '';
  isLoading = true;

  recipeList = []

  created() {
    this.keyword = this.$route.params.keyword as string;
    this.load();
  }

  private async load(): Promise<void> {
    try {
      const {data} = await ins.get(`/recipes/search/${this.keyword}`)
      this.recipeList = data;
      this.isLoading = false;
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">

</style>