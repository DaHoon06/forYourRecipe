<template>
  <article class="box-container">
    <section class="box__body">
      <div v-if="!ingredients.length">
        <article class="ingredients-box dark">
          <section>
            <picture class="ingredients-box--status">
              <img loading="eager" decoding="async" src="@/assets/images/refrigerator.svg" alt="open_door_refrigerator"
                   width="210"/>
            </picture>
          </section>
        </article>
        <section class="empty__label">
          <text-font size="18" class="pt-12">냉장고가 비어있습니다.</text-font>
          <text-font size="14" color="textSub" class="pt-6">재료를 선택해주세요.</text-font>
        </section>
      </div>
      <section v-else>
        {{ ingredients }}
      </section>


      <section class="ingredients-box--button pt-20">
        <custom-button type="button" variant="primary" @click="pickUpModal" v-if="!ingredients.length">
          <img decoding="async" loading="eager" src="@/assets/images/icons/basket.svg" alt="재료담기" width="20" height="20"
               class="mr-6"/>
          <text-font color="white">재료 담기</text-font>
        </custom-button>
        <div class="flex" v-else>
          <custom-button type="button" variant="gray" @click="reset">
            <img loading="lazy" decoding="async" src="@/assets/images/icons/basket.svg" alt="레시피 검색" width="20"
                 height="20" class="mr-6"/>
            <text-font color="white">초기화</text-font>
          </custom-button>
          <custom-button type="button" variant="primary" @click="findRecipe">
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
    <Modal ref="modal">
      <section class="selected-ingredients--container">
        <section class="select-box--wrapper">
          <text-font>재료를 선택해주세요.</text-font>

          <div class="select-box" :class="selectBoxDisabled && 'dark'">
            <select :class="selectBoxDisabled && 'disabled'" v-model="selected">
              <option v-for="(category) of ingredientsCategory" :key="category._id" :value="category.detailedIngredient"
                      :disabled="selectBoxDisabled">
                <text-font size="12">{{ category.name }}</text-font>
              </option>
            </select>
            <picture class="angle-icons">
              <img
                loading="lazy"
                decoding="async"
                src="@/assets/images/icons/drop.svg" alt="드랍다운" width="8" height="8"/>
            </picture>
          </div>

        </section>

        <hr/>

        <section v-if="selected.length > 0" class="ingredients-items--container scroll">
            <span v-for="(value) of selected" :key="value._id"
                  @click="selectedIngredient(value._id)">
              <picture :class="value.selected ? 'disabled-icon' : 'ingredient-icon--wrapper'">
                <img loading="lazy" :src="value.img"
                     sizes="(max-width: 32px)" decoding="async" alt="식재료" width="32" height="32"/>
              </picture>
            </span>
        </section>
        <section class="empty-ingredients" v-else>
          <text-font>선택된 재료가 없습니다.</text-font>
        </section>

        <section class="selected-items">
          <text-font>선택한 재료</text-font>
          <hr/>
          <div>
            <text-font size="14" v-for="(ingredient, index) of ingredients" :key="index">{{
                ingredient.name
              }}, &nbsp;
            </text-font>
          </div>
          <text-font class="w-100 center" size="13" color="red" v-if="selectBoxDisabled">재료는 최대 3 가지만 고를 수 있습니다.
          </text-font>
        </section>
        <section class="selected-ingredients__button--wrapper">
          <custom-button type="button" variant="gray" @click="cancel">
            <text-font color="white" size="14">취소</text-font>
          </custom-button>
          <custom-button type="button" variant="primary" class="ml-8" @click="save">
            <text-font color="white" size="14">저장</text-font>
          </custom-button>
        </section>

      </section>
    </Modal>
  </teleport>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import Modal from "@/components/common/Modal.vue";
import {Ref} from "vue-property-decorator";
import {ModalComponent} from "@/types/type";
import {ins} from "@/lib/axios";
import {Recipe} from "@/interfaces/recipe";


@Options({
  components: {
    Modal
  }
})
export default class IngredientsBox extends Vue {
  @Ref('modal') readonly modal!: ModalComponent;

  ingredientsCategory: Recipe.IngredientCategories[] = [];
  ingredients: Recipe.IngredientType[] = [];
  selected = [];

  private async pickUpModal(): Promise<void> {
    this.modal.show();
    //TODO: 재료 준비
    try {
      //TypeError: Property axios does not on type IngredientsBox
      //const {data} = await this.axios.get('/99999999999asd9sa9d9as');

      const {data} = await ins.get('/ingredients/all-ingredients');
      console.log(data)
      this.ingredientsCategory = data;
    } catch (e) {
      console.log(e)
    }
  }

  private selectedIngredient(key: number): void {
    if (this.selectBoxDisabled) return;
    const choice = this.selected.filter((value: Recipe.IngredientType) => {
      const {_id, selected} = value
      if (_id === key) value.selected = !selected;
      return _id === key;
    });
    this.ingredients.push(...choice);
    this.ingredients = this.ingredients.filter((value) => {
      const {selected} = value
      if (selected) return selected
      return false;
    });
  }

  get selectBoxDisabled(): boolean {
    return this.ingredients.length === 3;
  }

  private cancel(): void {
    this.reset();
    this.modal.hide();
  }

  private save(): void {
    this.modal.hide();
  }

  private async findRecipe(): Promise<void> {
    try {
      const {data} = await ins.get('/recipes/ingredient-recipes', {
        params: {
          id: this.ingredients[0]._id
        }
      })
      console.log(data)
      console.log('레시피 검색 중~')
    } catch (e) {
      console.log(e)
    }
  }

  private reset() {
    this.ingredients = [];
    this.selected = [];
  }


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
}

.box__body {
  border: 1px solid $line;
  border-radius: 30px;
  max-width: 600px;
  min-width: 298px;
  width: 100%;
  height: 500px;
  min-height: 290px;
  //height: 100%;
  box-shadow: 0 2px 4px 0 rgba(100, 100, 100, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .empty__label {
    display: flex;
    flex-direction: column;
  }
}

.ingredients-box {
  border: 1px solid $line;
  border-radius: 50%;
  width: 310px;
  height: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &--status {
    display: flex;
    flex-direction: column;
  }
}

/* 재료 선택 모달 */
.selected-ingredients--container {
  padding: 1rem;
  text-align: left;
  max-width: 420px;
  width: 90vw;
  height: 500px;

  .select-box--wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .empty-ingredients {
    min-height: 254px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ingredients-items--container {
    min-height: 200px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(52px, 1fr));
    column-gap: 10px;
    row-gap: 0;
    padding: 10px 0;
    height: 254px;
    overflow-y: auto;

    .ingredient-icon--wrapper {
      border: 1px solid $line;
      border-radius: 50%;
      width: 52px;
      height: 52px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgba(245, 245, 245, 0.5);
      }
    }

    /* 재료 아이콘 선택 표시 */
    .disabled-icon {
      -webkit-filter: brightness(95%);
      filter: brightness(95%);
      background-color: rgba(240, 240, 240, 0.6);
      width: 52px;
      height: 52px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      cursor: pointer;

      &:hover {
        -webkit-filter: brightness(90%);
        filter: brightness(90%);
      }
    }
  }

  .selected-items {
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
  }
}
</style>
