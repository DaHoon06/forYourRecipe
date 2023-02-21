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
    <text-font>
    </text-font>
    <hr/>
    <section>
      <section class="card--wrapper" v-if="recipeLists.length > 0">
        <CardUi class="mr-20 card-component" v-for="(dish) in recipeLists" :key="dish._id"
                @click="recipeDetail(dish._id)">
          <section class="card-ui__body">
            <text-font size="18">{{ dish.name }}</text-font>
            <text-font size="14" color="placeholder">{{ dish.desc }}</text-font>
            <figure class="recipe-like--wrapper">
              <img src="@/assets/images/icons/like.svg" class="mr-6" alt="좋아요" width="20" height="20"/>
              <figcaption>
                <text-font size="14">{{ dish.likes }}</text-font>
              </figcaption>
            </figure>

            <div class="flex">
              <span v-for="i of 4" :key="i" class="tags mr-4">{{ i }}</span>
            </div>
          </section>
        </CardUi>
        <ListsUi class="list-component" v-for="(dish) in recipeLists" :key="dish._id" @click="recipeDetail(dish._id)">
          <text-font size="18">{{ dish.name }}</text-font>
          <text-font size="14" color="placeholder">{{ dish.desc }}</text-font>
          <figure class="recipe-like--wrapper">
            <img src="@/assets/images/icons/like.svg" class="mr-6" alt="좋아요" width="20" height="20"/>
            <figcaption>
              <text-font size="14">{{ dish.likes }}</text-font>
            </figcaption>
          </figure>
          <div class="flex">
            <span v-for="i of 4" :key="i" class="tags mr-4">{{ i }}</span>
          </div>
        </ListsUi>
      </section>
      <div class="w-100 center pt-20" v-else>
        <text-font size="18">검색된 레시피가 없습니다.</text-font>
      </div>
    </section>
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
import {RecipeState} from "@/store/modules/recipe";

@Options({
  components: {
    ListsUi, CardUi
  }
})
export default class RecipeLists extends Vue {
  isLoading = true;
  key: Partial<LocationQueryValue | LocationQueryValue[]> = [];
  total = 0;
  recipeLists: Recipe.Info[] = [];
  store = useStore();
  selectedIngredients: ComputedRef<RecipeState[]> = computed(() => this.store.getters["recipeModule/getIngredients"]);

  created() {
    const {key} = this.$route.query;
    this.key = key;

    this.load();
  }

  private async load(): Promise<void> {
    try {
      const {data} = await ins.get('/recipes/ingredient-recipes', {
        params: {
          id: this.key,
        }
      })
      this.recipeLists = data;
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
.recipe-lists--container {
  padding: 5vh 5vw;
  width: 100%;
  min-height: 500px;
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

    hr {
      display: none;
    }
  }

}
</style>