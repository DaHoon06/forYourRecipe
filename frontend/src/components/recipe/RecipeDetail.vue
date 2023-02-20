<template>
  <article class="recipe-detail--container">
    <recipe-ui class="recipe-form--wrapper">
      <section>
        <text-font size="22">{{recipe.name}}</text-font>
        <div class="dotted mt-16 mb-16" />
        <picture>
          <img src="https://picsum.photos/400/400" width="284" height="177" alt="음식 이미지 1" />
        </picture>
        <div v-if="recipe.detailedIngredient.length > 0" class="pt-6">
          <span class="tags mr-6" v-for="(tag, index) of recipe.detailedIngredient" :key="index">
            {{tag}}
          </span>
        </div>
      </section>

      <div class="dotted mt-16 mb-16"/>

      <section>
        <text-font size="20">요리 소개</text-font>
        <div class="dotted mt-16 mb-16"/>

        <text-font v-text="recipe.desc" class="recipe-detail--desc" />

      </section>

      <div class="dotted mt-16 mb-16"/>

      <section>
        <text-font size="20">조리법</text-font>
        <div class="dotted mt-16 mb-16"/>
        <section v-if="recipe.steps.length > 0" class="recipe-detail">
          <text-font v-for="(item) of recipe.steps" :key="item._id" class="pb-10">
            {{item.desc}}
          </text-font>
        </section>
      </section>

    </recipe-ui>
    <section class="recipe-detail__button--wrapper">
      <custom-button variant="primary" @click="historyBack">
        <text-font color="white">목록</text-font>
      </custom-button>
    </section>

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
    _id: 'asadsad',
    desc: '맛이 심심해요',
    createdAt: new Date(),
    detailedIngredient: ['감자','소고기','토마토'],
    likes: 12,
    name: '우왕 냉면',
    modified: false,
    steps: [{_id: '1', step: 1, desc: '1. 물을 넣는다.'},{_id: '2', step: 2, desc: '2. 마신다.'},],
    user: '전다훈',
    updatedAt: new Date()
  };

  recipeId = '';

  created() {
    this.recipeId = this.$route.params.id as string;
   // this.load();
  }

  private async load() {
    try {
      const {data} = await ins.get(`/recipes/detail/${this.recipeId}`);
      this.recipe = data;
    } catch (e) {
      console.log(e)
    }
  }

  private historyBack() {
    this.$router.go(-1);
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

  .recipe-detail--desc {
    width: 100%;
    min-height: 100px;
    height: 100%;
    background-color: $white;
    border: 1px solid $line;
    border-radius: 8px;
    padding: 1em;
  }
  .recipe-detail {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 200px;
    height: 100%;
    background-color: $white;
    border: 1px solid $line;
    border-radius: 8px;
    padding: 1em;
  }

  .recipe-detail__button--wrapper {
    padding-top: 20px;
    display: flex;
    max-width: 1000px;
    justify-content: center;
    margin: auto;
  }
}
</style>
