<template>
  <section class="recipe-post--container">
    <loading-spinner v-if="state.isLoading"/>
    <section class="recipe-post__label">
      <text-font size="24" class="pb-14">레시피 등록</text-font>
      <text-font color="label" size="16">나만의 레시피를 등록하여 다른 사람에게 공유해보세요!</text-font>
    </section>

    <form @submit.prevent="registerRecipe" class="form">
      <recipe-ui>

        <section class="recipe-grid--layout">
          <text-font size="20" class="pr-16">레시피 제목</text-font>
          <input ref="recipeName" maxlength="120" type="text" class="input input-text" v-model="state.recipePost.name"
                 tabindex="10"/>
        </section>

        <div class="dotted my-16"/>

        <section class="recipe-grid--layout">
          <text-font size="20">레시피 소개</text-font>
          <textarea ref="recipeDesc" class="input scroll textarea input-text"
                    tabindex="10" v-model="state.recipePost.desc"></textarea>
        </section>

        <div class="dotted my-16"/>

        <section class="recipe-grid--layout select-box--container">
          <text-font size="20" class="pr-16">메인 재료</text-font>

          <div class="select-box">
            <select v-model="selected">
              <option v-for="(category) of state.ingredientsCategory" :key="category._id"
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

        <section v-if="state.selected.length > 0" class="ingredients-items--container scroll">
          <span v-for="(value) of state.selected" :key="value._id" @click="selectedIngredient(value._id)"
                class="flex-column-center">
            <picture :class="value.selected ? 'disabled-icon' : 'ingredient-icon--wrapper'">
              <img loading="lazy" :src="value.img"
                   sizes="(max-width: 32px)" decoding="async" alt="식재료" width="32" height="32"/>
            </picture>
            <text-font class="pt-10" size="12">{{ value.name }}</text-font>
          </span>
        </section>
        <text-font>
          선택된 재료 :
          <span v-for="(ingredient, index) of state.ingredients" :key="index">
            <text-font size="12" color="gray">
            {{ ingredient.name }},
          </text-font>
          </span>
        </text-font>

        <div class="dotted my-16"/>

        <section class="pb-20">
          <text-font size="20">재료</text-font>
          <div class="dotted my-16"/>
          <text-font size="16" color="placeholder">사용되는 재료를 입력해주세요.</text-font>

          <section class="recipe-grid--layout">
            <div/>
            <section class="recipe-ingredients__input--container">
              <div v-for="(ingredientsSection, index) of state.recipePost.allIngredient[0].ingredients"
                   :key="index" class="w-100 flex pb-10">
                <input ref="recipeIngredient" type="text" class="input mr-10"
                       v-model="ingredientsSection.name"
                       placeholder="예) 돼지고기" tabindex="10" maxlength="100"/>
                <input ref="recipeIngredientUnit" type="text" class="input mr-10" placeholder="40g"
                       v-model="ingredientsSection.unit" tabindex="10" maxlength="100"/>
                <div class="ingredient-button--group">
                  <custom-button variant="icon-button" class="button-gray mr-8" type="button"
                                 @click="removeIngredientRows(index, state.recipePost.allIngredient[0].ingredients)">
                    <img src="@/assets/images/icons/minus.svg" alt="minus"/>
                  </custom-button>
                  <custom-button :class="state.recipePost.allIngredient[0].ingredients.length === index + 1 ? 'show' : 'hide'"
                                 variant="icon-button" class="button-black" type="button"
                                 @click="addIngredientRows(index, state.recipePost.allIngredient[0].ingredients)">
                    <img src="@/assets/images/icons/plus.svg" alt="plus"/>
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
              <div v-for="(condimentSection, index) of state.recipePost.allIngredient[1].ingredients"
                   :key="index" class="w-100 flex pb-10">
                <input ref="recipeCondiment" type="text" class="input mr-10" placeholder="예) 설탕"
                       v-model="condimentSection.name" tabindex="10" maxlength="100"/>
                <input ref="recipeCondimentUnit" type="text" class="input mr-10" placeholder="30g"
                       v-model="condimentSection.unit" tabindex="10" maxlength="100"/>
                <div class="ingredient-button--group">
                  <custom-button variant="icon-button" class="button-gray mr-8" type="button"
                                 @click="removeIngredientRows(index, state.recipePost.allIngredient[1].ingredients)">
                    <img src="@/assets/images/icons/minus.svg" alt="minus"/>
                  </custom-button>
                  <custom-button :class="state.recipePost.allIngredient[1].ingredients.length === index + 1 ? 'show' : 'hide'"
                                 variant="icon-button" class="button-black" type="button"
                                 @click="addIngredientRows(index, state.recipePost.allIngredient[1].ingredients)">
                    <img src="@/assets/images/icons/plus.svg" alt="plus"/>
                  </custom-button>
                </div>
              </div>

            </section>
          </section>
        </section>

        <section class="pb-20">

          <text-font size="20">요리 순서</text-font>

          <div class="dotted my-16"/>
          <section>
            <div v-for="(step, index) of state.recipePost.steps" :key="index" class="flex mb-12">
              <section class="recipe-grid--layout w-100">
                <text-font class="center" size="18">STEP {{ index + 1 }}</text-font>
                <textarea ref="recipeStep" class="input scroll textarea" v-model="step.desc"
                          tabindex="10"></textarea>
              </section>
            </div>
          </section>

          <div class="w-100 recipe-grid--layout">
            <div/>
            <div class="flex justify-center">
              <custom-button type="button" variant="gray" class="mr-30" @click="removeDescRows">
                <text-font color="gray2">삭제</text-font>
              </custom-button>
              <custom-button type="button" variant="black" class="" @click="addDescRows">
                <text-font color="white">추가</text-font>
              </custom-button>
            </div>
          </div>
        </section>

        <section class="pb-20 mt-20">
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
          <text-font color="white" v-if="state.recipeId.length > 0">수정</text-font>
          <text-font color="white" v-else>레시피 등록</text-font>
        </custom-button>
      </section>
    </form>

  </section>
