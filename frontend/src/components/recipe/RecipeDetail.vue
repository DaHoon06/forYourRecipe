<template>
  <article class="recipe-detail--container">
    <loading-spinner v-if="isLoading"/>

    <recipe-ui class="recipe-form--wrapper">
      <section>
        <div class="recipe-form--label">
          <text-font size="22">{{ recipe.name }}</text-font>
          <div class="flex">
            <!-- 내가 작성한 글일 경우에만 -->
            <custom-button variant="icon-button" @click="recipeUpdate" class="mr-10">
              <img src="@/assets/images/icons/pencil.svg" alt="recipe-update" width="24" height="24" loading="lazy"/>
            </custom-button>
            <custom-button variant="icon-button" @click="this.modal.show()">
              <img src="@/assets/images/icons/trash.svg" alt="recipe-delete" width="24" height="24" loading="lazy"/>
            </custom-button>
          </div>
        </div>

        <div class="dotted mt-16 mb-16"/>
        <picture>
          <img :src="recipe.profileImage" loading="lazy"
               width="284"
               height="177" alt="음식 이미지"/>
        </picture>
        <div v-if="recipe.detailedIngredient.length > 0" class="pt-6">
          <span class="tags mr-6" v-for="(tag, index) of recipe.detailedIngredient" :key="index">
            {{ tag.name }}
          </span>
        </div>
      </section>

      <div class="dotted mt-16 mb-16"/>

      <section>
        <text-font size="20">요리 소개</text-font>
        <div class="dotted mt-16 mb-16"/>

        <text-font v-text="recipe.desc" class="recipe-detail--desc"/>

      </section>

      <div class="dotted mt-16 mb-16"/>

      <section>
        <text-font size="20">조리법</text-font>
        <div class="dotted mt-16 mb-16"/>
        <section v-if="recipe.steps.length > 0" class="recipe-detail">
          <text-font v-for="(item) of recipe.steps" :key="item._id" class="pb-10">
            {{ item.desc }}
          </text-font>
        </section>
      </section>

    </recipe-ui>
    <section class="recipe-detail__button--wrapper">
      <custom-button variant="primary" @click="historyBack">
        <text-font color="white">목록</text-font>
      </custom-button>
    </section>

    <teleport to="#modal">
      <Modal :scroll="false" ref="modal">
        <section class="modal--message-box">
          <text-font class="delete-warning-message">레시피를 삭제하겠습니까?</text-font>
          <section class="flex justify-content-around">
            <custom-button variant="gray" @click="this.modal.hide()">
              <text-font color="gray2">취소</text-font>
            </custom-button>
            <custom-button variant="black" @click="recipeDelete">
              <text-font color="white">삭제</text-font>
            </custom-button>
          </section>
        </section>
      </Modal>
    </teleport>
  </article>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {ins} from "@/lib/axios";
import RecipeUi from "@/components/ui/RecipeUi.vue";
import {Recipe} from "@/interfaces/recipe";
import Spinner from "@/components/common/Spinner.vue";
import {markRaw} from "vue";
import Modal from "@/components/common/Modal.vue";
import {Ref} from "vue-property-decorator";
import {ModalComponent} from "@/types/type";

@Options({
  components: {
    RecipeUi,
    Modal
  }
})
export default class RecipeDetail extends Vue {
  @Ref('modal') readonly modal!: ModalComponent;

  isLoading = true;
  recipe: Recipe.Info = {
    _id: '',
    desc: '',
    createdAt: new Date(),
    detailedIngredient: [],
    likes: [],
    profileImage: '',
    name: '',
    modified: false,
    steps: [],
    user: '',
    updatedAt: new Date()
  };


  recipeId = '';

  created() {
    this.recipeId = this.$route.params.id as string;
    this.load();
  }

  private async load() {
    try {
      const {data} = await ins.get(`/recipes/detail/${this.recipeId}`);
      this.recipe = data;
      this.isLoading = false;
    } catch (e) {
      console.log(e)
    }
  }

  private historyBack() {
    this.$router.go(-1);
  }

  private recipeUpdate() {
    const {_id} = this.recipe;
    this.$router.push(`/admin/recipe/post/${_id}`)
  }

  private async recipeDelete() {
    try {
      this.isLoading = true;
      const {_id} = this.recipe;
      const {data} = await ins.delete('/recipes/delete-recipe', {
        data: {id: _id,}
      });
      this.isLoading = false;
      if (data) {
        this.modal.hide()
        await this.$nextTick(() => this.$router.push('/'));
      }
    } catch (e) {
      console.log(e);
    }
  }

}
</script>

<style scoped lang="scss">
.recipe-detail--container {
  width: 100%;
  padding: 3rem 0;

  .recipe-form--wrapper {
    margin: auto;
    max-width: 1000px;

    .recipe-form--label {
      display: flex;
      justify-content: space-between;
    }
  }

  .recipe-detail--desc {
    width: 100%;
    min-height: 100px;
    height: 100%;
    background-color: $white;
    border: 1px solid $line;
    border-radius: 8px;
    padding: 1em;
  }

  .recipe-detail {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 200px;
    height: 100%;
    background-color: $white;
    border: 1px solid $line;
    border-radius: 8px;
    padding: 1em;
  }

  .recipe-detail__button--wrapper {
    padding-top: 20px;
    display: flex;
    max-width: 1000px;
    justify-content: center;
    margin: auto;
  }
}

.modal--message-box {
  width: 350px;
  height: 120px;
  padding-top: 10px;

  .delete-warning-message {
    width: 100%;
    padding: 1rem;
  }
}
</style>
