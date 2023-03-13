<template>
  <article class="recipe-detail--container">
    <loading-spinner v-if="isLoading"/>

    <recipe-ui class="recipe-form--wrapper">
      <section>
        <div class="recipe-form--label">
          <text-font size="22" class="recipe-detail__label">{{ recipe.name }}</text-font>
          <div class="flex" v-if="showUpdateMenuButton">
            <!-- 내가 작성한 글일 경우에만 -->
            <custom-button variant="icon-button" @click="recipeUpdate" class="mr-10">
              <img src="@/assets/images/icons/pencil.svg" alt="recipe-update" width="24" height="24" loading="lazy"/>
            </custom-button>
            <custom-button variant="icon-button" @click="modal?.show()">
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
        <div v-if="recipe.detailedIngredient.length > 0" class="pt-6 tags--wrapper">
          <span class="tags mr-6" v-for="(tag, index) of recipe.detailedIngredient" :key="index">
            {{ tag.name }}
          </span>
        </div>
      </section>

      <div class="dotted mt-16 mb-16"/>

      <section>
        <text-font size="20" weight="semiBold" class="recipe-detail__label">요리 소개</text-font>
        <div class="dotted mt-16 mb-16"/>

        <text-font v-text="recipe.desc" class="recipe-detail--desc"/>

      </section>

      <div class="dotted mt-16 mb-16"/>

      <section>
        <text-font size="20" weight="semiBold" class="recipe-detail__label">요리순서</text-font>
        <div class="dotted mt-16 mb-16"/>

        <div v-if="recipe.steps.length > 0">
          <section v-for="(item) of recipe.steps" :key="item._id" class="pb-10 flex">
            <text-font size="20" type="eng" class="recipe-detail-desc--steps">STEP {{ item.step }}</text-font>
            <div class="recipe-detail--desc">
              <text-font>{{ item.desc }}</text-font>
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
import {Recipe} from "@/interfaces/recipe";
import ModalComponent from "@/components/common/ModalComponent.vue";
import {ModalComponentType} from "@/types/type";
import {computed, nextTick, Ref, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";

const modal: Ref<ModalComponentType | null> = ref(null);
const route = useRoute();
const router = useRouter();
const store = useStore();
const isLoading: Ref<boolean> = ref(true);
const recipe: Ref<Recipe.Info> = ref(
  {
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
    const {data} = await ins.delete('/recipes/delete-recipe', {
      data: {id: _id,}
    });
    isLoading.value = false;
    if (data) {
      modal.value.hide()
      await nextTick(() => router.push('/'));
    }
  } catch (e) {
    console.log(e);
  }
}

load();
</script>

<style scoped lang="scss">
.recipe-detail--container {
  width: 100%;
  padding: 3rem 1rem;

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
    border: 1px solid $gray2;
    padding: 0.5em;
    letter-spacing: 1.2px;
  }

  .recipe-detail-desc--steps {
    width: 15%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
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
    padding-top: 20px;
    display: flex;
    max-width: 1000px;
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
  .recipe-detail__label {
    font-size: 16px !important;
  }
  .recipe-detail-desc--steps {
    font-size: 14px !important;
    margin-right: 1rem;
  }
  .recipe-detail--container {
    padding: 1rem;

    .recipe-detail__button--wrapper {
      justify-content: center;
    }
  }
}
</style>
