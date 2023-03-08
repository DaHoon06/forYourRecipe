<template>
  <loading-spinner v-if="state.isLoading"/>
  <article class="box-container">
    <section class="box__body">
      <div v-if="!state.ingredients.length">
        <article class="ingredients-box">
          <section>
            <section class="empty__label">
              <text-font size="18" class="pt-12">냉장고가 비어있습니다.</text-font>
              <text-font size="14" color="textBody" class="pt-6">재료를 선택해주세요.</text-font>
            </section>
          </section>
        </article>
      </div>
      <section class="w-100" v-else>
        <text-font>선택한 재료</text-font>
        <div class="ingredients-box--selected">
          <span v-for="(value) of state.ingredients" :key="value._id">
            <ingredient-icon :src="value.img" :label="value.name"/>
          </span>
        </div>
      </section>

      <section class="ingredients-box--button pt-20">
        <custom-button type="button" variant="black" @click="pickUpModal" v-if="!state.ingredients.length">
          <text-font color="white">재료 담기</text-font>
        </custom-button>
        <div class="flex" v-else>
          <custom-button type="button" variant="gray" @click="reset">
            <text-font color="white">초기화</text-font>
          </custom-button>
          <custom-button type="button" variant="black" class="ml-16" @click="findRecipe">
            <img loading="lazy" decoding="async" src="@/assets/images/icons/basket.svg" alt="레시피 검색" width="20"
                 height="20" class="mr-6"/>
            <text-font color="white">레시피 검색</text-font>
          </custom-button>
        </div>

      </section>
    </section>
  </article>
  <!-- TODO: 재료 선택 컴포넌트 분리 작업 -->
  <teleport to="#modal">
    <modal-component ref="modal">
      <section class="selected-ingredients--container">
        <text-font class="pb-14">재료를 선택해주세요.</text-font>

        <section class="ingredients-items--box scroll">
          <div v-for="(value) of state.ingredientsCategory" :key="value._id" class="pb-10">
            <text-font size="18" weight="bold">{{ value.name }}</text-font>
            <hr/>
            <section class="ingredients-icon--wrapper">
              <div v-for="(items) of value.detailedIngredient" :key="items._id" @click="selectedIngredient(items)"
                   class="flex-column-center">
                <ingredient-icon :selected="items.selected" :src="items.img" :label="items.name"/>
              </div>
            </section>
          </div>
        </section>

        <section class="selected-items">
          <text-font>선택한 재료</text-font>
          <hr/>
          <div>
            <text-font size="14" v-for="(ingredient, index) of state.ingredients" :key="index">{{
                ingredient.name
              }}, &nbsp;
            </text-font>
          </div>
          <text-font class="w-100 center" size="13" color="red" v-if="selectBoxDisabled">재료는 최대 3 가지만 고를 수 있습니다.
          </text-font>
        </section>
        <section class="selected-ingredients__button--wrapper">
          <custom-button type="button" variant="gray" @click="cancel">
            <text-font color="gray2" size="14">취소</text-font>
          </custom-button>
          <custom-button type="button" variant="black" class="ml-8" @click="save">
            <text-font color="white" size="14">저장</text-font>
          </custom-button>
        </section>

      </section>
    </modal-component>
  </teleport>
</template>

<script lang="ts" setup>
import ModalComponent from "@/components/common/ModalComponent.vue";
import {ModalComponentType} from "@/types/type";
import {ins} from "@/lib/axios";
import {Recipe} from "@/interfaces/recipe";
import {useStore} from "vuex";
import IngredientIcon from "@/components/common/IngredientIcon.vue";
import {computed, onMounted, reactive, Ref, ref} from "vue";
import {useRouter} from "vue-router";

interface State {
  isLoading: boolean,
  ingredientsCategory: Recipe.IngredientCategories[],
  ingredients: Recipe.IngredientType[],
  selected: any[],
}

const modal: Ref<ModalComponentType> = ref(null);

const state: State = reactive({
  isLoading: true,
  ingredientsCategory: [],
  ingredients: [],
  selected: [],
});

const selectBoxDisabled = computed(() => state.ingredients.length === 3);
const store = useStore();
const router = useRouter();

onMounted(() => state.isLoading = false);

const pickUpModal = async (): Promise<void> => {
  state.isLoading = true;
  modal.value.show();
  store.commit('recipeModule/reset');
  try {
    const {data} = await ins.get('/ingredients/all-ingredients');
    state.ingredientsCategory = data;
    state.isLoading = false;
  } catch (e) {
    console.log(e)
  }
}

const selectedIngredient =
  (ingredient: Recipe.IngredientType): void => {
    const {selected} = ingredient;
    if (selected) ingredient.selected = !selected;
    else ingredient.selected = true;
    const index = state.ingredients.findIndex((item) => item._id === ingredient._id);
    if (index < 0) state.ingredients.push(ingredient)
    else state.ingredients.splice(index, 1);
  }

const cancel = (): void => {
  reset();
  modal.value.hide();
}

const save = (): void => {
  state.isLoading = true;
  store.commit("recipeModule/saveIngredients", state.ingredients);
  modal.value.hide();
  state.isLoading = false;
}

const findRecipe = (): void => {
  const query = state.ingredients.map((value) => value._id)
  router.push({
    path: '/recipe/lists',
    query: {key: query}
  })
}

const reset = (): void => {
  store.commit('recipeModule/reset');
  state.ingredients = [];
  state.selected = [];
}
</script>

<style lang="scss" scoped>
.box-container {
  text-align: center;
  padding: 30px 0;
  width: 100%;
  height: 100%;
  max-height: 600px;
  display: flex;
  justify-content: center;
  margin-top: 40px; //새로 추가
}

.box__body {
  border: 1px solid $line;
  max-width: 600px;
  min-width: 298px;
  width: 100%;
  height: 500px;
  min-height: 290px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .ingredients-box--selected {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    column-gap: 1rem;
    row-gap: 0;
  }
}

.ingredients-box {
  border-top: 1px solid $line;
  border-bottom: 1px solid $line;
  width: 310px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &--status {
    display: flex;
    flex-direction: column;
  }
}

.empty__label {
  display: flex;
  flex-direction: column;
}

/* 재료 선택 모달 */
.selected-ingredients--container {
  padding: 1rem;
  text-align: left;
  max-width: 420px;
  width: 90vw;
  height: 500px;

  .empty-ingredients {
    min-height: 254px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ingredients-items--box {
    padding: 10px;
    min-height: 200px;
    height: 254px;
    border: 1px solid $line;

    .ingredients-icon--wrapper {
      display: flex;
      column-gap: 10px;
      row-gap: 4px;
      width: 100%;
    }

    .ingredients-items--container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(52px, 1fr));
      column-gap: 10px;
      row-gap: 0;
      overflow-y: auto;
    }
  }

  .selected-items {
    padding-top: 1rem;
    height: 100px;
  }

  .selected-ingredients__button--wrapper {
    width: 100%;
    display: flex;
    justify-content: end;
  }
}

@media screen and (max-width: 760px) {
  .box-container {
    display: inline-block;
    margin-top: 0;

    .box__body {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid $line;
      box-shadow: none;
      max-width: 100%;
    }
  }
}

@media screen and (max-width: 600px) {
  .box-container {
    padding: 0;

    .box__body {
      height: 400px;
    }
  }
}
</style>
