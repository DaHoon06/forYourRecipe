<template>
  <article class="recipe-detail--container">
    <loading-spinner v-if="isLoading"/>

    <recipe-ui class="recipe-form--wrapper">
      <div class="recipe-form--label">
        <div class="flex pb-16" v-if="showUpdateMenuButton">
          <custom-button variant="icon-button" @click="recipeUpdate" class="mr-10">
            <img src="@/assets/images/icons/pencil.svg" alt="recipe-update" width="24" height="24" loading="lazy"/>
          </custom-button>
          <custom-button variant="icon-button" @click="modal?.show()">
            <img src="@/assets/images/icons/trash.svg" alt="recipe-delete" width="24" height="24" loading="lazy"/>
          </custom-button>
        </div>
      </div>

      <section class="recipe-detail--top">
        <picture class="recipe-detail__img--wrapper mb-16">
          <img :src="recipe.profileImage" class="recipe-detail__img"
               alt="음식 이미지"/>
        </picture>

        <text-font v-text="recipe.desc" weight="regular" color="textSub" class="recipe-detail--desc"/>

        <div class="recipe-detail-info--container">
          <section class="recipe-detail--title">
            <div>
              <text-font color="black" size="20" weight="semiBold">{{ recipe.name }}</text-font>
              <div v-if="recipe.detailedIngredient.length > 0" class="pt-16 pb-16 tags--wrapper">
                <span class="tags mr-6" v-for="(tag, index) of recipe.detailedIngredient" :key="index">
                  {{ tag.name }}
                </span>
              </div>
            </div>
          </section>

          <section class="ingredients-container" v-if="recipe.allIngredient.length > 0">
            <div v-if="recipe.allIngredient[0].ingredients.length > 0" class="mb-10">
              <text-font color="black" weight="medium" size="15">주재료</text-font>
              <hr/>
              <div class="flex justify-between pb-10" v-for="(value, index) of recipe.allIngredient[0].ingredients"
                   :key="'ingredients'+index">
                <text-font color="textSub" weight="regular">{{ value.name }}</text-font>
                <text-font color="textSub" weight="regular">{{ value.unit }}</text-font>
              </div>
            </div>
            <div v-if="recipe.allIngredient[1].ingredients.length > 0">
              <text-font color="black" weight="medium" size="15">양념</text-font>
              <hr/>
              <div class="flex justify-between pb-10" v-for="(value, index) of recipe.allIngredient[1].ingredients"
                   :key="'condiments'+index">
                <text-font color="textSub" weight="regular">{{ value.name }}</text-font>
                <text-font color="textSub" weight="regular">{{ value.unit }}</text-font>
              </div>
            </div>
          </section>
        </div>

        <hr/>

        <section>
          <div class="flex">
            <picture>
              <img :src="recipe.user.img || `https://4u-recipe.s3.ap-northeast-2.amazonaws.com/profile/profile.svg`"
                   height="40" width="40"
                   alt="테스트 이미지"/>
            </picture>
            <div class="flex-column justify-content-around pl-10">
              <text-font color="black" weight="medium" size="14">{{ recipe.user.name }}</text-font>
              <text-font color="textSub" weight="regular" size="12">{{ recipe.user.introduce }}</text-font>
            </div>
          </div>
        </section>

      </section>

      <section class="recipe-detail--bottom mt-30">
        <text-font size="18" weight="medium" color="black" class="recipe-detail__label">레시피</text-font>

        <hr/>

        <div v-if="recipe.steps.length > 0">
          <section v-for="(item) of recipe.steps" :key="item._id" class="pb-10 recipe-step">
            <text-font size="20" weight="regular" color="black" type="eng" class="recipe-detail-desc--steps">Step
              {{
                item.step
              }}
            </text-font>
            <div class="recipe-detail--desc">
              <text-font weight="regular" color="textSub">{{ item.desc }}</text-font>
            </div>

          </section>
        </div>
      </section>
    </recipe-ui>

    <section class="recipe-detail__button--wrapper">
      <custom-button variant="black" @click="historyBack">
        <text-font color="white">목록</text-font>
      </custom-button>
    </section>


    <recipe-ui class="recipe-form--wrapper">
      <text-font size="18" weight="medium" color="black">후기</text-font>
      <hr/>
      <recipe-comment/>

      <form @submit.prevent="registerComment">
        <fieldset class="flex">
          <div class="blank"/>
          <div class="comment-textarea--container">
            <textarea class="comment-textarea"></textarea>
            <custom-button variant="black" type="submit">등록</custom-button>
          </div>
        </fieldset>
      </form>
    </recipe-ui>

    <teleport to="#modal">
      <modal-component ref="modal">
        <section class="modal--message-box">
          <text-font class="delete-warning-message">레시피를 삭제하겠습니까?</text-font>
          <section class="flex justify-content-around">
            <custom-button variant="gray" @click="modal?.hide()">
              <text-font color="gray2">취소</text-font>
            </custom-button>
            <custom-button variant="black" @click="recipeDelete">
              <text-font color="white">삭제</text-font>
            </custom-button>
          </section>
        </section>
      </modal-component>
    </teleport>
  </article>
