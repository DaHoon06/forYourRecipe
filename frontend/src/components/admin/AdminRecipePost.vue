<template>
  <section class="recipe-post--container">
    <loading-spinner v-if="isLoading"/>
    <section class="recipe-post__label">
      <text-font size="24" class="pb-14">레시피 등록</text-font>
      <text-font color="label" size="16">나만의 레시피를 등록하여 다른 사람에게 공유해보세요!</text-font>
    </section>

    <form @submit.prevent="registerRecipe" class="form">
      <recipe-ui>

        <section class="recipe-grid--layout">
          <text-font size="20" class="pr-16">레시피 제목</text-font>
          <input type="text" class="input input-text" v-model="recipePost.name"/>
        </section>

        <div class="dotted my-16"/>

        <section class="recipe-grid--layout">
          <text-font size="20">레시피 소개</text-font>
          <textarea class="input scroll textarea input-text" v-model="recipePost.desc"></textarea>
        </section>

        <div class="dotted my-16"/>

        <section class="recipe-grid--layout select-box--container">
          <text-font size="20" class="pr-16">메인 재료</text-font>

          <div class="select-box">
            <select v-model="selected">
              <option v-for="(category) of ingredientsCategory" :key="category._id"
                      :value="category.detailedIngredient">
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

        <section v-if="selected.length > 0" class="ingredients-items--container scroll">
          <span v-for="(value) of selected" :key="value._id" @click="selectedIngredient(value._id)">
            <picture :class="value.selected ? 'disabled-icon' : 'ingredient-icon--wrapper'">
              <img loading="lazy" :src="value.img"
                   sizes="(max-width: 32px)" decoding="async" alt="식재료" width="32" height="32"/>
            </picture>
          </span>
        </section>

        <div class="dotted my-16"/>

        <section class="pb-20">
          <text-font size="20">재료</text-font>
          <div class="dotted my-16"/>
          <text-font size="16" color="placeholder">사용되는 재료를 입력해주세요.</text-font>

          <section class="recipe-grid--layout">
            <div/>
            <section class="recipe-ingredients__input--container">
              <div v-for="(ingredientsSection, index) of recipePost.allIngredient[0].ingredients"
                   :key="index" class="w-100 flex pb-10">
                <input type="text" class="input mr-30" v-model="ingredientsSection.name"
                       placeholder="예) 돼지고기"/>
                <input type="text" class="input mr-30" placeholder="40g" v-model="ingredientsSection.unit"/>
                <div class="flex">
                  <custom-button variant="icon-button" class="button-black mr-10" type="button"
                                 @click="addIngredientRows(index, recipePost.allIngredient[0].ingredients)">
                    <img src="@/assets/images/icons/plus.svg" alt="plus"/>
                  </custom-button>
                  <custom-button variant="icon-button" class="button-gray" type="button"
                                 @click="removeIngredientRows(index, recipePost.allIngredient[0].ingredients)">
                    <img src="@/assets/images/icons/minus.svg" alt="minus"/>
                  </custom-button>
                </div>
              </div>
            </section>

          </section>
        </section>

        <section class="pb-20">
          <text-font size="20">양념</text-font>
          <div class="dotted my-16"/>
          <section class="recipe-grid--layout">
            <div/>
            <section class="recipe-ingredients__input--container">
              <div v-for="(condimentSection, index) of recipePost.allIngredient[1].ingredients"
                   :key="index" class="w-100 flex pb-10">
                <input type="text" class="input mr-30" placeholder="예) 설탕" v-model="condimentSection.name"/>
                <input type="text" class="input mr-30" placeholder="30g" v-model="condimentSection.unit"/>
                <div class="flex">
                  <custom-button variant="icon-button" class="button-black mr-10" type="button"
                                 @click="addIngredientRows(index, recipePost.allIngredient[1].ingredients)">
                    <img src="@/assets/images/icons/plus.svg" alt="plus"/>
                  </custom-button>
                  <custom-button variant="icon-button" class="button-gray" type="button"
                                 @click="removeIngredientRows(index, recipePost.allIngredient[1].ingredients)">
                    <img src="@/assets/images/icons/minus.svg" alt="minus"/>
                  </custom-button>
                </div>
              </div>

            </section>
          </section>
        </section>

        <section class="pb-20">

          <text-font size="20">요리 순서</text-font>

          <div class="dotted my-16"/>
          <section class="recipe-grid--layout">
            <div/>
            <section>
              <div v-for="(step, index) of recipePost.steps" :key="index">
                <textarea class="input scroll textarea" v-model="step.desc"></textarea>
              </div>
            </section>

          </section>
          <div class="w-100 recipe-grid--layout pt-24">
            <div/>
            <custom-button type="button" variant="black" class="m-auto" @click="addDescRows">
              <text-font color="white" size="18">추가</text-font>
            </custom-button>
          </div>
        </section>

        <section class="pb-20">
          <div class="flex align-center">
            <text-font size="20" class="mr-14">요리 사진</text-font>
            <div>
              <label :for="`file`" class="input-file--button">
                <img src="@/assets/images/icons/image-upload.svg" width="24" height="24" alt="이미지 업로드 버튼"/>
              </label>
              <input type="file" id="file" style="display: none" accept="jpeg,png,jpg"/>
            </div>
          </div>
          <div class="dotted my-16"/>
        </section>

      </recipe-ui>

      <section class="recipe-post__button--container pt-16">
        <custom-button type="button" variant="gray" class="mr-30" @click="cancel">
          <text-font color="gray2">취소</text-font>
        </custom-button>
        <custom-button type="submit">
          <text-font color="white">레시피 등록</text-font>
        </custom-button>
      </section>
    </form>

  </section>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import RecipeUi from "@/components/ui/RecipeUi.vue";
