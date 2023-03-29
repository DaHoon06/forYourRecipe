<template>
  <loading-spinner v-if="isLoading"/>
  <article class="search-result--container">
    <section class="search-result__label">
      <text-font size="16" weight="medium" color="black">검색 결과</text-font>
    </section>
    <hr/>
    <section class="card--wrapper" v-if="recipeList.length > 0">
      <div v-for="(dish) of recipeList" :key="dish._id" class="wrapper">
        <card-ui :recipe-detail="() => recipeDetail(dish._id)" :card-item="dish"/>
        <lists-ui :recipe-detail="() => recipeDetail(dish._id)" :list-item="dish"/>
      </div>
    </section>
    <section class="search-no-result" v-else>
      <text-font class="w-100 center" weight="regular" color="textSub">검색된 레시피가 없습니다. 레시피를 등록해보세요.
      </text-font>
    </section>
  </article>

</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {ins} from "@/lib/axios";
import CardUi from "@/components/ui/CardUi.vue";
import ListsUi from "@/components/ui/ListsUi.vue";

@Options({
  components: {
    CardUi,
    ListsUi
  }
})
export default class RecipeSearch extends Vue {
  keyword = '';
  isLoading = true;
  page = 1;
  recipeList = []

  created() {
    this.keyword = this.$route.params.keyword as string;
    this.load();
  }

  private async load(): Promise<void> {
    try {
      const {data} = await ins.get(`/recipes/search`, {
        params: {
          keyword: this.keyword,
          page: this.page
        }
      })
      this.recipeList = data;
      this.isLoading = false;
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

.search-result--container {
  padding: 1rem 0;
  max-width: 1280px;
  min-height: 700px;
  margin: auto;

  .search-result__label {
    padding: 0.4em 0;
  }

  .search-no-result {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media screen and (max-width: 1280px) {
  .search-result--container {
    padding: 0;
  }
}

.wrapper {
  width: fit-content;
}

@media screen and (max-width: 600px) {
  .search-result--container {
    .search-result__label {
      padding: 1rem;
    }
  }

  .wrapper {
    width: 100%;
  }

  .card--wrapper {
    padding: 0;
    margin-top: 0;
  }
}
</style>
