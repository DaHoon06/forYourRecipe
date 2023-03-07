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
          <input type="text" class="input" v-model="recipePost.name"/>
        </section>

        <div class="dotted mt-16 mb-16"/>

        <section class="recipe-grid--layout">
          <text-font size="20">레시피 소개</text-font>
          <textarea class="input scroll textarea" v-model="recipePost.desc"></textarea>
        </section>

        <div class="dotted mt-16 mb-16"/>

        <section class="pb-20">
          <text-font size="20">재료</text-font>
          <div class="dotted mt-16 mb-16"/>
          <section class="recipe-grid--layout">
            <text-font size="16" color="placeholder">사용되는 재료를 입력해주세요.</text-font>
            <section class="recipe-ingredients__input--container">
              <input type="text" class="input mr-30" v-model="recipePost.detailedIngredient"/>
              <input type="text" class="input mr-30"/>
              <div class="flex">
                <custom-button variant="icon-button" class="button-black mr-10" type="button">
                  <img src="@/assets/images/icons/plus.svg" alt="plus"/>
                </custom-button>
                <custom-button variant="icon-button" class="button-gray" type="button">
                  <img src="@/assets/images/icons/minus.svg" alt="minus"/>
                </custom-button>
              </div>
            </section>
          </section>
        </section>

        <section class="pb-20">
          <text-font size="20">양념</text-font>
          <div class="dotted mt-16 mb-16"/>
          <section class="recipe-grid--layout">
            <div/>
            <section class="recipe-ingredients__input--container">
              <input type="text" class="input mr-30"/>
              <input type="text" class="input mr-30"/>
              <div class="flex">
                <custom-button variant="icon-button" class="button-black mr-10" type="button">
                  <img src="@/assets/images/icons/plus.svg" alt="plus"/>
                </custom-button>
                <custom-button variant="icon-button" class="button-gray" type="button">
                  <img src="@/assets/images/icons/minus.svg" alt="minus"/>
                </custom-button>
              </div>
            </section>
          </section>
        </section>

        <section class="pb-20">

          <text-font size="20">요리 순서</text-font>

          <div class="dotted mt-16 mb-16"/>
          <section class="recipe-grid--layout">
            <div/>
            <textarea class="input scroll textarea"></textarea>
          </section>
          <div class="w-100 recipe-grid--layout pt-24">
            <div/>
            <custom-button type="button" variant="black" class="m-auto">
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
          <div class="dotted mt-16 mb-16"/>
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
import {ins} from "@/lib/axios";

interface Steps {
  step: number;
  desc: string;
  img: string;
}

interface Ingredient {
  _id: string;
  name: string;
  img: string;
}

interface DetailedIngredient {
  ingredient: Ingredient[],
  condiment: Ingredient[],
}

interface IRecipePost {
  name: string;
  desc: string;
  steps: Steps[];
  detailedIngredient: DetailedIngredient[],
  allIngredient: string;
  profileImage: string;
}

@Options({
  components: {
    RecipeUi,
  }
})
export default class RecipePost extends Vue {
  recipePost: IRecipePost = {
    name: '',
    desc: '',
    steps: [],
    detailedIngredient: [],
    allIngredient: '',
    profileImage: '',
  }

  isLoading = true;

  created() {

    setTimeout(() => {
      this.isLoading = false;
    }, 500)
  }

  private cancel() {
    this.$router.push('/');
  }

  private async registerRecipe() {
    try {
      console.log('롸', this.recipePost)

    } catch (e) {
      console.log(e);
    }
  }


  // TODO 함수 add, remove 하나씩으로 통합해서 사용하도록 수정
  addIngredientRows() {
    console.log('?')
  }

  removeIngredientRows() {
    console.log('?')
  }

  addCondimentRows() {
    console.log('?')
  }

  removeCondimentRows() {
    console.log('?')
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

.input {
  box-sizing: border-box;
  font-family: $kor;
  outline: none;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  color: $black;
  background-color: $white;
  min-height: 46px;
  padding: 4px 8px;
  width: 100%;
  resize: none;
}

.textarea {
  min-height: 100px;
}

</style>
