<template>
  <section class="recipe-lists--container">
    <loading-spinner v-if="isLoading"/>

    <section class="recipe-lists__label pb-20">
      <text-font size="16" color="black" weight="medium" class="pr-6 pb-12">선택된 재료</text-font>

      <div class="selected-ingredients" v-if="selectedIngredients">

        <span v-for="(ingredient) of selectedIngredients" :key="ingredient._id" class="ingredient-icon mr-12">
          <picture class="ingredient-icon--wrapper">
            <img loading="lazy" :src="ingredient.img"
                 sizes="(max-width: 32px)" decoding="async" alt="식재료" width="32" height="32"/>
          </picture>
          <text-font color="textTitle" size="14" class="pt-6">
            {{ ingredient.name }}
          </text-font>
        </span>
      </div>
    </section>

    <section class="recipe-lists__label pb-10">
      <text-font size="16" color="textTitle" weight="medium" class="pr-6">검색 결과</text-font>
      <text-font size="14" color="placeholder">{{ total }}</text-font>
    </section>

    <hr/>

    <section class="card--wrapper" v-if="recipeLists.length > 0">
      <div v-for="(dish) in recipeLists" :key="dish._id" class="w-100">
        <CardUi :recipe-detail="() => recipeDetail(dish._id)" class="mr-20 card-component" :card-item="dish"/>
        <ListsUi :recipe-detail="() => recipeDetail(dish._id)" class="list-component" :list-item="dish"/>
      </div>
    </section>
    <div class="center w-100 pt-50" v-else>
      <text-font weight="medium" color="secondary-light">검색된 레시피가 없습니다. 레시피를 등록해 보세요!</text-font>
    </div>

    <infinite-loading @infinite="infiniteHandler">
      <template #spinner>
        <span style="display: none;"/>
      </template>
      <template #no-more>
        <span style="display: none;"/>
      </template>
      <template #no-results>
        <text-font size="18">검색된 레시피가 없습니다.</text-font>
      </template>
    </infinite-loading>
  </section>


</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {ins} from "@/lib/axios";
import {Recipe} from "@/interfaces/recipe";
import ListsUi from "@/components/ui/ListsUi.vue";
import CardUi from "@/components/ui/CardUi.vue";
import {LocationQueryValue} from "vue-router";
import {computed, ComputedRef} from "vue";
import {STORE} from "@/interfaces/store";
import store from '@/store';

@Options({
  components: {
    ListsUi, CardUi,
  }
})
export default class RecipeLists extends Vue {
  isLoading = true;
  key: Partial<LocationQueryValue | LocationQueryValue[]> = [];
  total = 0;
  recipeLists: Recipe.Info[] = [];
  selectedIngredients: ComputedRef<STORE.RecipeState[]> | STORE.RecipeState[] = computed(() => this.store.getters["recipeModule/getIngredients"]);
  page = 1;
  store = store;

  created() {
    const {key} = this.$route.query;
    this.key = key;
    this.page = 1;
  }

  private async infiniteHandler($state: any): Promise<void> {
    try {
      const {data} = await ins.get('/recipes/ingredient-recipes', {
        params: {
          id: this.key,
          page: this.page,
        }
      })
      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          this.recipeLists.push({...data[i]});
        }
        this.total += data.length;
        this.page += 1;
        $state.loaded();
        this.isLoading = false;
      } else {
        $state.complete();
        this.isLoading = false;
      }
    } catch (e) {
      console.log(e)
    }
  }

  private recipeDetail(id: string) {
    this.$router.push(`/recipe/detail/${id}`)
  }

}
</script>

<style lang="scss" scoped>
hr {
  margin: 0;
}

.recipe-lists--container {
  padding: 5vh 5vw;
  width: 100%;
  min-height: 500px;

  .selected-ingredients {
    display: flex;
    flex-wrap: wrap;
    row-gap: 1rem;
  }
}

.ingredient-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (max-width: 600px) {
  .recipe-lists--container {
    padding: 0;

    .recipe-lists__label {
      padding: 1rem;
    }
  }

}
</style>
