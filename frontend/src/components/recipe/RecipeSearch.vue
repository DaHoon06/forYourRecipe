<template>
  <loading-spinner v-if="isLoading"/>
  <div class="w-100" v-for="(dish) of recipeList" :key="dish._id">
    <card-ui :card-item="dish"/>
    <lists-ui :list-item="dish"/>
  </div>
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
      const {data} = await ins.get(`/recipes/search/${this.keyword}`, {
        params: {
          page: this.page
        }
      })
      this.recipeList = data;
      this.isLoading = false;
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
