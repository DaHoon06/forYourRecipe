<template>
  <form @submit.prevent="search" class="search__input--wrapper" role="search">
    <input class="search__input" type="text" placeholder="Search..." v-model="keyword"/>
    <custom-button class="search__button" variant="icon-button" type="submit" @submit="search">
      <img aria-label="search button" src="@/assets/images/icons/search.svg" alt="검색 버튼" width="22" height="22"/>
    </custom-button>
  </form>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import store from '@/store';

const keyword = ref('');
const router = useRouter();
const route = useRoute();

watch(route, () => keyword.value = '', {deep: true, immediate: false})

const search = async (): Promise<void> => {
  try {
    if (keyword.value.length === 0 || !keyword.value) return;
    store.commit("utilModule/setCurrentPath", 0);
    await router.push(`/recipe/search/${keyword.value}`)
  } catch (e) {
    console.log(e)
  }
}

</script>

<style scoped lang="scss">
.search__input--wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;

  .search__input {
    outline: none;
    background-color: $white;
    border: 1px solid $hr;
    font-family: $kor;
    border-radius: 2px;
    font-size: 15px;
    padding: 8px 2em 8px 0.8em;
    color: #A3A3A3;
    max-width: 300px;
    width: 100%;
    height: 18px;

    &:focus {
      border-color: $gray1;
      color: $black;
    }
  }

  .search__button {
    position: relative;
    right: 2rem;
  }
}

@media screen and (max-width: 600px) {
  .search__input {
    max-width: 180px !important;
    width: 100%;
  }
}
</style>
