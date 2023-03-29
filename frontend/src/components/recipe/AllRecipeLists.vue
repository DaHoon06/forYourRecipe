<template>
  <section class="all-recipe--container">
    <loading-spinner v-if="isLoading"/>
    <div class="all-recipe__label">
      <text-font size="16" weight="medium" class="pr-12" color="black">전체 레시피</text-font>
      <text-font size="12" color="gray2" weight="regular">{{ total }}</text-font>
    </div>

    <hr/>

    <section class="card--wrapper">
      <div v-for="(dish) in recipeLists" :key="dish._id" class="w-100">
        <CardUi :recipe-detail="() => recipeDetail(dish._id)" class="card-component" :card-item="dish"/>
        <ListsUi :recipe-detail="() => recipeDetail(dish._id)" class="list-component" :list-item="dish"/>
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
        <text-font weight="regular" color="textSub">검색된 레시피가 없습니다.</text-font>
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

@Options({
  components: {
    ListsUi, CardUi,
  }
})
export default class AllRecipeLists extends Vue {
  isLoading = true;
  recipeLists: Recipe.Info[] = [];
  total = 0;
  page = 1;

  private async infiniteHandler($state: any): Promise<void> {
    try {
      const {data} = await ins.get('/recipes/all-recipes', {
        params: {
          page: this.page
        }
      })

      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          this.recipeLists.push({...data[i]});
        }
        this.page += 1;
        this.total += data.length;
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

<style scoped lang="scss">
hr {
  margin: 0;
  border: none;
  height: 1px;
  background-color: $line;
}

.all-recipe--container {
  padding: 1rem 0;
  max-width: 1280px;
  min-height: 700px;
  margin: auto;

  .all-recipe__label {
    display: flex;
    align-items: center;
    padding: 1em 0;
    width: 100%;
  }

}

@media screen and (max-width: 1280px) {
  .all-recipe--container {
    padding: 0;

    .all-recipe__label {
      padding-left: 1rem !important;
    }
  }
}

@media screen and (max-width: 600px) {
  .all-recipe--container {
    padding: 0;

    .all-recipe__label {
      padding: 1em 0.5em;
    }
  }
}
</style>
