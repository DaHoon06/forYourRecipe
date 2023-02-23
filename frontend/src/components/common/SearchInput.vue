<template>
  <form @submit.prevent="search" class="search__input--wrapper">
    <input class="search__input" type="text" placeholder="Search..." v-model="keyword"/>
    <custom-button variant="icon-button" type="submit" @submit="search">
      <img src="@/assets/images/icons/search.svg" alt="검색 버튼" width="22" height="22" loading="eager"/>
    </custom-button>
  </form>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {Watch} from "vue-property-decorator";

export default class SearchInput extends Vue {
  keyword = '';

  @Watch('$route')
  removeKeyword() {
    this.keywordReset();
  }

  private async search(): Promise<void> {
    try {
      this.$router.push(`/recipe/search/${this.keyword}`)
    } catch (e) {
      console.log(e)
    }
  }

  private keywordReset(): void {
    this.keyword = '';
  }
}
</script>

<style scoped lang="scss">
.search__input--wrapper {
  display: flex;
  width: 100%;

  .search__input {
    outline: none;
    background-color: $white;
    border-radius: 50px;
    border: 1px solid #D2D2D2;
    font-family: jua;
    font-size: 15px;
    padding: 8px 2em 8px 0.8em;
    color: #A3A3A3;
    max-width: 300px;
    width: 100%;
    height: 18px;

    &:focus {
      border-color: #8f8f8f;
    }
  }

  button {
    position: relative;
    right: 2rem;
  }
}
</style>