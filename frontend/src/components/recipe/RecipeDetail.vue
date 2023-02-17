<template>
  <main>
    test
  </main>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {ins} from "@/lib/axios";

export default class RecipeDetail extends Vue {

  recipeId = '';

  created() {
    this.recipeId = this.$route.params.id as string;
    this.load();
  }

  private async load() {
    try {
      const {data} = await ins.get(`/recipes/ingredient-recipes`, {
        params: {
          ingredientId: this.recipeId
        }
      });
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

}
</script>

<style scoped lang="scss">

</style>