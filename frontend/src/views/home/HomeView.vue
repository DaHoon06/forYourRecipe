<template>
  <main class="main" role="main">
    <loading-spinner v-if="isLoading"/>

    <IngredientsBox class="main__top"/>

    <section class="main__body">
      <section class="main__body--container">
        <div class="main__label--wrapper">
          <text-font class="today-recommended-dishes" color="black" size="18" weight="medium">오늘의 추천 레시피</text-font>
          <custom-button type="button" variant="icon-button" class="redirect-all-recipe" @click="findAllRecipe">
            <text-font color="placeholder" size="14" class="pr-6" weight="regular">전체보기</text-font>
            <img src="@/assets/images/icons/redirect.svg" width="24" height="24" alt="all recipe"/>
          </custom-button>
        </div>
        <hr/>
        <section class="card--wrapper" v-if="recipeCards.length > 0">
          <div v-for="(dish) in recipeCards" :key="dish._id" class="w-100">
            <card-ui :recipe-detail="() => recipeDetail(dish._id)" :card-item="dish"/>
            <lists-ui :recipe-detail="() => recipeDetail(dish._id)" :list-item="dish"/>
          </div>
        </section>
        <section class="center w-100 pt-40" v-else>
          <text-font weight="medium" color="secondary-light">등록된 레시피가 없습니다.</text-font>
        </section>
      </section>
    </section>
  </main>
</template>

<script lang="ts" setup>
import CardUi from "@/components/ui/CardUi.vue";
import IngredientsBox from "@/components/ingredients/IngredientsBox.vue";
import {ins} from "@/lib/axios";
import ListsUi from "@/components/ui/ListsUi.vue";
import {Recipe} from "@/interfaces/recipe";
import {ref, Ref} from "vue";
import {useRouter} from "vue-router";
import store from '@/store';

const isLoading: Ref<boolean> = ref(true);
const recipeCards: Ref<Recipe.Info[]> = ref([]);

const router = useRouter();

const findAllRecipe = (): void => {
  store.commit('utilModule/setCurrentPath', 1)
  router.push('/recipe/all')
};

const load = async (): Promise<void> => {
  try {
    const {data} = await ins.get('/recipes/random-recipes');
    recipeCards.value = data;
    isLoading.value = false;
  } catch (e) {
    console.log(e)
  }
}

const recipeDetail = (id: string): void => {
  router.push(`/recipe/detail/${id}`);
};

load();
</script>

<style scoped lang="scss">
hr {
  margin: 0;
  border-color: #A3A3A3;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto;
  height: 100%;

  .main__top {
    width: 100%;
  }
}

.main__body--container {
  padding: 2rem;
}

.main__label--wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.4em;
}

.redirect-all-recipe {
  display: flex;;
  align-items: center;

  &:hover {
    p {
      color: $gray1;
    }
  }
}

@media screen and (max-width: 600px) {
  .main__body--container {
    padding: 0 0 4rem 0;

    .main__label--wrapper {
      padding: 1rem !important;
    }

    .today-recommended-dishes {
      font-size: 18px !important;
    }
  }
}


</style>