import Input from "@/components/common/Input.vue";
import {ins} from "@/lib/axios";
import {Recipe} from "@/interfaces/recipe";

interface Steps {
  step: number;
  desc: string;
  img: string;
}

interface Ingredients {
  name: string,
  unit: string
}

interface AllIngredient {
  category: string,
  ingredients: Ingredients[]
}

interface IRecipePost {
  name: string;
  desc: string;
  steps: Steps[];
  detailedIngredient: string[],
  allIngredient: AllIngredient[];
  profileImage: string;
}

@Options({
  components: {
    RecipeUi,
    Input
  }
})
export default class AdminRecipePost extends Vue {
  recipePost: IRecipePost = {
    name: '',
    desc: '',
    steps: [
      {
        step: 1,
        desc: '',
        img: '',
      }
    ],
    detailedIngredient: [],
    allIngredient: [
      {category: '식재료', ingredients: [{name: '', unit: ''}]},
      {category: '조미료', ingredients: [{name: '', unit: ''}]},
    ],
    profileImage: '',
  }
  isLoading = true;
  selected = [];
  ingredientsCategory: Recipe.IngredientCategories[] = [];

  created() {
    this.loadCategory();
  }

  private async loadCategory() {
    try {
      const {data} = await ins.get('/ingredients/all-ingredients');
      this.ingredientsCategory = data;
      this.isLoading = false;
    } catch (e) {
      console.log(e)
    }
  }

  cancel() {
    this.$router.push('/');
  }

  //TODO: 빈 값 체크 후 넘기기
  async registerRecipe() {
    try {
      this.isLoading = true
      const {data} = await ins.post('/recipes/register-admin-recipe', this.recipePost);
      console.log(data)
      this.isLoading = false;
    } catch (e) {
      console.log(e);
    }
  }

  private selectedIngredient(_id: string): void {
    const index = this.recipePost.detailedIngredient.findIndex((value) => value === _id)
    if (index > -1) this.recipePost.detailedIngredient.splice(index, 1);
    else this.recipePost.detailedIngredient.push(_id)

    this.selected.filter((value: Recipe.IngredientType) => {
      const {_id: key, selected} = value
      if (key === _id) value.selected = !selected;
      return key === _id;
    });
  }

  private addIngredientRows(index: number, arr: Ingredients[]): void {
    if (arr.length === 10) return;
    arr.push({name: '', unit: ''});
  }

  private removeIngredientRows(index: number, arr: Ingredients[]): void {
    if (arr.length === 1) return;
    arr.splice(index, 1)
  }

  private addDescRows() {
    const step = this.recipePost.steps.length;
    this.recipePost.steps.push({step: step + 1, desc: '', img: ''})
  }
}
</script>

<style scoped lang="scss">
.recipe-post--container {
  width: 100%;
  margin: auto;
  padding: 5vw;

  .recipe-grid--layout {
    display: grid;
    grid-template-columns: 3fr 12fr;
    align-items: center;
  }

  .recipe-ingredients__input--container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .recipe-post--ingredients {
    display: flex;
    align-items: center;
  }

  .recipe-post__label {
    display: flex;
    flex-direction: column;
    max-width: 1154px;
    margin: auto;
    padding-bottom: 36px;
  }


  .recipe-post__button--container {
    display: flex;
    justify-content: flex-end;
  }

  .input-file--button {
    background-color: #494949;
    padding: 4px 8px;
    cursor: pointer;
    width: fit-content;
    border: 1px solid transparent;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 46px;
    color: #222222;
  }

  .ingredients-items--container {
    min-height: 5vh;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(52px, 1fr));
    column-gap: 10px;
    row-gap: 0;
    padding: 10px 0;
    overflow-y: auto;

    /* 재료 아이콘 선택 표시 */
    .disabled-icon {
      -webkit-filter: brightness(95%);
      filter: brightness(95%);
      background-color: rgba(240, 240, 240, 0.6);
      width: 54px;
      height: 54px;
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
}

@mixin defaultButton() {
  padding: 4px 8px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px !important;
  height: 40px;
}

.button-black {
  @include defaultButton();
  background-color: #494949;
}

.button-gray {
  background-color: #EDEDED;
  @include defaultButton();
}

.form {
  height: 100%;
  max-width: 1154px;
  margin: auto;
}

@import "src/assets/css/font";

input::placeholder {
  color: $textPlaceholder;
}

input::-webkit-input-placeholder {
  color: $textPlaceholder;
}

input:-ms-input-placeholder {
  color: $textPlaceholder;
}

textarea::placeholder {
  color: $textPlaceholder;
}

textarea::-webkit-input-placeholder {
  color: $textPlaceholder;
}

textarea:-ms-input-placeholder {
  color: $textPlaceholder;
}

.input {
  box-sizing: border-box;
  font-family: $jua;
  outline: none;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  color: $black;
  background-color: $white;
  min-height: 38px;
  padding: 4px 8px;
  width: 100%;
  resize: none;
}

.textarea {
  min-height: 100px;
}

@media screen and (max-width: 600px) {
  .recipe-post--container {
    input {
      margin-right: 5px;
    }

    .input-text {
      margin-top: 0.8em;
    }

    .select-box--container {
      display: flex !important;
    }

    .recipe-grid--layout {
      //display: flex;
      display: inline-block;
      padding-top: 1rem;
      width: 100%;
    }

    .recipe-post__button--container {
      justify-content: center
    }
  }

}
</style>
