<template>
  <section class="all-recipe--container">
    <loading-spinner v-if="isLoading"/>

    <section class="pt-60 pb-60">
      <mark-label :label="'ALL RECIPES'"/>
    </section>

    <div class="all-recipe__label">
      <text-font size="16" weight="medium" class="pr-12" color="black">전체 레시피</text-font>
      <text-font size="12" color="gray2" weight="regular">{{ total }}</text-font>
    </div>

    <hr/>

    <section class="main__body">
      <div class="card--wrapper">
        <div v-for="(dish) in recipeLists" :key="dish._id" class="w-100">
          <CardUi :recipe-detail="() => recipeDetail(dish._id)" class="card-component" :card-item="dish"/>
          <ListsUi :recipe-detail="() => recipeDetail(dish._id)" class="list-component" :list-item="dish"/>
        </div>
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

<script lang="ts" setup>
import {ins} from "@/lib/axios";
import {Recipe} from "@/interfaces/recipe";
import ListsUi from "@/components/ui/ListsUi.vue";
import CardUi from "@/components/ui/CardUi.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";
import MarkLabel from '@/components/common/TextLabel.vue';

const isLoading = ref(true);
const recipeLists: Recipe.Info[] = ref([]);
const total = ref(0);
const page = ref(1);
const router = useRouter();

const infiniteHandler = async ($state: any): Promise<void> => {
  try {
    const {data} = await ins.get('/recipes/all-recipes', {
      params: {
        page: page.value
      }
    })

    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        recipeLists.value.push({...data[i]});
      }
      page.value += 1;
      total.value += data.length;
      $state.loaded();
      isLoading.value = false;
    } else {
      $state.complete();
      isLoading.value = false;
    }
  } catch (e) {
    console.log(e)
  }
}

const recipeDetail = (id: string): void => {
  router.push(`/recipe/detail/${id}`)
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
  padding: 0 20px;
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
    //padding: 0;

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
