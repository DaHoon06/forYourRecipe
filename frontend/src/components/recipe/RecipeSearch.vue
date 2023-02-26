<template>
  <loading-spinner v-if="isLoading"/>
  <card-ui :src="item.profileImage" v-for="(item, index) of recipeList" :key="index">
     {{item.name}}
  </card-ui>
  <lists-ui :src="item.profileImage" v-for="(item, index) of recipeList" :key="index">
    {{item.name}}
  </lists-ui>
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

  recipeList = []

  created() {
    this.keyword = this.$route.params.keyword as string;
    this.load();
  }

  private async load(): Promise<void> {
    try {
      const {data} = await ins.get(`/recipes/search/${this.keyword}`)
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
