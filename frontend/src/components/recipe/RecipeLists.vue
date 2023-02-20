<template>
  <section class="recipe-lists--container">
    <section>
      <text-font size="18" class="pr-6">검색 결과</text-font>
      <text-font size="16" color="placeholder">{{ total }}</text-font>
    </section>
    <hr/>
    <section>
      {{ key }}

    </section>
  </section>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {ins} from "@/lib/axios";

export default class RecipeLists extends Vue {
  key: string[] = [];
  total = 0;

  created() {
    const {key} = this.$route.query;
    this.key = key;

    this.load();
  }

  private async load(): void {
    try {
      const {data} = await ins.get('/recipes/ingredient-recipes', {
        params: {
          id: this.key,
        }
      })
      console.log(data);
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.recipe-lists--container {
  padding: 5vh 5vw;
  width: 100%;
  min-height: 500px;
}
</style>