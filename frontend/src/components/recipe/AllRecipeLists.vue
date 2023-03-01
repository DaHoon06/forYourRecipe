<template>
<section>
  <loading-spinner v-if="isLoading"/>

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
import InfiniteLoading from "infinite-loading-vue3-ts";

@Options({
  components: {
    ListsUi, CardUi,
    InfiniteLoading
  }
})
export default class AllRecipeLists extends Vue {
  isLoading = true;
  recipeLists: Recipe.Info[] = [];
  page = 1;

  private async infiniteHandler($state: any): Promise<void> {
    try {
      this.isLoading = true;
      const { data} = await ins.get('/recipe/all-recipes', {
        params: {
          page: this.page
        }
      })

      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          this.recipeLists.push({...data[i]});
        }
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

<style scoped lang="scss">
.card--wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
  row-gap: 1rem;
  margin-top: 70px; //새로 추가
}

@media screen and (max-width: 600px) {
  .card--wrapper {
    row-gap: 0;
    margin-top: 0;
  }
}
</style>
