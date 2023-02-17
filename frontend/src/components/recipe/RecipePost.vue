<template>
  <section class="recipe-post--container">
    <section class="recipe-post__label">
      <text-font size="24" class="pb-14">레시피 등록</text-font>
      <text-font color="label" size="16">나만의 레시피를 등록하여 다른 사람에게 공유해보세요!</text-font>
    </section>

    <form @submit.prevent="registerRecipe" class="form">
      <recipe-ui>
        <section class="pb-20">
          <div class="recipe-post--ingredients">
            <text-font size="22" class="pr-16">주재료를 선택해주세요.</text-font>
            <div class="select-box">
              <select>
                <option v-for="(i) of 4" :key="i">
                  <text-font size="12">{{ i }}</text-font>
                </option>
              </select>
              <span class="angle-icons">
              <img
                src="@/assets/images/icons/drop.svg" alt="드랍다운" width="8" height="8"/>
            </span>
            </div>
          </div>

          <div class="dotted mt-16"/>

        </section>

        <section class="pb-20">
          <text-font size="22">요리의 이름을 적어주세요.</text-font>
          <div class="dotted mt-16"/>
          <div class="mt-20">
            <input type="text" class="input"/>
          </div>
        </section>

        <section class="pb-20">
          <div class="recipe--description--label">
            <text-font size="22">요리를 소개해주세요.</text-font>

            <label :for="`file`" class="input-file--button">
              <img src="@/assets/images/icons/image-upload.svg" width="24" height="24" alt="이미지 업로드 버튼"/>
            </label>
            <input type="file" id="file" style="display: none" accept="jpeg,png,jpg"/>
          </div>
          <div class="dotted mt-16"/>
          <textarea class="input scroll textarea mt-20"></textarea>
        </section>

        <section class="pb-20">
          <text-font size="22">요리 방법을 단계별로 등록해주세요.</text-font>
          <div class="dotted mt-16"/>

          <div class="flex mt-20">
            <input type="text" class="input"/>
            <custom-button type="button" variant="black" class="ml-36">
              <text-font color="white" size="18">요리법 등록</text-font>
            </custom-button>
          </div>
        </section>

        <section class="pb-20">
          <text-font size="22">미리보기</text-font>
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

@Options({
  components: {
    RecipeUi,
    Input
  }
})
export default class RecipePost extends Vue {

  private cancel() {
    this.$router.push('/');
  }

  private async registerRecipe() {
    try {
      console.log('롸')
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped lang="scss">
.recipe-post--container {
  width: 100%;
  margin: auto;
  padding: 5rem;

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

  .recipe--description--label {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

.form {
  height: 974px;
  max-width: 1154px;
  margin: auto;
}

/* TODO input tag 공통으로 관리 */
@import "src/assets/css/font";

.input {
  box-sizing: border-box;
  font-family: $jua;
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