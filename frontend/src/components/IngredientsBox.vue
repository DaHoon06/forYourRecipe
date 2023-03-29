<template>
  <div>
    <article class="box-container">
      <div class="box__body">

        <dialog-modal :title="dialogTitle" :isOpen="isOpen"/>

        <section v-if="!state.ingredients.length">
          <article class="ingredients-box">
            <section>
              <section class="empty__label">
                <text-font size="15" color="textBody" class="pt-12">보고싶은 레시피의</text-font>
                <text-font size="15" color="textBody" class="pt-6">주 재료를 선택해주세요.</text-font>
              </section>
            </section>
          </article>
        </section>
        <section class="w-100" v-else>
          <text-font weight="semiBold" class="selected-ingredients__label">선택한 재료</text-font>
          <div class="ingredients-box--selected">
          <span v-for="(value) of state.ingredients" :key="value._id">
            <ingredient-icon :src="value.img" :label="value.name"/>
          </span>
          </div>
        </section>

        <section class="ingredients-box--button pt-20">
          <custom-button type="button" variant="gray-rounded" @click="pickUpModal"
                         v-if="!state.ingredients.length">
            <text-font color="textTitle">재료 담기</text-font>
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

      </div>
    </article>

    <teleport to="#modal">
      <modal-component ref="modal">
        <section class="selected-ingredients--container">
          <text-font class="pb-14" weight="medium" color="textTitle" size="14">재료를 선택해주세요.</text-font>

          <section class="ingredients-items--box scroll">
            <div v-for="(value) of state.ingredientsCategory" :key="value._id" class="pb-10">
              <text-font color="textTitle" size="14" weight="normal">{{ value.name }}</text-font>
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
            <text-font weight="normal" color="textBody">선택한 재료</text-font>
            <hr/>
            <div>
              <text-font size="14" v-for="(ingredient, index) of state.ingredients" :key="index">{{
                  ingredient.name
                }}, &nbsp;
              </text-font>
            </div>
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
  </div>
</template>

<script lang="ts" setup>
import ModalComponent from "@/components/common/modal/ModalComponent.vue";
import {ModalComponentType} from "@/types/type";
import {ins} from "@/lib/axios";
import {Recipe} from "@/interfaces/recipe";
import IngredientIcon from "@/components/icons/IngredientIcon.vue";
import {computed, reactive, Ref, ref} from "vue";
import {useRouter} from "vue-router";
import DialogModal from "@/components/common/modal/DialogModal.vue";
import store from '@/store';

interface State {
  ingredientsCategory: Recipe.IngredientCategories[],
  ingredients: Recipe.IngredientType[],
  selected: any[],
}

const isOpen = computed(() => store.getters['tempModule/dialog']);
const dialogTitle = computed(() => store.getters['tempModule/dialogTitle']);

const modal: Ref<ModalComponentType | null> = ref(null);

const state: State = reactive({
  ingredientsCategory: [],
  ingredients: [],
  selected: [],
});

const selectBoxDisabled = computed(() => state.ingredients.length === 3);
const router = useRouter();


const pickUpModal = async (): Promise<void> => {
  modal.value!.show();
  store.commit('recipeModule/reset');
  try {
    const {data} = await ins.get('/ingredients/all-ingredients');
    state.ingredientsCategory = data;
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
  modal.value!.hide();
}

const save = (): void => {
  store.commit("recipeModule/saveIngredients", state.ingredients);
  modal.value!.hide();
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
  border: 1px solid $hr;
  max-width: 600px;
  min-width: 298px;
  width: 100%;
  height: 500px;
  min-height: 290px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);

  .selected-ingredients__label {
    padding: 2rem 0;
  }

  .ingredients-box--selected {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    justify-items: center;
    row-gap: 1rem;
    width: 80%;
    margin: auto auto 1rem auto;
    column-gap: 1rem
  }
}

.ingredients-box {
  border-top: 1px solid $hr;
  border-bottom: 1px solid $hr;
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
    border: 1px solid $hr;
    border-radius: 2px;

    .ingredients-icon--wrapper {
      display: flex;
      column-gap: 10px;
      row-gap: 4px;
      width: 100%;
      padding-bottom: 1rem;
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
    justify-content: space-evenly;
    padding-top: 1rem;
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

      .selected-ingredients__label {
        width: 100%;
        text-align: left;
        padding: 2rem 1rem;
      }
    }
  }
}
</style>
