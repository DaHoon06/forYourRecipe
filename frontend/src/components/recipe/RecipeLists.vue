<template>
  <section class="recipe-lists--container">
    <loading-spinner v-if="isLoading"/>

    <section class="recipe-lists__label pb-20">
      <text-font size="18" class="pr-6 pb-12">선택된 재료</text-font>

      <div class="flex" v-if="selectedIngredients">

        <span v-for="(ingredient) of selectedIngredients" :key="ingredient._id" class="ingredient-icon mr-12">

          <picture class="ingredient-icon--wrapper">
          <img loading="lazy" :src="ingredient.img"
               sizes="(max-width: 32px)" decoding="async" alt="식재료" width="32" height="32"/>
        </picture>
        <text-font class="pt-6">
          {{ ingredient.name }}
        </text-font>
        </span>
      </div>
    </section>

    <section class="recipe-lists__label">
      <text-font size="18" class="pr-6">검색 결과</text-font>
      <text-font size="16" color="placeholder">{{ total }}</text-font>
    </section>

    <hr/>

    <section class="card--wrapper">
      <div v-for="(dish) in recipeLists" :key="dish._id" class="w-100">
        <CardUi class="mr-20 card-component" :card-item="dish" @click="recipeDetail(dish._id)"/>
        <ListsUi class="list-component" :list-item="dish" @click="recipeDetail(dish._id)"/>
      </div>
    </section>

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
import {useStore} from "vuex";
import {STORE} from "@/interfaces/store";
import InfiniteLoading from 'infinite-loading-vue3-ts';


@Options({
  components: {
    ListsUi, CardUi,
    InfiniteLoading
  }
})
export default class RecipeLists extends Vue {
  isLoading = true;
  key: Partial<LocationQueryValue | LocationQueryValue[]> = [];
  total = 0;
  recipeLists: Recipe.Info[] = [];
  store = useStore();
  selectedIngredients: ComputedRef<STORE.RecipeState[]> = computed(() => this.store.getters["recipeModule/getIngredients"]);
  page = 1;

  created() {
    const {key} = this.$route.query;
    this.key = key;
    this.page = 1;
    // this.load();
  }

  private async infiniteHandler($state: any): Promise<void> {
    try {
      this.isLoading = true;
      const {data} = await ins.get('/recipes/ingredient-recipes', {
        params: {
          id: this.key,
          page: this.page,
        }
      })
      console.log(data, this.page)

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

  private async load(): Promise<void> {
    try {
      const {data} = await ins.get('/recipes/ingredient-recipes', {
        params: {
          id: this.key,
          page: this.page,
        }
      })
      this.recipeLists = data;
      console.log(data)
      this.total = data.length;
      this.isLoading = false
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

  .card--wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-items: center;
    row-gap: 1rem;
    margin-top: 70px; //새로 추가
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

    .card--wrapper {
      row-gap: 0;
      margin-top: 0;
    }
  }

}
</style>