</template>

<script lang="ts" setup>
import RecipeUi from "@/components/ui/RecipeUi.vue";
import {ins} from "@/lib/axios";
import {Recipe} from "@/interfaces/recipe";
import {reactive,Ref, ref, nextTick} from "vue";
import {useRoute, useRouter} from "vue-router";

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
  id?: string;
  name: string;
  desc: string;
  steps: Steps[];
  detailedIngredient: string[],
  allIngredient: AllIngredient[];
  profileImage: string;
}
  const router = useRouter();
  const route = useRoute();

  const recipeName: Ref<HTMLInputElement> = ref(null);
  const recipeDesc: Ref<HTMLInputElement> = ref(null);
  const recipeIngredient: Ref<HTMLInputElement> = ref(null);
  const recipeIngredientUnit: Ref<HTMLInputElement> = ref(null);
  const recipeCondiment: Ref<HTMLInputElement> = ref(null);
  const recipeCondimentUnit: Ref<HTMLInputElement> = ref(null);
  const recipeStep: Ref<HTMLInputElement> = ref(null);

  interface STATE {
    isLoading: boolean,
    selected: Ingredients[],
    ingredientsCategory: Recipe.IngredientCategories[],
    ingredients: Recipe.IngredientType[],
    recipePost: IRecipePost,
    recipeId: string
  }
  const state: STATE = reactive({
    isLoading: true,
    selected: [],
    ingredientsCategory: [],
    ingredients: [],
    recipeId: '',
    recipePost: {
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
  });

  const textareaMaxLengthCheck = (e: Event): string => {
    const {value} = e.target as any;
    if (value.length >= 120) return value.substring(0, 121);
    return value;
  }

  const load =  async (): Promise<void> => {
    try {
      const {data} = await ins(`/recipes/detail/${state.recipeId}`)
      state.recipePost = data;
    } catch (e) {
      console.log(e);
    }
  }


  const loadCategory = async () => {
    try {
      const {data} = await ins.get('/ingredients/all-ingredients');
      state.ingredientsCategory = data;
    } catch (e) {
      console.log(e)
    }
  }

  const cancel = () => {
    router.push('/');
  }

  const emptyCheck = (): boolean => {
    if (state.recipePost.name.length === 0) {
      nextTick(() => recipeName.value.focus());
      return true;
    }

    if (state.recipePost.desc.length === 0) {
      nextTick(() => recipeDesc.value.focus());
      return true;
    }

    const {ingredients: ingredient} = state.recipePost.allIngredient[0]
    for (let i = 0; i < ingredient.length; i++) {
      const {name, unit} = ingredient[i];
      if (name.length === 0) {
        nextTick(() => {
          const refs = recipeIngredient.value;
          refs[i].focus();
        })
        return true;
      }
      if (unit.length === 0) {
        nextTick(() => {
          const refs = recipeIngredientUnit.value;
          refs[i].focus();
        });
        return true;
      }
    }

    const {ingredients: condiment} = state.recipePost.allIngredient[1]
    for (let i = 0; i < condiment.length; i++) {
      const {name, unit} = condiment[i];
      if (name.length === 0) {
        nextTick(() => {
          const refs = recipeCondiment.value;
          refs[i].focus();
        });
        return true;
      }
      if (unit.length === 0) {
        nextTick(() => {
          const refs = recipeCondimentUnit.value;
          refs[i].focus();
        });
        return true;
      }
    }
    for (let i = 0; i < state.recipePost.steps.length; i++) {
      if (state.recipePost.steps[i].desc.length === 0) {
        nextTick(() => {
          const refs = recipeStep.value;
          refs[i].focus();
        });
        return true;
      }
    }
    return false;
  }

  const registerRecipe = async () => {
    try {
      const result = emptyCheck();
      // if (result) return;
      // state.isLoading = true
      // if (this.recipeId.length > 0) {
      //   const {name, desc, profileImage, steps, detailedIngredient, allIngredient} = state.recipePost;
      //   const ingredientsIdArr = detailedIngredient.map((value: any) => value._id)
      //   const sendData = {
      //     id: state.recipeId,
      //     name,
      //     desc,
      //     profileImage,
      //     steps, allIngredient,
      //     detailedIngredient: ingredientsIdArr
      //   }
      //   const {data} = await ins.put('/recipes/update-admin-recipe', sendData);
      //   if (data) state.isLoading = false;
      // } else {
      //   const {data} = await ins.post('/recipes/register-admin-recipe', state.recipePost);
      //   if (data)
      //     state.isLoading = false;
      // }
      // await router.push('/');
    } catch (e) {
      console.log(e);
    }
  }

  const selectedIngredient = (_id: string): void => {
    const index = state.recipePost.detailedIngredient.findIndex((value) => value === _id)
    if (index > -1) state.recipePost.detailedIngredient.splice(index, 1);
    else state.recipePost.detailedIngredient.push(_id)

    const choice = state.selected.filter((value: Recipe.IngredientType) => {
      const {_id: key, selected} = value
      if (key === _id) value.selected = !selected;
      return key === _id;
    });
    state.ingredients.push(...choice)
    state.ingredients = state.ingredients.filter((value) => {
      const {selected} = value
      if (selected) return selected
      return false;
    });
  }

  const addIngredientRows = (index: number, arr: Ingredients[]): void => {
    if (arr.length === 10) return;
    arr.push({name: '', unit: ''});
  }

  const removeIngredientRows = (index: number, arr: Ingredients[]): void => {
    if (arr.length === 1) return;
    arr.splice(index, 1)
  }

  const addDescRows = () =>{
    const step = state.recipePost.steps.length;
    if (step === 10) return;
    state.recipePost.steps.push({step: step + 1, desc: '', img: ''})
  }

  const removeDescRows = () => {
    const step = state.recipePost.steps.length;
    if (step === 1) return;
    state.recipePost.steps.splice(step - 1, 1)
  }


state.recipeId = route.params.id as string;
if (state.recipeId.length > 0) load();
loadCategory();
state.isLoading = false;
</script>

<!--<script lang="ts">-->
<!--import {Options, Vue} from "vue-class-component";-->
<!--import RecipeUi from "@/components/ui/RecipeUi.vue";-->
<!--import {ins} from "@/lib/axios";-->
<!--import {Recipe} from "@/interfaces/recipe";-->
<!--import {Ref} from "vue-property-decorator";-->

<!--interface Steps {-->
<!--  step: number;-->
<!--  desc: string;-->
<!--  img: string;-->
<!--}-->

<!--interface Ingredients {-->
<!--  name: string,-->
<!--  unit: string-->
<!--}-->

<!--interface AllIngredient {-->
<!--  category: string,-->
<!--  ingredients: Ingredients[]-->
<!--}-->

<!--interface IRecipePost {-->
<!--  id?: string;-->
<!--  name: string;-->
<!--  desc: string;-->
<!--  steps: Steps[];-->
<!--  detailedIngredient: string[],-->
<!--  allIngredient: AllIngredient[];-->
<!--  profileImage: string;-->
<!--}-->

<!--@Options({-->
<!--  components: {-->
<!--    RecipeUi,-->
<!--  }-->
<!--})-->
<!--export default class AdminRecipePost extends Vue {-->
<!--  @Ref() readonly recipeName!: HTMLInputElement-->
<!--  @Ref() readonly recipeDesc!: HTMLInputElement-->

<!--  recipePost: IRecipePost = {-->
<!--    name: '',-->
<!--    desc: '',-->
<!--    steps: [-->
<!--      {-->
<!--        step: 1,-->
<!--        desc: '',-->
<!--        img: '',-->
<!--      }-->
<!--    ],-->
<!--    detailedIngredient: [],-->
<!--    allIngredient: [-->
<!--      {category: '식재료', ingredients: [{name: '', unit: ''}]},-->
<!--      {category: '조미료', ingredients: [{name: '', unit: ''}]},-->
<!--    ],-->
<!--    profileImage: '',-->
<!--  }-->
<!--  isLoading = true;-->
<!--  selected = [];-->
<!--  ingredientsCategory: Recipe.IngredientCategories[] = [];-->
<!--  ingredients: Recipe.IngredientType[] = [];-->
<!--  recipeId = '';-->
<!--  -->

<!--  created() {-->
<!--    this.recipeId = this.$route.params.id as string;-->
<!--    if (this.recipeId.length > 0) this.load();-->
<!--    this.loadCategory();-->
<!--    this.isLoading = false;-->
<!--  }-->

<!--  textareaMaxLengthCheck(e: Event): string {-->
<!--    const {value} = e.target as any;-->
<!--    if (value.length >= 120) return value.substring(0, 121);-->
<!--    return value;-->
<!--  }-->

<!--  private async load(): Promise<void> {-->
<!--    try {-->
<!--      const {data} = await ins(`/recipes/detail/${this.recipeId}`)-->
<!--      this.recipePost = data;-->
<!--    } catch (e) {-->
<!--      console.log(e);-->
<!--    }-->
<!--  }-->


<!--  private async loadCategory() {-->
<!--    try {-->
<!--      const {data} = await ins.get('/ingredients/all-ingredients');-->
<!--      this.ingredientsCategory = data;-->
<!--    } catch (e) {-->
<!--      console.log(e)-->
<!--    }-->
<!--  }-->

<!--  cancel() {-->
<!--    this.$router.push('/');-->
<!--  }-->

<!--  private emptyCheck(): boolean {-->
<!--    if (this.recipePost.name.length === 0) {-->
<!--      this.$nextTick(() => this.recipeName.focus());-->
<!--      return true;-->
<!--    }-->

<!--    if (this.recipePost.desc.length === 0) {-->
<!--      this.$nextTick(() => this.recipeDesc.focus());-->
<!--      return true;-->
<!--    }-->

<!--    const {ingredients: ingredient} = this.recipePost.allIngredient[0]-->
<!--    for (let i = 0; i < ingredient.length; i++) {-->
<!--      const {name, unit} = ingredient[i];-->
<!--      if (name.length === 0) {-->
<!--        this.$nextTick(() => {-->
<!--          const refs = `recipeIngredient-${i}`;-->
<!--          (this.$refs[refs] as any)[0].focus();-->
<!--        })-->
<!--        return true;-->
<!--      }-->
<!--      if (unit.length === 0) {-->
<!--        this.$nextTick(() => {-->
<!--          const refs = `recipeIngredientUnit-${i}`;-->
<!--          (this.$refs[refs] as any)[0].focus();-->
<!--        });-->
<!--        return true;-->
<!--      }-->
<!--    }-->

<!--    const {ingredients: condiment} = this.recipePost.allIngredient[1]-->
<!--    for (let i = 0; i < condiment.length; i++) {-->
<!--      const {name, unit} = condiment[i];-->
<!--      if (name.length === 0) {-->
<!--        this.$nextTick(() => {-->
<!--          const refs = `recipeCondiment-${i}`;-->
<!--          (this.$refs[refs] as any)[0].focus();-->
<!--        });-->
<!--        return true;-->
<!--      }-->
<!--      if (unit.length === 0) {-->
<!--        this.$nextTick(() => {-->
<!--          const refs = `recipeCondimentUnit-${i}`;-->
<!--          (this.$refs[refs] as any)[0].focus();-->
<!--        });-->
<!--        return true;-->
<!--      }-->
<!--    }-->
<!--    for (let i = 0; i < this.recipePost.steps.length; i++) {-->
<!--      if (this.recipePost.steps[i].desc.length === 0) {-->
<!--        this.$nextTick(() => {-->
<!--          const refs = `recipeStep-${i}`;-->
<!--          (this.$refs[refs] as any)[0].focus();-->
<!--        });-->
<!--        return true;-->
<!--      }-->
<!--    }-->
<!--    return false;-->
<!--  }-->

<!--  async registerRecipe() {-->
<!--    try {-->
<!--      const result = this.emptyCheck();-->
<!--      if (result) return;-->
<!--      this.isLoading = true-->
<!--      if (this.recipeId.length > 0) {-->
<!--        const {name, desc, profileImage, steps, detailedIngredient, allIngredient} = this.recipePost;-->
<!--        const ingredientsIdArr = detailedIngredient.map((value: any) => value._id)-->
<!--        const sendData = {-->
<!--          id: this.recipeId,-->
<!--          name,-->
<!--          desc,-->
<!--          profileImage,-->
<!--          steps, allIngredient,-->
<!--          detailedIngredient: ingredientsIdArr-->
<!--        }-->
<!--        const {data} = await ins.put('/recipes/update-admin-recipe', sendData);-->
<!--        if (data) this.isLoading = false;-->
<!--      } else {-->
<!--        const {data} = await ins.post('/recipes/register-admin-recipe', this.recipePost);-->
<!--        if (data)-->
<!--          this.isLoading = false;-->
<!--      }-->
<!--      this.$router.push('/');-->
<!--    } catch (e) {-->
<!--      console.log(e);-->
<!--    }-->
<!--  }-->

<!--  private selectedIngredient(_id: string): void {-->
<!--    const index = this.recipePost.detailedIngredient.findIndex((value) => value === _id)-->
<!--    if (index > -1) this.recipePost.detailedIngredient.splice(index, 1);-->
<!--    else this.recipePost.detailedIngredient.push(_id)-->

<!--    const choice = this.selected.filter((value: Recipe.IngredientType) => {-->
<!--      const {_id: key, selected} = value-->
<!--      if (key === _id) value.selected = !selected;-->
<!--      return key === _id;-->
<!--    });-->
<!--    this.ingredients.push(...choice)-->
<!--    this.ingredients = this.ingredients.filter((value) => {-->
<!--      const {selected} = value-->
<!--      if (selected) return selected-->
<!--      return false;-->
<!--    });-->
<!--  }-->

<!--  private addIngredientRows(index: number, arr: Ingredients[]): void {-->
<!--    if (arr.length === 10) return;-->
<!--    arr.push({name: '', unit: ''});-->
<!--  }-->

<!--  private removeIngredientRows(index: number, arr: Ingredients[]): void {-->
<!--    if (arr.length === 1) return;-->
<!--    arr.splice(index, 1)-->
<!--  }-->

<!--  private addDescRows() {-->
<!--    const step = this.recipePost.steps.length;-->
<!--    if (step === 10) return;-->
<!--    this.recipePost.steps.push({step: step + 1, desc: '', img: ''})-->
<!--  }-->

<!--  private removeDescRows() {-->
<!--    const step = this.recipePost.steps.length;-->
<!--    if (step === 1) return;-->
<!--    this.recipePost.steps.splice(step - 1, 1)-->
<!--  }-->
<!--}-->
<!--</script>-->

<style scoped lang="scss">
.recipe-post--container {
  width: 100%;
  margin: auto;
  padding: 5vw;

  .recipe-grid--layout {
    padding-top: 0.8em;
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
    padding: 1.5em 0;
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
  background-color: #EDEDED;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px !important;
  height: 30px;
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
  font-family: $kor;
  outline: none;
  border: 1px solid $line;
  border-radius: 6px;
  color: $black;
  background-color: $white;
  min-height: 38px;
  padding: 4px 8px;
  width: 100%;
  resize: none;

  &:focus {
    border-color: #494949;
  }
}

.ingredient-button--group {
  display: flex;
  align-items: center;
  min-width: 86px;
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
