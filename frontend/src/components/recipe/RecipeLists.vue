<template>
  <section class="recipe-lists--container">
    <section class="recipe-lists__label">
      <text-font size="18" class="pr-6">검색 결과</text-font>
      <text-font size="16" color="placeholder">{{ total }}</text-font>
    </section>
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

@Options({
  components: {
    ListsUi, CardUi
  }
})
export default class RecipeLists extends Vue {
  key: Partial<LocationQueryValue | LocationQueryValue[]> = [];
  total = 0;

  recipeLists: Recipe.Info[] = [];

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
    } catch (e) {
      console.log(e)
    }
  }

  private recipeDetail(id: string) {
    this.$router.push(`/recipe/${id}`)
  }

}
</script>

<style lang="scss" scoped>
.recipe-lists--container {
  padding: 5vh 5vw;
  width: 100%;
  min-height: 500px;
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