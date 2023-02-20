<template>
  <article class="recipe-detail--container">
    <div class="recipe-form--wrapper">
      <recipe-ui>
        {{ recipe }}
        <div class="dotted"/>
      </recipe-ui>
    </div>
  </article>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {ins} from "@/lib/axios";
import RecipeUi from "@/components/ui/RecipeUi.vue";
import {Recipe} from "@/interfaces/recipe";

@Options({
  components: {
    RecipeUi
  }
})
export default class RecipeDetail extends Vue {
  recipe: Recipe.Info = {
    _id: '',
    desc: '',
    createdAt: new Date(),
    detailedIngredient: [],
    likes: 0,
    name: '',
    modified: false,
    steps: [],
    user: '',
    updatedAt: new Date()
  };

  recipeId = '';

  created() {
    this.recipeId = this.$route.params.id as string;
    this.load();
  }

  private async load() {
    try {
      const {data} = await ins.get(`/recipes/detail/${this.recipeId}`);
      this.recipe = data;
    } catch (e) {
      console.log(e)
    }
  }

}
</script>

<style scoped lang="scss">
.recipe-detail--container {
  width: 100%;
  padding: 3rem 0;

  .recipe-form--wrapper {
    margin: auto;
    max-width: 1000px;
  }
}
</style>