</template>

<script lang="ts" setup>
import {ins} from "@/lib/axios";
import RecipeUi from "@/components/ui/RecipeUi.vue";
import RecipeComment from '@/components/recipe/RecipeComments.vue';
import {Recipe} from "@/interfaces/recipe";
import ModalComponent from "@/components/common/modal/ModalComponent.vue";
import {ModalComponentType} from "@/types/type";
import {computed, nextTick, Ref, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import store from '@/store';

const modal: Ref<ModalComponentType | null> = ref(null);
const route = useRoute();
const router = useRouter();
const isLoading: Ref<boolean> = ref(true);
const recipe: Ref<Recipe.RecipeDetail> = ref(
    {
      _id: '',
      desc: '',
      createdAt: new Date(),
      detailedIngredient: [],
      allIngredient: [],
      likes: [],
      profileImage: '',
      name: '',
      modified: false,
      steps: [],
      updatedAt: new Date(),
      user: {
        id: '',
        img: '',
        introduce: '',
        name: '',
      }
    }
);
const recipeId: Ref<string> = ref('');
recipeId.value = route.params.id as string;

const showUpdateMenuButton = computed(() => {
  const uid = store.getters["userModule/getUid"]
  return recipe.value.user === uid || uid === 'admin'
})

const load = async () => {
  try {
    const {data} = await ins.get(`/recipes/detail/${recipeId.value}`);
    console.log(data)
    recipe.value = data;
    isLoading.value = false;
  } catch (e) {
    console.log(e)
  }
}

const historyBack = () => router.go(-1);

const recipeUpdate = () => {
  const {_id} = recipe.value;
  router.push(`/admin/recipe/post/${_id}`)
}

const recipeDelete = async () => {
  try {
    isLoading.value = true;
    const {_id} = recipe.value;
    const {data} = await ins.delete(`/recipes/delete-recipe/${_id}`);
    isLoading.value = false;
    if (data) {
      modal.value.hide()
      await nextTick(() => router.push('/'));
    }
  } catch (e) {
    console.log(e);
  }
}
/**
 * @description: 댓글 등록
 */
const registerComment = async () => {
  try {
    console.log('롸')
  } catch (e) {
    console.log(e);
  }
}

load();
</script>

<style scoped lang="scss">
.blank {
  display: inline-block;
  width: 120px;
}

.comment-textarea--container {
  display: flex;
  width: calc(100% - 120px);

  .comment-textarea {
    background-color: #F3F3F3;
    padding: 0.5rem;
    resize: none;
    width: calc(100% - 144px);
    border-color: $line-white;
    outline: none;

    &:focus {
      border-color: $gray2;
      background-color: $white;
    }
  }
}

.recipe-detail--container {
  width: 100%;
  padding: 3rem 1rem;

  .recipe-form--wrapper {
    margin: auto;
    max-width: 1200px;

    .recipe-detail--top {
      max-width: 900px;
      margin: auto;
    }

    .recipe-detail--bottom {
      .recipe-step {
        display: flex;
        flex-direction: column;
      }
    }

    .recipe-detail__img--wrapper {
      display: flex;
      justify-content: center;
      width: 100%;

      .recipe-detail__img {
        max-width: 440px;
        width: auto;
        height: auto;
        max-height: 330px;
      }
    }

    .recipe-detail-info--container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: row;

      .recipe-detail--title {
        display: flex;
        flex-direction: column;
      }
    }

    .recipe-form--label {
      display: flex;
      justify-content: flex-end;
    }
  }

  .ingredients-container {
    width: 50%;
  }

  .recipe-detail--desc {
    width: 100%;
    background-color: $white;
    padding: 1rem 0;
    letter-spacing: 1.2px;
  }

  .recipe-detail-desc--steps {
    width: 3em;
    padding-bottom: 0.5em;
    border-bottom: 3px solid $black;
  }

  .recipe-detail {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 200px;
    height: 100%;
    background-color: $white;
    border: 1px solid $gray2;
    padding: 1em;
  }

  .recipe-detail__button--wrapper {
    padding: 20px 0;
    display: flex;
    max-width: 1200px;
    justify-content: flex-end;
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

@media screen and (max-width: 600px) {
  .recipe-detail--container {
    padding: 1rem;

    .recipe-form--wrapper {
      .recipe-detail__img--wrapper {
        width: 100%;
      }

      .recipe-detail__img--wrapper {

        .recipe-detail__img {
          width: 100%;
        }
      }

      .recipe-detail-info--container {
        flex-direction: column;

        .recipe-detail--title {
          flex-direction: column-reverse;
        }
      }

      .ingredients-container {
        padding-top: 1rem;
        width: 100%;
      }

    }


    .recipe-detail__button--wrapper {
      justify-content: center;
    }
  }
}
</style>
