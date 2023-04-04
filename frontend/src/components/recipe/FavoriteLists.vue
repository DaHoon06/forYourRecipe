<template>
  <loading-spinner v-if="isLoading"/>
  <div class="recipe-favorite--container">
    <section class="pt-60 pb-60">
      <mark-label :label="'BOOKMARK RECIPES'"/>
    </section>

    <section class="main__body">
      <p class="w-100 text-right pr-16">
        <text-font weight="medium" color="black">정렬</text-font>
        <drop-down color="black" class="ml-10"/>
      </p>

      <hr/>

      <section class="card--wrapper" v-if="recipeLists.length > 0">
        <div v-for="(dish) in recipeLists" :key="dish._id" class="w-100">
          <CardUi :recipe-detail="() => recipeDetail(dish._id)" class="card-component" :card-item="dish"/>
          <ListsUi :recipe-detail="() => recipeDetail(dish._id)" class="list-component" :list-item="dish"/>
        </div>
      </section>
      <p class="w-100 center pt-16" v-else>
        <text-font weight="medium" variant="textSub">등록한 레시피가 없습니다.</text-font>
      </p>
    </section>
    <infinite-loading @infinite="infiniteHandler">
      <template #spinner>
        <span style="display: none;"/>
      </template>
      <template #no-more>
        <span style="display: none;"/>
      </template>
      <template #no-results>
        <text-font weight="regular" color="textSub">등록한 레시피가 없습니다.</text-font>
      </template>
    </infinite-loading>
  </div>
</template>

<script lang="ts" setup>
import {ins} from "@/lib/axios";
import {Recipe} from "@/interfaces/recipe";
import ListsUi from "@/components/ui/ListsUi.vue";
import CardUi from "@/components/ui/CardUi.vue";
import DropDown from '@/components/icons/DropDown.vue';
import {Ref, ref} from "vue";
import {useRouter} from "vue-router";
import store from '@/store';
import MarkLabel from '@/components/common/TextLabel.vue';

const isLoading = ref(true);
const recipeLists: Partial<Ref<Recipe.Info[]> | Recipe.Info[]> = ref([]);
const total = ref(0);
const page = ref(1);
const router = useRouter();


const infiniteHandler = async ($state: any): Promise<void> => {
  try {
    const uid = store.getters['userModule/getUid'];
    const {data} = await ins.get(`/recipes/favorites/${uid}`, {
      params: {
        page: page.value
      }
    });
    console.log(data)
    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        recipeLists.value!.push({...data[i]});
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
.recipe-favorite--container {
  background-color: white;
  width: 100%;
  margin: auto;
  height: 100%;
}

@media screen and (max-width: 600px) {
  .recipe-favorite--container {
    padding-top: 40px;
  }
}
</style>
